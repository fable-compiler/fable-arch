module Fable.Arch.App

open Fable.Core
open Fable.Core.JsInterop
open System.Diagnostics

open Html

[<AutoOpen>]
module Types =

    /// An handler is a function used to send a message in the application.
    type Handler<'TMessage> = 'TMessage -> unit

    /// Representation of a change in the model
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

    type Action<'TMessage> = Handler<'TMessage> -> unit

    type Subscriber<'TMessage, 'TModel> = AppEvent<'TMessage, 'TModel> -> unit
    type Producer<'TMessage, 'TModel> = Action<AppMessage<'TMessage, 'TModel>>
    type Plugin<'TMessage, 'TModel> =
        {
            Producer: Producer<'TMessage, 'TModel>
            Subscriber: Subscriber<'TMessage, 'TModel>
        }

    type Selector =     
        | Query of string
        | Node of Fable.Import.Browser.HTMLElement

    /// AppSpecification is a type used as an interface for the renderer
    ///
    /// - InitState: Initiale state of the model used by the application.
    /// - View: Function used to generate the Virtual DOM supported by the renderer.
    /// - Update: Function used to support the message in the application.
    /// - InitMessage: A function to execute when the app is ready.
    /// - CreateRenderer: This function is responsible to convert the Virtual DOM into real DOM.
    /// - NodeSelector: Selector used to attach the application in the DOM
    /// - Producers: This is a list of function which are able to push message inside the application
    /// - Subscribers: This is a list of function to notify when a message is handle by the application
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
            Actions: (unit -> unit) list
            Render: Handler<'TMessage> -> 'TView -> unit
            Subscribers: Subscriber<'TMessage, 'TModel> list
        }

    let application<'TMessage, 'TModel, 'TView> initMessage handleMessage handleReplay configureProducers createInitApp =
        /// State of the application
        /// we are using closure to store the Application state in memory
        let mutable state = None

        /// Helper function used to notify subscribers
        let notifySubs msg =
            /// Only notify the subscribers if the application is running
            match state with
            | Some s ->
                s.Subscribers |> List.iter (fun sub -> sub msg)
            | None -> ()

        /// Function responsible of running the application 
        let rec handleEvent (evt:AppMessage<'TMessage, 'TModel>) =
            let (state', actions)  : App<'TModel, 'TMessage, 'TView>*(unit -> unit) list =
                // Pattern matching overt the type of the AppMessage
                match evt with
                | Message message ->
                    // This is a standard message
                    handleMessage handleEvent notifySubs message (state |> Option.get)
                | Replay (model, messages) ->
                    // We are asking to replay a state
                    handleReplay handleEvent notifySubs (model, messages) (state |> Option.get)
            // Update the 
            state <- Some state'
            actions |> List.iter (fun x -> x())

        let post = (Message >> handleEvent)
        /// Initialise the application
        state <- createInitApp post |> Some
        /// Send the init message into the application
        initMessage post

        /// Configure the producers give them an Handler
        /// This is the Handler they will use to push message in the application
        configureProducers handleEvent
        // Start the application
        handleEvent

    let render post viewFn app =
        let view = viewFn app.Model
        app.Render (Message >> post) view
        app

    let createActions post = List.map (fun a -> fun () -> a (Message >> post))

    /// Function used to handle a message inside the application
    ///
    /// - update: Function used to support the message in the application.
    /// - viewFn: Function taking the model in input and generating a Virtual DOM
    /// - post: Function used to send back Message into the application
    /// - notifySubs: Function used to notify the subscribers
    /// - message: Current Message being processed
    /// - app: Current state of the Application being processed
    let handleMessage (update: 'TModel -> 'TMessage -> 'TModel * Action<'TMessage> list) (viewFn: 'TModel -> 'TView) (post: AppMessage<'TMessage, 'TModel> -> unit) (notifySubs: AppEvent<'TMessage, 'TModel> -> unit) (message: 'TMessage) (app: App<'TModel, 'TMessage, 'TView>) =
        notifySubs (ActionReceived message)
        let (model, actions) = update app.Model message

        let modelChanged =
            ModelChanged {
                CurrentState = model
                PreviousState = app.Model
                Message = message
            }

        let actions = createActions post actions
        let app' =
            {app with Model = model}
            |> render post viewFn

        app', (fun () -> (notifySubs modelChanged))::actions

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

    let handleReplay viewFn updateFn post notifySubs (fromModel, actions) app =
        let result = calculateModelChanges fromModel updateFn actions
        let model =
            match result with
            | m::_ -> m |> snd
            | [] -> fromModel
        let app' =
            {app with Model = model}
            |> render post viewFn

        app', [fun () -> (Replayed result) |> notifySubs]

[<AutoOpen>]
module AppApi =
    // Helper functions to map from one action type to another
    let mapAction<'T1,'T2> (mapping:'T1 -> 'T2) (action:Action<'T1>) : Action<'T2> =
        fun x -> action (mapping >> x)

    let mapAppMessage map = function
        | AppMessage.Message msg -> AppMessage.Message (map msg)
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
            NodeSelector = Query "body"
            Producers = []
            Subscribers = []
        }

    // Starting point for an application with a simpler update function
    let createSimpleApp model view update =
        createApp model view (fun x y -> (update x y), [])

    // Fluent api functions to add optional configurations to the application
    let withStartNodeSelector (selector: string) app = { app with NodeSelector = Query selector }

    let withStartNode (node: Fable.Import.Browser.HTMLElement) app = { app with NodeSelector = Node node } 

    let withInitMessage msg app = { app with InitMessage = msg }

    let private withInstrumentationProducer p app =
        {app with Producers = p::app.Producers}
    let withProducer (producer:('a->unit)->unit) app =
        let lift h = Message >> h
        let producer' = lift >> producer
        withInstrumentationProducer producer' app

    let withInstrumentationSubscriber subscriber app =
        {app with AppSpecification.Subscribers = subscriber::app.Subscribers}
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

    /// Start the application and return a function `AppMessage<'TMessage, 'TModel> -> unit`,
    /// that will act as a way to send messages into the app. This is used for non-mainstream
    /// scenarios where the complete app is controlled by an external entity, such as DevTools.
    /// For normal applications, use the `start` function instead.
    let startAndExposeMessageSink (appSpec:AppSpecification<'TModel, 'TMessage, 'TView>) =
        let viewFn : ('TModel -> 'TView) = appSpec.View
        let updateFn = appSpec.Update

        let createInitApp post =
            let view : 'TView = viewFn appSpec.InitState
            let render = appSpec.CreateRenderer appSpec.NodeSelector post view
            {
                Model = appSpec.InitState
                Render = render
                Subscribers = appSpec.Subscribers
                Actions = []
            } : App<'TModel, 'TMessage, 'TView>
        let handleMessage' = handleMessage updateFn viewFn
        let handleReplay' = handleReplay viewFn updateFn
        let configureProducers' = configureProducers appSpec.Producers
        application appSpec.InitMessage handleMessage' handleReplay' configureProducers' createInitApp

    /// Start the application
    let start (appSpec:AppSpecification<'TModel, 'TMessage, 'TView>) = 
        startAndExposeMessageSink appSpec |> ignore
