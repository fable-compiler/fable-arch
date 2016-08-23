#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-import-virtualdom/Fable.Helpers.Virtualdom.fs"

open Fable.Core
open Fable.Core.JsInterop

open Fable.Helpers.Virtualdom
open Fable.Helpers.Virtualdom.App
open Fable.Helpers.Virtualdom.Html

// Model
type Model = string

type Actions =
    | ChangeInput of string

// Update
let update model msg =
    match msg with
    | ChangeInput str -> str

// View
let inline onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value)) 
let view model =
    div
        []
        [
            label 
                []
                [text "Enter name: "]
            input
                [
                    onInput (fun x -> ChangeInput x)
                ]
            br []
            span
                []
                [text (sprintf "Hello %s" model)]
        ]

// Using createSimpleApp instead of createApp since our
// update function doesn't generate any actions. See 
// some of the other more advanced examples for how to
// use createApp
createSimpleApp "" view update
|> start renderer
