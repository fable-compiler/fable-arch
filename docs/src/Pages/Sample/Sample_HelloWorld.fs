namespace WebApp.Pages.Sample

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.Html
open Fable.PowerPack
open Fable.PowerPack.Fetch

open WebApp.Common
open WebApp

open System

module HelloWorld =

  /// [BeginBlock:Model]
  type Model = string
  /// [EndBlock]

  /// [BeginBlock:Actions]
  type Actions
      = ChangeInput of string
  /// [EndBlock]

  /// [BeginBlock:Update]
  let update model action =
    match action with
    | ChangeInput str -> str, []
  /// [EndBlock]

  /// [BeginBlock:View]
  let sampleDemo model =
    div
      []
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
                VDom.Html.onInput ChangeInput
              ]
          ]
        span
          []
          [ text (sprintf "Hello %s" model) ]
      ]
  /// [EndBlock]

  let docs = new DocGen.Documentation(__SOURCE_FILE__)

  /// Our application view
  let view model =
    VDom.Html.sampleView "Hello world sample" (sampleDemo model) docs.Html

  (*
  [BeginDocs]

  This sample is very basic in order to show you the basic structure of an application.

  In this sample, we want to ask the user to enter a name and then say hello to him.

  ## Model

  The first thing we defined is the model. This is used to store all the information used by our application.

  In our case, we simply defined a string alias

  [FsharpBlock:Model]

  ## Actions

  The actions are used to describe what can happen in your application.

  In our case, we have only one action taking a string as a value

  [FsharpBlock:Actions]

  ## Update

  The update function is where we handle all the logic of our application.

  In our case, we update the model with the new value transported by the `ChangeInput` action.

  [FsharpBlock:Update]

  ## View

  The view function is where we set up the VirtualDom used by the display.

  [FsharpBlock:View]

  The function `VDom.Html.onInput` is a simple helper to access the value from the onInput event. Below is its definition.

  ```fsharp
  let onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))
  ```

  [EndDocs]
  *)
