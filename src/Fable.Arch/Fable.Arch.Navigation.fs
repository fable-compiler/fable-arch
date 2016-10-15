module Fable.Arch.Navigation
open Fable
open Fable.Arch.App
open Fable.Arch.App.AppApi
open Fable.Arch.Html

type Location = 
    {
        Href: string
        Host: string
        Hostname: string
        Protocol: string
        Origin: string
        Port: string
        Pathname: string
        Search: string
        Hash: string
    }
    with 
        static member getLocation() = 
            let location = Import.Browser.document.location
            {
                Href = location.href
                Host = location.host
                Hostname = location.hostname
                Protocol = location.protocol
                Origin = location.origin
                Port = location.port
                Pathname = location.pathname
                Search = location.search
                Hash = location.hash
            }

type NavigationAction<'TAction> =
    | Change of Location
    | Message of 'TAction

type Parser<'TAction> = Location -> 'TAction

let mapDownNavigationAction f = function
    | Change _ -> None
    | Message m -> f m |> Some

let mapDownModelChanged mc =
    mc.Message 
    |> mapDownNavigationAction (fun m -> 
        {
            Message = m
            PreviousState = mc.PreviousState
            CurrentState = mc.CurrentState
        })

let pushState url = 
    Import.Browser.history.pushState(null, "", url)

let setState url = 
    Import.Browser.history.replaceState(null, "", url)

let go n = 
    if n <> 0
    then 
        Import.Browser.history.go(n)

let withNavigation parser urlUpdate app =
    let update' model = function 
        | Change location -> 
            urlUpdate model (parser location) 
            |> (fun (m, actions) -> m, actions |> List.map (mapAction Message))
        | Message msg ->
            app.Update model msg
            |> (fun (m, actions) -> m, actions |> List.map (mapAction Message))

    let popStateProducer h =
        let popstateHandler _ =
            let location = Location.getLocation()
            h (AppMessage.Message (Change (location)))
            null
        // Must be a lambda to compile
        Import.Browser.window.addEventListener_popstate(fun x -> popstateHandler x)

    let producers = 
        let mappedProducers = app.Producers |> List.map (mapProducer (mapAppMessage Message))
        popStateProducer::mappedProducers

    let subscribers = 
        app.Subscribers |> List.map (mapSubscriber mapDownModelChanged mapDownNavigationAction)

    let initMessage = mapAction Message app.InitMessage

    let mapCreateRenderer createRenderer =
        let mapRenderer renderer = 
            let renderer' handler view =
                renderer (Message >> handler) view
            renderer'

        let createRenderer' sel handler view = 
            createRenderer sel (Message >> handler) view
            |> mapRenderer
        createRenderer'

    let createRenderer = mapCreateRenderer app.CreateRenderer
    {
        InitState = app.InitState
        View = app.View
        Update = update'
        InitMessage = initMessage 
        CreateRenderer = createRenderer
        NodeSelector = app.NodeSelector
        Producers = producers
        Subscribers = subscribers
    }