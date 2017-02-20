// If you are using the sample in standalone please switch the import lines
// #r "node_modules/fable-core/Fable.Core.dll"
// #r "node_modules/fable-arch/Fable.Arch.dll"
// Imports for docs site mode
#r "../../node_modules/fable-core/Fable.Core.dll"
#r "../../node_modules/fable-arch/Fable.Arch.dll"

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.App.AppApi
open Fable.Arch.Html
open Fable.Core.JsInterop
open Fable.Import.Browser


/// Helpers for working with input element from VirtualDom
let inline onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))

/// Used to make a fake ajax calls. It emulates a server which return the given input uppercased after 1.5 seconds.
let fakeAjax cb (data: string) =
  window.setTimeout((fun _ ->
    cb (data.ToUpper())
  )
  , 1500.) |> ignore

/// DU used to discriminate the State of the request
type Status =
  | None
  | Pending
  | Done

// Model
type Model =
  { InputValue: string
    ServerResponse: string
    Status: Status
  }

  static member Initial =
    { InputValue = ""
      ServerResponse = ""
      Status = None
    }

type Actions =
  | ChangeInput of string
  | SendEcho
  | ServerResponse of string
  | SetStatus of Status

// Update
let update model action =
  match action with
  // On input change with update the model value
  | ChangeInput str ->
      { model with InputValue = str } ,[]
  // When we got back a server response, we update the value of the server and set the state to Done
  | ServerResponse str ->
      { model with
          ServerResponse = str
          Status = Done }, []
  // Set the status in the model
  | SetStatus newStatus ->
      { model with Status = newStatus }, []
  | SendEcho ->
      let message =
        [ fun h ->
            fakeAjax
              (fun data ->
                h (ServerResponse data)
              )
              model.InputValue
            // We just sent an ajax request so make the state pending in the model
            h (SetStatus Pending)
        ]
      model, message

// View
let view model =
  // Choose what we want to display on output
  let resultArea =
    match model.Status with
    | None ->
        span
          []
          [ text "" ]
    | Pending ->
        span
          []
          [ text "Waiting Server response" ]
    | Done ->
        span
          []
          [ text "The server response is:"
            br []
            b
              []
              [ text model.ServerResponse ]
          ]

  div
    [ classy "columns is-flex-mobile" ]
    [ div [ classy "column" ] []
      div
        [ classy "column is-narrow is-narrow-mobile"
          Style [ "width", "400px" ]
        ]
        [ label
            [ classy "label"
              property "for" "input-area"
            ]
            [text "Enter a sentence: "]
          p
            [ classy "control" ]
            [ textarea
                [
                  property "id" "input-area"
                  classy "textarea"
                  onInput ChangeInput
                  property "value" model.InputValue
                ]
                []
            ]
          div
            [ classy "control" ]
            [ p
                []
                [ button
                    [ classy "button"
                      onMouseClick (fun _ -> SendEcho)
                    ]
                    [ text "Uppercase by server" ]
                ]
            ]
          resultArea
        ]
      div [ classy "column" ] []
    ]


createApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> start
