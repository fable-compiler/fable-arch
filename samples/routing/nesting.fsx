(**
 - title: Nesting - how to nest "apps" with a counter as a example
 - tagline: Nesting application implemented with fable-virtualdom
 - app-style: width:800px; margin:20px auto 50px auto;
 - intro: This is a simple "hello world" application.
*)

#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-import-virtualdom/Fable.Helpers.Virtualdom.fs"
#load "node_modules/fable-import-virtualdom/Fable.Helpers.RouteParser.fs"
open Fable.Core
open Fable.Import
open Fable.Import.Browser

open Fable.Helpers.Virtualdom
open Fable.Helpers.Virtualdom.App
open Fable.Helpers.Virtualdom.Html

// model
type Model = 
    {
        Count: int
        Show: bool
    }
let initCounter = {Count = 0; Show = true}

(**
The model for the first example is a simple integer that will act as hour counter.
We also provide a default value for our counter.
*)

// Update

type CounterAction =
    | Decrement of int
    | Increment of int

let counterUpdate model command =
    match command with
    | Decrement x -> {model with Count = model.Count - x }
    | Increment x -> {model with Count = model.Count + x }

// View
let counterView model =
    let bgColor =
        match model.Count with
        | x when x > 10 -> "red"
        | x when x < 0 -> "blue"
        | _ -> "green"
    
    div [ Style ["display", if model.Show then "" else "none"] ]
        [
            div [ Style ["width", "120px"; "height", "120px"] ] [
                svg [ width "120"; height "120"; viewBox "0 0 100 100" ]
                    [ rect [width "110"; height "110"; fill bgColor] []]
            ]
            div [ Style ["border","1px solid blue"]
                  onMouseClick (fun x -> (Increment 1))
                  onDblClick (fun x -> ((Increment 10)))]
                [ text (string "Increment")]
            div [ Style ["background-color", bgColor; "color", "white"]]
                [text (string model.Count)]
            div [ Style ["border", "1px solid green";
                         "height", ((string (7 + model.Count)) + "px")]
                  onMouseClick (fun x -> (Decrement 1))
                  onDblClick (fun x -> (Decrement 5))]
                [ text (string "Decrement")]
            a [ attribute "href" "#counter1" ] [text "counter1"]
            a [ attribute "href" "#counter2" ] [text "counter2"]
            a [ attribute "href" (sprintf "#counter1/%i" (model.Count*2)) ] [text "counter1 with count"]
            a [ attribute "href" (sprintf "#counter2/%i" -model.Count) ] [text "counter2 with count"]
        ]


type NestedModel = { Top: Model; Bottom: Model}

type NestedAction = 
    | Reset
    | Top of CounterAction
    | Bottom of CounterAction
    | Show1
    | Show2
    | Show1WithCnt of int
    | Show2WithCnt of int

let nestedUpdate model action = 
    match action with
    | Reset -> {Top = initCounter; Bottom = initCounter}
    | Top ca -> 
        let res = counterUpdate model.Top ca
        {model with Top = res}
    | Bottom ca -> 
        let res = counterUpdate model.Bottom ca
        {model with Bottom = res}
    | Show1WithCnt i -> 
        {model with Top = {model.Top with Show = true; Count = i}; Bottom = {model.Bottom with Show = false}}
    | Show2WithCnt i -> 
        {model with Bottom = {model.Bottom with Show = true; Count = i}; Top = {model.Top with Show = false}}
    | Show1 -> 
        {model with Top = {model.Top with Show = true}; Bottom = {model.Bottom with Show = false}}
    | Show2 -> 
        {model with Bottom = {model.Bottom with Show = true}; Top = {model.Top with Show = false}}

let nestedView model = 
    div []
        [
            Html.map Top (counterView model.Top)
            Html.map Bottom (counterView model.Bottom)
            button 
                [
                    onMouseClick (fun _ -> Reset)
                ]
                [
                    text "Reset"
                ]
        ]

let resetEveryTenth h =
    window.setInterval((fun _ -> Reset |> h), 10000) |> ignore

open Fable.Helpers.RouteParser
open Fable.Helpers.Parsing

let routes = [
    runM Show1 (pStaticStr "counter1" |> (drop >> _end))
    runM Show2 (pStaticStr "counter2" |> (drop >> _end))
    runM1 Show1WithCnt (pStaticStr "counter1" </.> pint)
    runM1 Show2WithCnt (pStaticStr "counter2" </.> pint)
]
let mapToRoute r = 
    match r with
    | Show1 -> sprintf "counter1" |> Some
    | Show2 -> sprintf "counter2" |> Some
    | Show1WithCnt i -> sprintf "counter1/%i" i |> Some
    | Show2WithCnt i -> sprintf "counter2/%i" i |> Some
    | Reset -> sprintf " " |> Some
    | _ -> None

let router = createRouter routes mapToRoute

let locationHandler = 
    {
        SubscribeToChange = 
            (fun h ->
                window.addEventListener_hashchange(fun _ ->
                    h (window.location.hash.Substring 1)
                    null
            ))
        PushChange = 
            fun s -> location.assign (sprintf "#%s" s) 
    }

let routerF m = 
    match m with
    | ActionReceived msg -> router.Route msg
    | _ -> None

createSimpleApp {Top = initCounter; Bottom = initCounter} nestedView nestedUpdate
|> withStartNodeSelector "#nested-counter"
|> withProducer (routeProducer locationHandler router)
|> withSubscriber "route-subscriber" (routeSubscriber locationHandler routerF)
|> start renderer
