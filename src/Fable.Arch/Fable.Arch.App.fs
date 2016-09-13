module Fable.Arch.App

open Fable.Core
open Fable.Core.JsInterop
open System.Diagnostics

open Fable.Import.Browser

open Html

[<AutoOpen>]
module App =

    type ModelChanged<'TMessage, 'TModel> = 
        {
            PreviousState: 'TModel
            Message: 'TMessage
            CurrentState: 'TModel
        }

    type AppEvents<'TMessage, 'TModel> =
        | ModelChanged of ModelChanged<'TMessage, 'TModel>
        | ActionReceived of 'TMessage
        | Replayed of (System.Guid * 'TModel) list
        | DrawStarted

    type Action<'TMessage> = ('TMessage -> unit) -> unit
    type Subscriber<'TMessage, 'TModel> = AppEvents<'TMessage, 'TModel> -> unit

    type AppMessage<'TMessage, 'TModel> =
//        | AddSubscriber of string*Subscriber<'TMessage, 'TMessage>
//        | RemoveSubscriber of string
        | Message of 'TMessage
        | Replay of 'TModel*((System.Guid*'TMessage) list)
        | Draw

    type Producer<'TMessage, 'TModel> = (AppMessage<'TMessage, 'TModel> -> unit) -> unit

    type Plugin<'TMessage, 'TModel> =
        {
            Producer: Producer<'TMessage, 'TModel>
            Subscriber: Subscriber<'TMessage, 'TModel>
        }

    let mapAction<'T1,'T2> (mapping:'T1 -> 'T2) (action:Action<'T1>) : Action<'T2> = 
        fun x -> action (mapping >> x)  

    let mapActions m = List.map (mapAction m)
    let toActionList a = [a]

    type RenderState = 
        | InProgress
        | NoRequest

    type App<'TModel, 'TMessage> =
        {
            Model: 'TModel
            View: 'TModel -> DomNode<'TMessage>
            Update: 'TModel -> 'TMessage -> ('TModel * Action<'TMessage> list)
            InitMessage : (('TMessage -> unit) -> unit) option
            Actions: Action<'TMessage> list
            Producers: Producer<'TMessage, 'TModel> list
            Node: Node option
            CurrentTree: obj option
            Subscribers: Map<string, Subscriber<'TMessage, 'TModel>>
            NodeSelector: string option
            RenderState: RenderState
        }

    type ScheduleMessage = 
        | PingIn of float*(unit -> unit)

    type Renderer<'TMessage> =
        {
            Render: ('TMessage -> unit) -> DomNode<'TMessage> -> obj
            Diff: obj -> obj -> obj
            Patch: Fable.Import.Browser.Node -> obj -> Fable.Import.Browser.Node
            CreateElement: obj -> Fable.Import.Browser.Node
        }

    let createApp model view update =
        {
            Model = model
            View = view
            Update = update
            NodeSelector = None
            InitMessage = None
            Producers = []
            Subscribers = Map.empty

            CurrentTree = None
            RenderState = NoRequest
            Actions = []
            Node = None
        }

    let createSimpleApp model view update =
        createApp model view (fun x y -> (update x y), [])

    let withStartNodeSelector selector app = { app with NodeSelector = Some selector }
    let withInitMessage msg app = { app with InitMessage = Some msg }
    let withProducer p app = 
        {app with Producers = p::app.Producers}
    let withSubscriber subscriberId subscriber app =
        let subsribers = app.Subscribers |> Map.add subscriberId subscriber
        { app with Subscribers = subsribers }

    let withPlugin pluginId plugin =
        (withSubscriber pluginId plugin.Subscriber)
        >> (withProducer plugin.Producer)

    let createScheduler() = 
        MailboxProcessor.Start(fun inbox ->
            let rec loop() = 
                async {
                    let! message = inbox.Receive()
                    match message with
                    | PingIn (milliseconds, cb) ->
                        window.setTimeout(cb, milliseconds) |> ignore
                        return! loop()
                }
            loop()
        )

    let createFirstLoopState renderTree (startElem:Node) post renderer state =
        let tree = renderTree state.View post state.Model
        let rootNode = renderer.CreateElement tree
        startElem.appendChild(rootNode) |> ignore
        match state.InitMessage with
        | None -> ()
        | Some init -> init post
        {state with CurrentTree = Some tree; Node = Some rootNode}

    let handleMessage msg notify schedule state = 
        ActionReceived msg |> (notify state.Subscribers)
        let (model', actions) = state.Update state.Model msg
        ModelChanged {PreviousState = state.Model; Message =  msg; CurrentState = model'} |> notify state.Subscribers

        let renderState =
            match state.RenderState with
            | NoRequest ->
                schedule()
//                    scheduler.Post(PingIn(1000./60., (fun() -> inbox.Post(Draw))))
                InProgress
            | InProgress -> InProgress
        {
            state with 
                Model = model'
                RenderState = renderState
                Actions = state.Actions @ actions }

    let draw state renderTree renderer post currentTree rootNode = 
        let model = state.Model
        let tree = renderTree state.View post model
        let patches = renderer.Diff currentTree tree
        renderer.Patch rootNode patches |> ignore
        tree

    let handleDraw renderTree renderer post notify rootNode currentTree state = 
        match state.RenderState with
        | InProgress ->
            DrawStarted |> notify state.Subscribers
            let tree = draw state renderTree renderer post currentTree rootNode
            state.Actions |> List.iter (fun i -> i post)
            {state with RenderState = NoRequest; CurrentTree = Some tree; Actions = []}
        | NoRequest -> raise (exn "Shouldn't happen")

    let calculateModelChanges initState update actions = 
        let execUpdate r a =
            let m = 
                match r with
                | [] -> initState
                | x::_ -> x |> snd
            let msg = a |> snd
            let (m', _) = update m (a |> snd)
            let id:System.Guid = a |> fst
            id,m'

        actions
        |> List.fold (fun s a -> (execUpdate s a)::s) []

    let handleReplay state post notify initState actions renderTree renderer currentTree rootNode = 
        let result = calculateModelChanges initState state.Update actions
        let model = 
            match result with 
            | m::_ -> m |> snd
            | [] -> initState
        let state' = {state with Model = model}
        let tree = draw state' renderTree renderer (Message >> post) currentTree rootNode
        (Replayed result) |> notify state.Subscribers
        {state' with CurrentTree = Some tree}

    let start renderer app =
        let renderTree view handler model =
            view model
            |> renderer.Render handler

        let startElem =
            match app.NodeSelector with
            | None -> document.body
            | Some sel -> document.body.querySelector(sel) :?> HTMLElement

        let scheduler = createScheduler()
        MailboxProcessor.Start(fun inbox ->
            let post message =
                inbox.Post message
            let notifySubscribers subs model =
                subs |> Map.iter (fun key handler -> handler model)
            app.Producers |> List.iter (fun p -> p post)
            let schedule() = scheduler.Post(PingIn(1000./60., (fun() -> inbox.Post(Draw))))
            let rec loop state =
                async {
                    match state.Node, state.CurrentTree with
                    | None,_ ->
                        let state' = createFirstLoopState renderTree startElem (Message >> post) renderer state
                        return! loop state'
                    | Some rootNode, Some currentTree ->
                        let! message = inbox.Receive()
                        match message with
                        | Message msg ->
                            Fable.Import.Browser.window.console.log("Some state", state)
                            let state' = handleMessage msg notifySubscribers schedule state
                            return! loop state'
                        | Draw -> 
                            let state' = handleDraw renderTree renderer (Message >> post) notifySubscribers rootNode currentTree state
                            return! loop state'
                        | Replay (initState, actions) ->
                            let state' = handleReplay state post notifySubscribers initState actions renderTree renderer currentTree rootNode
                            Fable.Import.Browser.window.console.log("Some replay", state')
                            return! loop state'
                    | _ -> failwith "Shouldn't happen"
                }
            loop app)