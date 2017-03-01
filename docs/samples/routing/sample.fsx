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
open Fable.Arch.RouteParser.Parsing
open Fable.Arch.RouteParser.RouteParser
open Fable.Core.JsInterop
open Fable.Import.Browser
open System.Text.RegularExpressions


module VDom =
  open Fable.Core.JsInterop

  let onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))

type Actions =
  | NavigateTo of Page
  | ChangeNumberA of string
  | ChangeNumberB of string
  | ChangeOperator of Operator

and Operator =
  | Sum
  | Sub
  | Mul
  | Divide
  | Unknown

// Routing part
and Page =
  | Index
  | Sum of int * int
  | Sub of int * int
  | Mul of int * int
  | Divide of int * int
  | Unknown of int * int

let routes =
  [
    runM (NavigateTo Index) (pStaticStr "/" |> (drop >> _end))
    runM1 (fun numbers -> NavigateTo (Unknown numbers)) (pStaticStr "/unknown" </.> pint </> pint |> _end)
    runM1 (fun numbers -> NavigateTo (Sum numbers)) (pStaticStr "/sum" </.> pint </> pint |> _end)
    runM1 (fun numbers -> NavigateTo (Sub numbers)) (pStaticStr "/sub" </.> pint </> pint |> _end)
    runM1 (fun numbers -> NavigateTo (Mul numbers)) (pStaticStr "/mul" </.> pint </> pint |> _end)
    runM1 (fun numbers -> NavigateTo (Divide numbers)) (pStaticStr "/divide" </.> pint </> pint |> _end)
  ]

let resolveRoutesToUrl r =
  match r with
  | Index -> Some "/"
  | Sum (numA, numB) -> Some (sprintf "/sum/%i/%i" numA numB)
  | Sub (numA, numB) -> Some (sprintf "/sub/%i/%i" numA numB)
  | Mul (numA, numB) -> Some (sprintf "/mul/%i/%i" numA numB)
  | Divide(numA, numB) -> Some (sprintf "/divide/%i/%i" numA numB)
  | Unknown(numA, numB) -> Some (sprintf "/unknown/%i/%i" numA numB)

let mapToRoute route =
  match route with
  | NavigateTo r ->
    resolveRoutesToUrl r
  | _ -> None

let router = createRouter routes mapToRoute

let locationHandler =
  {
    SubscribeToChange =
      ( fun h ->
          window.addEventListener_hashchange(fun _ ->
            h(location.hash.Substring 1)
            null
          )
      )
    PushChange =
      (fun s -> location.hash <- s)
  }

let routerF m = router.Route m.Message

type Model =
  { Operator: Operator
    NumberA: int
    NumberB: int
    Result: float
  }

  static member Initial =
    {
      Operator = Operator.Unknown
      NumberA = 0
      NumberB = 0
      Result = 0.
    }

  static member CreateFromPage page =
    match page with
    | Sum (numA, numB) ->
        { Operator = Operator.Sum
          NumberA = numA
          NumberB = numB
          Result = numA + numB |> float
        }
    | Sub (numA, numB) ->
        { Operator = Operator.Sub
          NumberA = numA
          NumberB = numB
          Result = numA - numB |> float
        }
    | Mul (numA, numB) ->
        { Operator = Operator.Mul
          NumberA = numA
          NumberB = numB
          Result = numA * numB |> float
        }
    | Divide (numA, numB) ->
        { Operator = Operator.Divide
          NumberA = numA
          NumberB = numB
          Result = float numA / float numB
        }
    | Unknown (numA, numB) ->
        { Operator = Operator.Unknown
          NumberA = numA
          NumberB = numB
          Result = Fable.Import.JS.NaN
        }
    | Index -> Model.Initial

let isValidNumber input =
  Regex.Match(input, "(^\d+$){0,1}").Success

let saveIntoURL model =
  [ fun _ ->
      match model.Operator with
      | Operator.Divide ->
          Page.Divide(model.NumberA, model.NumberB)
      | Operator.Sum ->
          Page.Sum(model.NumberA, model.NumberB)
      | Operator.Sub ->
          Page.Sub(model.NumberA, model.NumberB)
      | Operator.Mul ->
          Page.Mul(model.NumberA, model.NumberB)
      | Operator.Unknown ->
          Page.Unknown(model.NumberA, model.NumberB)
      |> resolveRoutesToUrl
      |> function
          | Some s -> locationHandler.PushChange (sprintf "#%s" s)
          | None -> ()
  ]

let update model action =
  match action with
  | ChangeOperator op ->
      let m = { model with Operator = op }
      m, saveIntoURL m
  | ChangeNumberA value ->
      if isValidNumber value then
        let m = { model with NumberA = int value }
        m, saveIntoURL m
      else
        model, []
  | ChangeNumberB value ->
      if isValidNumber value then
        let m = { model with NumberB = int value }
        m, saveIntoURL m
      else
        model, []
  | NavigateTo page ->
      Model.CreateFromPage page , []


type NumberAreaInfo =
  {
    OnInputAction: string -> Actions
    Value: int
  }

let numberArea (areaInfo: NumberAreaInfo) =
  input
    [ classy "input"
      VDom.onInput areaInfo.OnInputAction
      property "type" "number"
      property "value" (string areaInfo.Value)
      Style [ "width", "100px"]
    ]

let isSelected value ref =
  if value = ref then
    property "selected" "selected"
  else
    property "" ""

let view model =
  div
    [ classy "columns is-flex-mobile" ]
    [ div [ classy "column" ] []
      p
        [ classy "control has-addons"]
        [
          numberArea {
            OnInputAction = (fun x -> ChangeNumberA x)
            Value = model.NumberA
          }
          div
            [ classy "select" ]
            [ select
                [ onChange (fun ev -> ChangeOperator (ofJson<Operator> (unbox ev?target?value)))
                ]
                [ option
                    [ property "disabled" "disabled"
                      isSelected model.Operator Operator.Unknown
                      property "value" "Unknown"
                    ]
                    [ text "" ]
                  option
                    [ isSelected model.Operator Operator.Sum
                      property "value"  (toJson Operator.Sum)
                    ]
                    [ text "+" ]
                  option
                    [ isSelected model.Operator Operator.Sub
                      property "value" (toJson Operator.Sub)
                    ]
                    [ text "-" ]
                  option
                    [ isSelected model.Operator Operator.Mul
                      property "value" (toJson Operator.Mul)
                    ]
                    [ text "*" ]
                  option
                    [ isSelected model.Operator Operator.Divide
                      property "value" (toJson Operator.Divide)
                    ]
                    [ text "/" ]
                ]
            ]
          numberArea {
            OnInputAction = (fun x -> ChangeNumberB x)
            Value = model.NumberB
          }
          span
            [ classy "control is-vcentered" ]
            [
              div
                [ classy "button is-primary" ]
                [ text (sprintf "= %.2f" model.Result ) ]
            ]
        ]
      div [ classy "column" ] []
    ]

// Using createSimpleApp instead of createApp since our
// update function doesn't generate any actions. See
// some of the other more advanced examples for how to
// use createApp. In addition to the application functions
// we also need to specify which renderer to use.
createApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> withProducer (routeProducer locationHandler router)
|> withSubscriber (routeSubscriber locationHandler routerF)
|> start

if location.hash = "" then
  location.hash <- "/"
else
  // Else trigger hashchange to navigate to current route
  window.dispatchEvent(Event.Create("hashchange")) |> ignore
