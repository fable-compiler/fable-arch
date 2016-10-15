(**
 - title: Hello world - getting with simple app
 - tagline: Hello world implemented with fable-arch
 - app-style: width:800px; margin:20px auto 50px auto;
 - intro: This is a simple "hello world" application.
*)

#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-arch/Fable.Arch.Html.fs"
#load "node_modules/fable-arch/Fable.Arch.App.fs"
#load "node_modules/fable-arch/Fable.Arch.Navigation.fs"
#load "node_modules/fable-arch/Fable.Arch.Virtualdom.fs"

open Fable.Core
open Fable.Core.JsInterop

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html
open Fable.Arch.Navigation

// Url handling
let toUrl count = sprintf "#/%i" count
let fromUrl (url:string) =
    int (url.Substring(2))

let urlParser location = 
    location.Hash |> fromUrl

// Model
type Model = int

let initValue = Location.getLocation() |> urlParser

// Update
type Actions =
    | Increment
    | Decrement

let update model msg = 
    match msg with
    | Increment -> model+1
    | Decrement -> model-1
    |> (fun m -> m, [fun _ -> Navigation.pushState (toUrl m)])

let urlUpdate model cnt =
    cnt,[]

// View
let view model = 
    div 
        []
        [
            button [ onMouseClick (fun _ -> Decrement) ] [ text ("-") ]
            div [] [text (string model)]
            button [ onMouseClick (fun _ -> Increment) ] [ text ("+") ]
        ]

// Using createSimpleApp instead of createApp since our
// update function doesn't generate any actions. See 
// some of the other more advanced examples for how to
// use createApp. In addition to the application functions
// we also need to specify which renderer to use.
createApp initValue view update Virtualdom.createRender
|> withNavigation urlParser urlUpdate
|> withStartNodeSelector "#hello"
|> start
