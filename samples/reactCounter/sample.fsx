// If you are using the sample in standalone please switch the import lines
// #r "node_modules/fable-core/Fable.Core.dll"
// #r "node_modules/fable-arch/Fable.Arch.dll"
// Imports for docs site mode
#r "../../node_modules/fable-core/Fable.Core.dll"
#r "../../node_modules/fable-arch/Fable.Arch.dll"
#r "../../node_modules/fable-react/Fable.React.dll"

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.App.AppApi
open Fable.Arch.React
open Fable.Core
open Fable.Helpers.React
open Fable.Helpers.React.Props

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

//let voidLinkAction<'T> : Attribute<'T> = property "href" "javascript:void(0)"
let simpleButton txt action dispatch =
  let onClick msg =
    OnClick <| fun _ -> msg |> dispatch

  div
    [ ClassName "column is-narrow is-narrow-mobile" ]
    [ a
        [ ClassName "button"
          onClick action
        ]
        [ unbox txt ]
    ]

let view model dispatch =
  div
    [ ClassName "columns is-vcentered is-flex-mobile" ]
    [ // We add a column at the beginning and the end to force center of the view
      div [ ClassName "column" ] []
      div
        [ ClassName "column is-narrow is-narrow-mobile"
          Width (Case2 "170px")
        ]
        [ unbox (sprintf "Counter value: %i" model.Value) ]
      simpleButton "+1" Add dispatch
      simpleButton "-1" Sub dispatch
      simpleButton "Reset" Reset dispatch
      div [ ClassName "column" ] []
    ]

let createReactApp initModel view update =
  let renderer = createRenderer view initModel
  createSimpleApp initModel id update renderer

createReactApp Model.Initial view update
|> withStartNodeSelector "#sample"
|> start
