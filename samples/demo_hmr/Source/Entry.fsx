#r "../node_modules/fable-core/Fable.Core.dll"
#load "../node_modules/fable-import-virtualdom/Fable.Helpers.Virtualdom.fs"
#load "Main.fs"

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Browser

open Fable.Helpers.Virtualdom
open Fable.Helpers.Virtualdom.App
open Fable.Helpers.Virtualdom.Html

open System

open Herebris


[<Emit("module")>]
type Module =
  abstract hot: obj with get, set

let [<Global>] [<Emit("module")>] Module : Module = failwith "JS only"

if (Module.hot <> null) then
  Module.hot?accept() |> ignore

  let appNode = document.getElementById "app"

  Module.hot?dispose(fun _ ->
    appNode.removeChild(appNode.firstChild) |> ignore
  ) |> ignore

type Model =
  { Input: string
    Messages: string list}
  static member initial =
    if (unbox window?storage <> null) then
      unbox window?storage
    else
      let model =
        { Input = ""
          Messages = []}
      window?storage <- model
      model

type Action =
  | NoOp
  | ChangeInput of string
  | SendEcho
  | ReceivedEcho of string

let webSocket =
  WebSocket.Create("wss://echo.websocket.org")

let update (model: Model) action =
  let model', action' =
    match action with
    | ReceivedEcho msg ->
      { model with Messages = msg :: model.Messages } ,[]
    | ChangeInput s ->
      { model with Input = s }, []
    | SendEcho ->
      { model with Input = "" }, []
    | _ ->
      model, []

  let jsCall =
    match action with
    | SendEcho -> webSocket.send(model.Input)
    | _ -> ()

  window?storage <- model'

  model', action'

let inline onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))
let onEnter succ nop = onKeyup (fun x -> if (unbox x?keyCode) = 13 then succ else nop)

let viewMessage msg =
  div
    []
    [ span
        []
        [ text msg ]
      br []
    ]

let view model =
  Main.coucou()
  div
    []
    [ div
        []
        [ text "Guide"
          ol
            []
            [ li
                []
                [ text "Enter your text" ]
              li
                []
                [ text "Press enter or click the button" ]
              li
                []
                [ text "See the message been received and added to the list" ]
            ]
        ]
      input
        [ onInput ChangeInput
          property "value" model.Input
          onEnter SendEcho NoOp ]
      button
        [ onMouseClick (fun _ -> SendEcho) ]
        [ text "Send" ]
      br []
      span
        []
        [ text "Messages received:" ]
      div
        []
        (model.Messages |> List.map(viewMessage))
    ]

let webSocketProducer push =
  webSocket.addEventListener_message(
    Func<_,_>(fun e ->
      push(ReceivedEcho (unbox e.data))
      null
  )
)

createApp Model.initial view update
|> withStartNodeSelector "#app"
|> withProducer webSocketProducer
|> start renderer
