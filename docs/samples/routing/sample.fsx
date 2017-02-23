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
open Fable.Import.Browser
open System.Text.RegularExpressions


module VDom =
  open Fable.Core.JsInterop

  let onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))

type Operator =
  | Sum
  | Sub
  | Mul
  | Unknown

type Model = 
  { Operator: Operator
    NumberA: int
    NumberB: int
  }

  static member Initial =
    {
      Operator = Unknown
      NumberA = 0
      NumberB = 0
    }

type Page =
  | Index
  | Sum of int * int
  | Sub of int * int
  | Mul of int * int

type Actions =
  | NavigateTo of Page
  | ChangeNumberA of string
  | ChangeNumberB of string
  | ChangeOperator of Operator

let isValidNumber input =
  Regex.Match(input, "^\d+$").Success

let update model action =
  match action with
  | ChangeOperator op ->
      { model with Operator = op }
  | ChangeNumberA value ->
      if isValidNumber value then
        { model with NumberA = int value }
      else
        model
  | ChangeNumberB value ->
      if isValidNumber value then
        { model with NumberA = int value }
      else
        model
  | NavigateTo op ->
      model

let simpleButton txt action =
  div
    [ classy "column is-narrow is-narrow-mobile" ]
    [ a
        [ classy "button"
          onMouseClick(fun _ ->
            action
          )
        ]
        [ text txt ]
    ]

type NumberAreaInfo =
  {
    Label: string
    OnInputAction: string -> Actions
    Value: int
  }

let numberArea (areaInfo: NumberAreaInfo) =
    div
      [ classy "control" 
      ]
      [ div
          [ classy "control-label" ]
          [ label
              [ classy "label" ]
              [ text areaInfo.Label ]
          ]
        div
          [ classy "control" 
          ]
          [ input
              [ classy "input" 
                VDom.onInput areaInfo.OnInputAction
                property "type" "number"
                property "value" (string areaInfo.Value)
                Style [ "width", "180px"]
              ]
          ]
      ]

let isSelected value ref =
  if value = ref then
    property "selected" "selected"
  else
    property "" ""

open Fable.Core.JsInterop
let Hook = fun () -> ()

let t = Hook?prototype?hook <- JsFunc3(
  fun node propertyName previousValue -> 
    console.log "Hello world"
)

let testHook () =
  div
    [ property "my-hook" !!(Hook ())
    ]
    [ text "Test hook" ]

let view model =
  table
    [ classy "table" ]
    [ testHook ()
      thead
        []
        [ tr
            []
            [ th
                []
                [ text "Number A" ]
              th
                []
                [ text "Operator" ]
              th
                []
                [ text "Number B" ]
            ]
        ]
      tbody
        []
        [ tr
            []
            [ td
                []
                [ input
                    [ classy "input" 
                      //VDom.onInput areaInfo.OnInputAction
                      property "type" "number"
                      //property "value" (string areaInfo.Value)
                      Style [ "width", "180px"]
                    ]
                ]
              td
                []
                [ div
                    [ classy "select" ]
                    [ select
                        [ ]
                        [ option 
                            [ property "disabled" "disabled"
                              isSelected model.Operator Operator.Unknown
                            ] 
                            [ text "" ]
                          option 
                            [ isSelected model.Operator Operator.Sum
                            ] 
                            [ text "Add" ]
                          option 
                            [ isSelected model.Operator Operator.Sub
                            ] 
                            [ text "Sub" ]
                          option 
                            [ isSelected model.Operator Operator.Mul
                            ] 
                            [ text "Mul" ]
                        ]
                    ]
                ]
              td
                []
                [ input
                    [ classy "input" 
                      //VDom.onInput areaInfo.OnInputAction
                      property "type" "number"
                      //property "value" (string areaInfo.Value)
                      Style [ "width", "180px"]
                    ]
                ]
            ]
        ]
    ]


  //div
  //  [ classy "columns"
  //  ]
  //  [ div
  //      [ classy "control" ]
  //      [ div
  //          [ classy "control-label" ]
  //          [ label
  //              [ classy "label" ]
  //              [ text "Choose an operator" ]
  //          ]
  //          ]
  //      ]
  //    numberArea
  //      {
  //        Label = "Number A"
  //        OnInputAction = (fun x -> ChangeNumberA x)
  //        Value = model.NumberA
  //      }
  //    numberArea
  //      {
  //        Label = "Number B"
  //        OnInputAction = (fun x -> ChangeNumberB x)
  //        Value = model.NumberB
  //      }
  //    //div
  //    //  [ classy "control is-grouped is-vcentered is-clearfix" ]
  //    //  [ p
  //    //      [ classy "control" ]
  //    //      [ button
  //    //          [ classy "button is-primary" ]
  //    //          [ text "Calculate" ]
  //    //      ]
  //    //    p
  //    //      [ classy "control" ]
  //    //      [ button
  //    //          [ classy "button is-link" ]
  //    //          [ text "Reset" ]
  //    //      ]
  //    //  ]
  //  ]

// Routing part

let routes =
  [
    runM (NavigateTo Index) (pStaticStr "/" |> (drop >> _end))
  ]

let resolveRoutesToUrl r =
  match r with
  | Index -> Some "/"
  | Sum (numA, numB) -> Some (sprintf "/sum/%i/%i" numA numB)
  | Sub (numA, numB) -> Some (sprintf "/sub/%i/%i" numA numB)
  | Mul (numA, numB) -> Some (sprintf "/mul/%i/%i" numA numB)

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

// Using createSimpleApp instead of createApp since our
// update function doesn't generate any actions. See
// some of the other more advanced examples for how to
// use createApp. In addition to the application functions
// we also need to specify which renderer to use.
createSimpleApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> withProducer (routeProducer locationHandler router)
|> withSubscriber (routeSubscriber locationHandler routerF)
|> start