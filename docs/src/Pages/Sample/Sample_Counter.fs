namespace WebApp.Pages.Sample

open Fable.Core
open Fable.Import
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html

open WebApp.Common
open WebApp

open System

module Counter =

  /// [BeginBlock:Actions]
  type Actions
      = Add
      | Sub
      | Reset
  /// [EndBlock]

  /// [BeginBlock:Model]
  type Model =
      { Value: int
      }

      /// Static member giving back an init Model
      static member Initial =
        { Value = 0 }
  /// [EndBlock]

  /// [BeginBlock:Update]
  let update model action =
    match action with
    // Add 1 to the counter Value
    | Add ->
        { model with Value = model.Value + 1 }, []
    // Substract 1 to the counter Value
    | Sub ->
        { model with Value = model.Value - 1 }, []
    // Set the counter Value to 0
    | Reset ->
        { model with Value = 0 }, []
  /// [EndBlock]

  /// [BeginBlock:View]
  let simpleButton txt action =
    div
      [ classy "column is-narrow" ]
      [ a
          [ classy "button"
            voidLinkAction<Actions>
            onMouseClick(fun _ ->
              action
            )
          ]
          [ text txt ]
      ]

  let sampleDemo model =
    div
      [ classy "columns is-vcentered" ]
      [
        div
          [ classy "column is-narrow"
            Style [ "width", "170px" ]
          ]
          [ text (sprintf "Counter value: %i" model.Value) ]
        simpleButton "+1" Add
        simpleButton "-1" Sub
        simpleButton "Reset" Reset
      ]
  /// [EndBlock]

  let docs = new DocGen.Documentation(__SOURCE_FILE__)

  /// Our application view
  let view model =
    VDom.Html.sampleView "Counter sample" (sampleDemo model) docs.Html

  (*
  [BeginDocs]

  This sample will show you how to create a counter.

  ## Model

  The model will be a simple record holding a value.

  [FsharpBlock:Model]

  ## Actions

  There are three actions for the counter:

  * Add 1 to the current value.
  * Substract 1 to the current value.
  * Reset the value to 0.

  [FsharpBlock:Actions]

  ## Update

  [FsharpBlock:Update]

  ## View

  For the view, we create an helper function `simpleButton` in order to make the final view cleaner and avoid to repeat ourself.

  [FsharpBlock:View]

  [EndDocs]
  *)
