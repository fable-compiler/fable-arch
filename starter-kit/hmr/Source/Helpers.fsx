#r "../node_modules/fable-core/Fable.Core.dll"
namespace Helpers

open Fable.Core
open Fable.Import
open Fable.Import.Browser

[<AutoOpen>]
module Helpers =

  let isNotNull x =
    not (isNull x)
