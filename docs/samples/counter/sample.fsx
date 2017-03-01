// If you are using the sample in standalone please switch the import lines
// #r "node_modules/fable-core/Fable.Core.dll"
// #r "node_modules/fable-arch/Fable.Arch.dll"
// Imports for docs site mode
#r "../../node_modules/fable-core/Fable.Core.dll"
#r "../../node_modules/fable-arch/Fable.Arch.dll"

open Fable.Core
open Fable.Import
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html

open System

type Actions =
  | Add
  | Sub
  | Reset

type Model =
  { Value: int
  }

  /// Static member giving back an init Model
  static member Initial =
    { Value = 0 }

let update model action =
  match action with
  // Add 1 to the counter Value
  | Add ->
      { model with Value = model.Value + 1 }
  // Substract 1 to the counter Value
  | Sub ->
      { model with Value = model.Value - 1 }
  // Set the counter Value to 0
  | Reset ->
      { model with Value = 0 }

let voidLinkAction<'T> : Attribute<'T> = property "href" "javascript:void(0)"
let simpleButton txt action =
  div
    [ classy "column is-narrow is-narrow-mobile" ]
    [ a
        [ classy "button"
          voidLinkAction<Actions>
          onMouseClick(fun _ ->
            action
          )
        ]
        [ text txt ]
    ]

let view model =
  div
    [ classy "columns is-vcentered is-flex-mobile" ]
    [ // We add a column at the beginning and the end to force center of the view
      div [ classy "column" ] []
      div
        [ classy "column is-narrow is-narrow-mobile"
          Style [ "width", "170px" ]
        ]
        [ text (sprintf "Counter value: %i" model.Value) ]
      simpleButton "+1" Add
      simpleButton "-1" Sub
      simpleButton "Reset" Reset
      div [ classy "column" ] []
    ]


createSimpleApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> start