module Fable.Arch.App

open Fable.Core
open Fable.Core.JsInterop
open System.Diagnostics

open Fable.Import.Browser
open Html

[<AutoOpen>]
module Types =
    type ModelChanged<'TMessage, 'TModel> = 
        {
            PreviousState: 'TModel
            Message: 'TMessage
            CurrentState: 'TModel
        }

    type AppEvent<'TMessage, 'TModel> =
        | ModelChanged of ModelChanged<'TMessage, 'TModel>
        | ActionReceived of 'TMessage
        | Replayed of (System.Guid * 'TModel) list
    
    type AppMessage<'TMessage, 'TModel> =
        | Message of 'TMessage
        | Replay of 'TModel*((System.Guid*'TMessage) list)
        | Draw

    type Action<'TMessage> = ('TMessage -> unit) -> unit

    type Subscriber<'TMessage, 'TModel> = AppEvent<'TMessage, 'TModel> -> unit
    type Producer<'TMessage, 'TModel> = (AppMessage<'TMessage, 'TModel> -> unit) -> unit
    type Plugin<'TMessage, 'TModel> =
        {
            Producer: Producer<'TMessage, 'TModel>
            Subscriber: Subscriber<'TMessage, 'TModel>
        }

    type RenderState = 
        | InProgress
        | NoRequest

type ScheduleMessage = 
    | PingIn of float*(unit -> unit)

type Selector = string
type Renderer<'TMessage, 'TView, 'TViewState> = 
    {
        Render: ('TMessage -> unit) -> 'TView -> 'TViewState -> 'TViewState
        Init: Selector -> ('TMessage -> unit) -> 'TView -> 'TViewState
    }

type AppSpecification<'TModel, 'TMessage, 'TView, 'TViewState> = 
    {
        InitState: 'TModel
        View: 'TModel -> 'TView
        Update: 'TModel -> 'TMessage -> ('TModel * Action<'TMessage> list)
        InitMessage: (('TMessage -> unit) -> unit)
        Renderer: Renderer<'TMessage, 'TView, 'TViewState>
        NodeSelector: Selector
        Producers: Producer<'TMessage, 'TModel> list
        Subscribers: Subscriber<'TMessage, 'TModel> list
    }

type App<'TModel, 'TMessage, 'TViewState> =
    {
        Model: 'TModel
        Actions: Action<'TMessage> list
        ViewState: 'TViewState
        RenderState: RenderState
    }

[<AutoOpen>]
module internal Helpers = 
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

    let application handleMessage handleDraw handleReplay configureProducers createInitApp (inbox:MailboxProcessor<AppMessage<'TMessage, 'TModel>>) =
        let scheduler = createScheduler()
        let scheduleDraw() = scheduler.Post(PingIn(1000./60., (fun() -> inbox.Post(Draw))))
        let post msg = inbox.Post(msg)
        let postMessage = Message >> post
        configureProducers post
        let rec inner state =
            async {
                let! msg = inbox.Receive()
                match msg with
                | Message message -> 
                    return! inner (handleMessage scheduleDraw post message state)
                | Draw -> 
                    return! inner (handleDraw postMessage state)
                | Replay (model, messages) ->
                    return! inner (handleReplay postMessage (model, messages) state)
            }
        inner (createInitApp postMessage)

    let render post viewFn renderer app =
        let view = viewFn app.Model
        let viewState' = renderer.Render post view app.ViewState
        {app with ViewState = viewState'}

    let executeActions post = List.iter (fun a -> a (Message >> post))
    let notifySubscribers subscribers msg = 
        subscribers |> List.iter (fun s -> msg |> s)

    let requestDraw scheduleDraw = 
        function
        | NoRequest -> 
            scheduleDraw()
            InProgress
        | InProgress -> InProgress
    
    let handleMessage update subscribers scheduleDraw post message app =
        notifySubscribers subscribers (ActionReceived message)
        let (model, actions) = update app.Model message

        let modelChanged = 
            ModelChanged {
                CurrentState = model
                PreviousState = app.Model
                Message = message
            }
        let renderState = requestDraw scheduleDraw app.RenderState
        
        executeActions post actions
        notifySubscribers subscribers modelChanged

        {app with Model = model; RenderState = renderState}

    let handleDraw viewFn renderer post app = 
        render post viewFn renderer app
        |> (fun s -> {s with RenderState = NoRequest})

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

    let handleReplay viewFn updateFn renderer subscribers post (fromModel, actions) app = 
        let result = calculateModelChanges fromModel updateFn actions
        let model = 
            match result with 
            | m::_ -> m |> snd
            | [] -> fromModel
        let app' = 
            {app with Model = model}
            |> render post viewFn renderer

        (Replayed result) |> notifySubscribers subscribers
        app'

[<AutoOpen>]
module AppApi = 
    // Helper functions to map from one action type to another
    let mapAction<'T1,'T2> (mapping:'T1 -> 'T2) (action:Action<'T1>) : Action<'T2> = 
        fun x -> action (mapping >> x)  

    let mapActions m = List.map (mapAction m)
    let toActionList a = [a]

    // Starting point for creating an application
    let createApp state view update renderer =
        {
            InitState = state
            View = view
            Update = update
            InitMessage = (fun _ -> ())
            Renderer = renderer
            NodeSelector = "body"
            Producers = []
            Subscribers = []
        }

    // Starting point for an application with a simpler update function
    let createSimpleApp model view update =
        createApp model view (fun x y -> (update x y), [])

    // Fluent api functions to add optional configurations to the application
    let withStartNodeSelector selector app = { app with NodeSelector = selector }
    let withInitMessage msg app = { app with InitMessage = msg }

    let private withInstrumentationProducer p app = 
        {app with Producers = p::app.Producers}
    let withProducer (producer:('a->unit)->unit) app =
        let lift h = Message >> h 
        let producer' = lift >> producer
        withInstrumentationProducer producer' app

    let withInstrumentationSubscriber subscriber app =
        {app with Subscribers = subscriber::app.Subscribers}
    let withSubscriber (subscriber:ModelChanged<'a,'b> -> unit) app = 
        let subscriber' = function 
            | ModelChanged m -> m |> subscriber
            | _ -> ()
        withInstrumentationSubscriber subscriber' app
        
    let withPlugin plugin =
        (withInstrumentationSubscriber plugin.Subscriber)
        >> (withInstrumentationProducer plugin.Producer)

    let configureProducers producers post =
        producers |> List.iter (fun p -> p post) 

    // Start the application
    let start appSpec =
        let renderer = appSpec.Renderer
        let viewFn = appSpec.View
        let updateFn = appSpec.Update

        let createInitApp post = 
            let view = viewFn appSpec.InitState
            let viewState = renderer.Init appSpec.NodeSelector post view
            appSpec.InitMessage post
            let render = appSpec.Renderer.Render

            {
                Model = appSpec.InitState
                ViewState = viewState
                RenderState = NoRequest
                Actions = []
            }
        let handleMessage' = handleMessage updateFn appSpec.Subscribers
        let handleDraw' = handleDraw viewFn renderer
        let handleReplay' = handleReplay viewFn updateFn renderer appSpec.Subscribers
        let configureProducers' = configureProducers appSpec.Producers
        MailboxProcessor.Start(application handleMessage' handleDraw' handleReplay' configureProducers' createInitApp)
