(**
 - title: Hello react - a simple counter using react
 - tagline: Hello world implemented with fable-arch and react as render. The devtools are also enabled.
 - app-style: width:800px; margin:20px auto 50px auto;
 - intro: This is a simple "hello world" type application.
*)

(**
To be able to use the devtools we also need to add virtualdom,
you should be able to disable them with a compiler directive.
*)
#r "../../node_modules/fable-core/Fable.Core.dll"
#r "../../node_modules/fable-react/Fable.React.dll"
#r "../../npm/Fable.Arch.dll"

open Fable.Core
open Fable.Core.JsInterop

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html
open Fable.Arch.React

open Fable.Core
open Fable.Import
open Fable.Import.React



// MODEL

type [<Pojo>] Model = {count:int}


type Msg =
  | Increment
  | Decrement


let init () =
  { count = 0 }

// UPDATE

let update {count = count} (msg:Msg) =
  match msg with
  | Increment ->
      { count = count + 1 }

  | Decrement ->
      { count = count - 1 }

// rendering views with React
module R = Fable.Helpers.React
open Fable.Core.JsInterop
open Fable.Helpers.React.Props

let view dispatch {count = count} =
  let onClick msg =
    OnClick <| fun _ -> msg |> dispatch

  R.div []
    [ R.button [ onClick Decrement ] [ unbox "-" ]
      R.div [] [ unbox (string count) ]
      R.button [ onClick Increment ] [ unbox "+" ]
    ]

let placeholderId = "#hello"

let initModel = {count = 0}

let createReactApp initState update createRenderer =
    {
        InitState = initState
        View = Unchecked.defaultof<_>
        Update = fun x y -> (update x y), []
        InitMessage = (fun _ -> ())
        CreateRenderer = fun sel h v -> createRenderer sel |> React
        NodeSelector = "body"
        Producers = []
        Subscribers = []
    }

createRenderer view initModel
|> createReactApp initModel update
|> withStartNodeSelector placeholderId
(**
To enable the devtools all we need is this line
*)
// |> withPlugin (Fable.Arch.DevTools.createDevTools<Msg, Model> "something" initModel)
|> start
