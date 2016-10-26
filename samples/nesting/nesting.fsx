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
open Fable.Core
open Fable.Import
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html

// model
type Counter = int
let initCounter = 0

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
    | Decrement x -> model - x
    | Increment x -> model + x

// View
let counterView model =
    let bgColor =
        match model with
        | x when x > 10 -> "red"
        | x when x < 0 -> "blue"
        | _ -> "green"
    div []
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
                [text (string model)]
            div [ Style ["border", "1px solid green";
                         "height", ((string (7 + model)) + "px")]
                  onMouseClick (fun x -> (Decrement 1))
                  onDblClick (fun x -> (Decrement 5))]
                [ text (string "Decrement")]
        ]


type NestedModel = { Top: int; Bottom: int}

type NestedAction = 
    | Reset
    | Top of CounterAction
    | Bottom of CounterAction

let nestedUpdate model action = 
    match action with
    | Reset -> {Top = 0; Bottom = 0}
    | Top ca -> 
        let res = counterUpdate model.Top ca
        {model with Top = res}
    | Bottom ca -> 
        let res = counterUpdate model.Bottom ca
        {model with Bottom = res}

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

createSimpleApp {Top = 0; Bottom = 0} nestedView nestedUpdate Virtualdom.createRender
|> withStartNodeSelector "#nested-counter"
|> start
