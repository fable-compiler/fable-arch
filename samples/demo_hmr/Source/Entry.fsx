#r "../node_modules/fable-core/Fable.Core.dll"
#load "Helpers.fsx"
#load "Main.fsx"

open Fable.Core
open Fable.Import
open Fable.Import.Browser

open Fable.Core.JsInterop
open Helpers

type IModule =
  abstract hot: obj with get, set

let [<Global>] [<Emit("module")>] Module : IModule = failwith "JS only"

let contentNode = "#app"
let node = document.querySelector contentNode

if isNotNull Module.hot then
  Module.hot?accept() |> ignore

  Module.hot?dispose(fun _ ->
    node.removeChild(node.firstChild) |> ignore
  ) |> ignore

Herebris.Main.start contentNode ()
