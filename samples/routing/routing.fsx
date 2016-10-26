(**
 - title: Nesting - how to nest "apps" with a counter as a example
 - tagline: Nesting application implemented with fable-arch
 - app-style: width:800px; margin:20px auto 50px auto;
 - intro: This is a simple "hello world" application.
*)

#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-arch/Fable.Arch.Html.fs"
#load "node_modules/fable-arch/Fable.Arch.App.fs"
#load "node_modules/fable-arch/Fable.Arch.Virtualdom.fs"

(**
Route parser is optional, so you need to add it yourself if you want it.
*)
#load "node_modules/fable-arch/Fable.Arch.RouteParser.fs"
open Fable.Core
open Fable.Import
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.App.Types
open Fable.Arch.App
open Fable.Arch.Html

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
            div [ attribute "class" "cnt-links"]
                [
                    a [ attribute "href" "#counter1" ] [text "counter1"]
                    a [ attribute "href" "#counter2" ] [text "counter2"]
                    a [ attribute "href" (sprintf "#counter1/%i" (model.Count*2)) ] [text "counter1 with count"]
                    a [ attribute "href" (sprintf "#counter2/%i" -model.Count) ] [text "counter2 with count"]
                ]
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

(**
The routing part starts here.
*)
open Fable.Arch.RouteParser.Parsing
open Fable.Arch.RouteParser.RouteParser
(**
This defines how we parse the routes and create actions from them.
It will match four different routes:

* `counter1` --> `Show1` (just show counter 1)
* `counter2` --> `Show2` (just show counter 2)
* `counter1/%i` --> `Show1WithCnt` (show counter 1 and set a count)
* `counter2/%i` --> `Show2WithCnt` (show counter 2 and set a count)
*)
let routes = [
    runM Show1 (pStaticStr "counter1" |> (drop >> _end))
    runM Show2 (pStaticStr "counter2" |> (drop >> _end))
    runM1 Show1WithCnt (pStaticStr "counter1" </.> pint)
    runM1 Show2WithCnt (pStaticStr "counter2" </.> pint)
]

(**
We can't use the parser to create the routes, so we need to
manually map the actions to routes. Returning `Some str` will
set the route, `None` will do nothing.
*)
let mapToRoute r = 
    match r with
    | Show1 -> sprintf "counter1" |> Some
    | Show2 -> sprintf "counter2" |> Some
    | Show1WithCnt i -> sprintf "counter1/%i" i |> Some
    | Show2WithCnt i -> sprintf "counter2/%i" i |> Some
    | Reset -> sprintf "" |> Some
    | _ -> None

let router = createRouter routes mapToRoute

(**
A location handler is used to dealt with the `window.location`,
this is abstracted so anyone can use whatever lib they want to 
work with the `location`. 
*)
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

let routerF m = router.Route m.Message

(**
We add a `routeProducer`, which is what listens to the location
changes. We also add a `routeSubscriber`, which listens to events
from the app and update the location accordingly.
*)
createSimpleApp {Top = initCounter; Bottom = initCounter} nestedView nestedUpdate Virtualdom.createRender
|> withStartNodeSelector "#nested-counter"
|> withProducer (routeProducer locationHandler router)
|> withSubscriber (routeSubscriber locationHandler routerF)
|> withSubscriber (printfn "%A")
|> start
