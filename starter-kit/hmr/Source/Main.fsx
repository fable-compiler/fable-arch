#r "../node_modules/fable-core/Fable.Core.dll"
#load "../node_modules/fable-import-virtualdom/Fable.Helpers.Virtualdom.fs"
#load "Helpers.fsx"

namespace App

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Browser

open Fable.Helpers.Virtualdom
open Fable.Helpers.Virtualdom.App
open Fable.Helpers.Virtualdom.Html

open System
open Helpers

module Main =

  type Model =
    { Input: string }

    static member initial =
      #if DEV_HMR
      // This section is used to maintain state between HMR
      if isNotNull (unbox window?storage) then
        unbox window?storage
      else
        let model = { Input = "" }
        window?storage <- model
        model
      #else
      { Input = "" }
      #endif

  // Actions supported by the application
  type Actions =
    | ChangeInput of string

  let update (model: Model) action =
    let model', action' =
      match action with
      | ChangeInput s ->
        { model with Input = s } , []

    #if DEV_HMR
    // Update the model in storage
    window?storage <- model'
    #endif

    model', action'

  /// Custom binding for inInput. This directly give the value
  let inline onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))
  /// View
  let view model =
    div
      []
      [
        label
          []
          [text "Enter name: "]
        input
          [ onInput ChangeInput ]
        br []
        span
          []
          [text (sprintf "Hello %s" model.Input)]
      ]

  let start node () =
    createApp Model.initial view update
    |> withStartNodeSelector node
    |> start renderer
