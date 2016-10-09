module Fable.Arch.App

open Fable.Core
open Fable.Core.JsInterop
open System.Diagnostics

open Html

[<Emit("window._log($0, $1, $2);")>]
let log (color:string) (key:string) (message:string): unit = failwith "JS only"

[<AutoOpen>]
module Types =
    type Handler<'TMessage> = 'TMessage -> unit

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

    type Action<'TMessage> = Handler<'TMessage> -> unit

    type Subscriber<'TMessage, 'TModel> = AppEvent<'TMessage, 'TModel> -> unit
    type Producer<'TMessage, 'TModel> = Action<AppMessage<'TMessage, 'TModel>>
    type Plugin<'TMessage, 'TModel> =
        {
            Producer: Producer<'TMessage, 'TModel>
            Subscriber: Subscriber<'TMessage, 'TModel>
        }

    type RenderState = 
        | InProgress
        | NoRequest

type ScheduleMessage = 
    | PingIn of float*Handler<unit>

type Selector = string

type AppSpecification<'TModel, 'TMessage, 'TView> = 
    {
        InitState: 'TModel
        View: 'TModel -> 'TView
        Update: 'TModel -> 'TMessage -> ('TModel * Action<'TMessage> list)
        InitMessage: Action<'TMessage>
        CreateRenderer: Selector -> Handler<'TMessage> -> 'TView -> (Handler<'TMessage> -> 'TView -> unit)
        NodeSelector: Selector
        Producers: Producer<'TMessage, 'TModel> list
        Subscribers: Subscriber<'TMessage, 'TModel> list
    }

type App<'TModel, 'TMessage, 'TView> =
    {
        Model: 'TModel
        Actions: Action<'TMessage> list
//        ViewState: 'TViewState
        RenderState: RenderState
        Render: Handler<'TMessage> -> 'TView -> unit
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
                        Fable.Import.Browser.window.setTimeout(cb, milliseconds) |> ignore
                        return! loop()
                }
            loop()
        )

    let application<'TMessage, 'TModel, 'TViewState> handleMessage handleDraw handleReplay configureProducers createInitApp =
        let elem = Fable.Import.Browser.document.createElement("div")
        let post (msg:AppMessage<'TMessage,'TModel>) = 
            let eventInit = 
                { new Fable.Import.Browser.CustomEventInit with
                    member this.detail 
                        with get() = Some (box msg)
                        and set(_) = ()
                    member this.bubbles
                        with get() = None
                        and set(_) = ()
                    member this.cancelable
                        with get() = None
                        and set(_) = ()
                    }
            let event = Fable.Import.Browser.CustomEvent.Create("FableArchEvent", eventInit) 
            elem.dispatchEvent(event) |> ignore
        let postMessage = Message >> post

        let scheduler = createScheduler()
        let scheduleDraw() = scheduler.Post(PingIn(1000./60., (fun() -> post Draw)))

        let mutable state = createInitApp postMessage

        let handleEvent (e:Fable.Import.Browser.Event) =
            let evt = e :?> Fable.Import.Browser.CustomEvent
            let data = e?detail
            let state' : App<'TModel, 'TMessage, 'TViewState> = 
                match (evt.detail :?> (AppMessage<'TMessage, 'TModel>)) with
                | Message message ->
                    handleMessage scheduleDraw post message state
                | Draw -> 
                    handleDraw postMessage state
                | Replay (model, messages) ->
                    handleReplay postMessage (model, messages) state
            state <- state'

        let eventHandler = Fable.Import.Browser.EventListenerOrEventListenerObject.Case1(new Fable.Import.Browser.EventListener(handleEvent))

        configureProducers post
        elem.addEventListener("FableArchEvent", eventHandler)
        post

    let render post viewFn app =
        let view = viewFn app.Model
        app.Render post view
        app

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

    let handleDraw viewFn post app = 
        render post viewFn app
        |> (fun app -> {app with RenderState = NoRequest})

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

    let handleReplay viewFn updateFn subscribers post (fromModel, actions) app = 
        let result = calculateModelChanges fromModel updateFn actions
        let model = 
            match result with 
            | m::_ -> m |> snd
            | [] -> fromModel
        let app' = 
            {app with Model = model}
            |> render post viewFn

        (Replayed result) |> notifySubscribers subscribers
        app'

[<AutoOpen>]
module AppApi = 
    // Helper functions to map from one action type to another
    let mapAction<'T1,'T2> (mapping:'T1 -> 'T2) (action:Action<'T1>) : Action<'T2> = 
        fun x -> action (mapping >> x)  

    let mapAppMessage map = function
        | AppMessage.Message msg -> AppMessage.Message (map msg)
        | Draw -> Draw
        | Replay (x,messageList) -> Replay (x,messageList |> List.map (fun (id, m) -> id, map m))

    let mapProducer map p = mapAction map p

    let mapSubscriber mapModelChanged mapAction sub = function
        | ModelChanged mc ->
            mc |> mapModelChanged |> Option.map ModelChanged |> Option.iter sub
        | ActionReceived m -> mapAction id m |> Option.map ActionReceived |> Option.iter sub
        | Replayed lst -> sub (Replayed lst)

    let mapActions m = List.map (mapAction m)
    let toActionList a = [a]

    // Starting point for creating an application
    let createApp state view update createRenderer =
        {
            InitState = state
            View = view
            Update = update
            InitMessage = (fun _ -> ())
            CreateRenderer = createRenderer
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
    let start (appSpec:AppSpecification<'TModel, 'TMessage, 'TView>) =
        let viewFn : ('TModel -> 'TView) = appSpec.View
        let updateFn = appSpec.Update

        let createInitApp post = 
            let view : 'TView = viewFn appSpec.InitState
            appSpec.InitMessage post
            let render = appSpec.CreateRenderer appSpec.NodeSelector post view

            {
                Model = appSpec.InitState
                Render = render
                RenderState = NoRequest
                Actions = []
            }
        let handleMessage' = handleMessage updateFn appSpec.Subscribers
        let handleDraw' = handleDraw viewFn
        let handleReplay' = handleReplay viewFn updateFn appSpec.Subscribers
        let configureProducers' = configureProducers appSpec.Producers
        application handleMessage' handleDraw' handleReplay' configureProducers' createInitApp
