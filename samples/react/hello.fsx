(**
 - title: Hello world - getting with simple app
 - tagline: Hello world implemented with fable-arch
 - app-style: width:800px; margin:20px auto 50px auto;
 - intro: This is a simple "hello world" application.
*)

#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-arch/Fable.Arch.Html.fs"
#load "node_modules/fable-arch/Fable.Arch.App.fs"
#load "node_modules/fable-import-react/Fable.Import.React.fs"
#load "node_modules/fable-import-react/Fable.Helpers.React.fs"
#load "node_modules/fable-arch/Fable.Arch.Virtualdom.fs"
#load "node_modules/fable-arch/Fable.Arch.DevTools.fs"

open Fable.Core
open Fable.Core.JsInterop

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html

open Fable.Core
open Fable.Import
open Fable.Import.React



// MODEL

type Model = {count:int}


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


type MkView<'model> = ('model->unit) -> ('model->ReactElement<obj>)
type Props<'model> = {
    main:MkView<'model>
}

module Components =
    let mutable internal mounted = false

    type App<'model>(props:Props<'model>) as this =
        inherit Component<obj,'model>()
        do
            mounted <- false
        
        let safeState state =
            match mounted with 
            | false -> this.state <- state
            | _ -> this.setState state
        let view = props.main safeState
        member this.componentDidMount() =
            mounted <- true

        member this.render () =
            view this.state 

// rendering views with React
module R = Fable.Helpers.React
open Fable.Core.JsInterop
open Fable.Helpers.React.Props

let view {count = count} dispatch =
  let onClick msg =
    OnClick <| fun _ -> msg |> dispatch 

  R.div []
    [ R.button [ onClick Decrement ] [ unbox "-" ]
      R.div [] [ unbox (string count) ]
      R.button [ onClick Increment ] [ unbox "+" ]
    ]

let placeholderId = "#hello"

let createRenderer viewFn initModel sel h v = 
  let mutable setState = None
  let main s = 
    setState <- Some s
    s initModel
    fun model -> viewFn model h
  Fable.Import.React_Extensions.ReactDom.render(
      R.com<Components.App<_>,_,_> {main = main} [],
      Fable.Import.Browser.document.getElementsByClassName("hello").[0]
  ) |> ignore

  fun h vm -> (setState |> Option.get) vm
//  (setState |> Option.get) initModel
//  handler

  fun hand vm ->
    (setState |> Option.get) vm

let reactView = id
let initModel = {count = 0}
let renderer = createRenderer view initModel
createSimpleApp initModel reactView update renderer
|> withStartNodeSelector placeholderId
|> withPlugin (Fable.Arch.DevTools.createDevTools<Msg, Model> "something" initModel)
|> start
