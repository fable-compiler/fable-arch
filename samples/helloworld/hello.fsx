(**
 - title: Hello world - getting with simple app
 - tagline: Hello world implemented with fable-arch
 - app-style: width:800px; margin:20px auto 50px auto;
 - intro: This is a simple "hello world" application.
*)

#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-arch/Fable.Arch.App.fs"
#load "node_modules/fable-arch/Fable.Arch.Html.fs"
#load "node_modules/fable-arch/Fable.Arch.Virtualdom.fs"
#load "node_modules/fable-arch/Fable.Arch.Virtualdom.Html.fs"

open Fable.Core
open Fable.Core.JsInterop

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Virtualdom.Html

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
// use createApp. In addition to the application functions
// we also need to specify which renderer to use.
createSimpleApp "" view update Virtualdom.Rendering.createRender2
|> withStartNodeSelector "#hello"
|> start
