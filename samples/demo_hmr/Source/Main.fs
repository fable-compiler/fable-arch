module Herebris

  open Fable.Core
  open Fable.Core.JsInterop
  open Fable.Import
  open Fable.Import.Browser

  open Fable.Helpers.Virtualdom
  open Fable.Helpers.Virtualdom.App
  open Fable.Helpers.Virtualdom.Html

  open System
  [<AutoOpen>]
  module Main =

    type Model =
      { Input: string
        Messages: string list}

      static member initial =
        { Input = ""
          Messages = []}

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
            [ onInput (fun x -> ChangeInput x)
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
            (model.Messages |> List.map(fun x -> viewMessage x))
        ]

    let webSocketProducer push =
      webSocket.addEventListener_message(
        Func<_,_>(fun e ->
          push(ReceivedEcho (unbox e.data))
          null
      )
    )

    // createApp Model.initial view update
    // |> withProducer webSocketProducer
    // |> start renderer
    let coucou () = console.log "maxime"
