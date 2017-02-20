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

module VDom =
  let onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))

type Model = string

type Actions =
  | ChangeStr of string

let update model action =
  match action with
  | ChangeStr str -> str

let view (model: Model) =
  div
    [ classy "columns is-flex-mobile" ]
    [ div [ classy "column" ] []
      div
        [ classy "column is-narrow is-narrow-mobile"
          Style [ "width", "400px" ]
        ]
        [ label
            [ classy "label" ]
            [ text "Enter your name:" ]
          p
            [ classy "control" ]
            [ input
                [ classy "input"
                  property "type" "text"
                  property "placeholder" "Ex: Joe Doe"
                  property "value" model
                  VDom.onInput ChangeStr
                ]
            ]
          span
            []
            [ text (sprintf "Hello %s" model) ]
        ]
      div [ classy "column" ] []
    ]

createSimpleApp "" view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> withSubscriber (fun x -> Fable.Import.Browser.console.log("Event received: ", x))
|> start
