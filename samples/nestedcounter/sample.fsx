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

module VDom =
  let voidLinkAction<'T> : Attribute<'T> = property "href" "javascript:void(0)"
  let column<'T> : DomNode<'T> = div [ classy "column" ] []

module Counter =

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
        { model with Value = model.Value + 1 }, []
    // Substract 1 to the counter Value
    | Sub ->
        { model with Value = model.Value - 1 }, []
    // Set the counter Value to 0
    | Reset ->
        { model with Value = 0 }, []
  let simpleButton txt action =
    div
      [ classy "column is-narrow is-narrow-mobile" ]
      [ a
          [ classy "button"
            VDom.voidLinkAction<Actions>
            onMouseClick(fun _ ->
              action
            )
          ]
          [ text txt ]
      ]

  let view model =
    div
      [ classy "columns is-vcentered is-flex-mobile" ]
      [
        div
          [ classy "column is-narrow is-narrow-mobile"
            Style [ "width", "170px" ]
          ]
          [ text (sprintf "Counter value: %i" model.Value) ]
        simpleButton "+1" Add
        simpleButton "-1" Sub
        simpleButton "Reset" Reset
      ]

type Actions =
  | CreateCounter
  | DeleteCounter of int
  | ResetAll
  | CounterActions of int * Counter.Model * Counter.Actions

type Model =
  { Counters: (int * Counter.Model) list
    NextId: int
  }

  static member Initial =
    { Counters = []
      NextId = 0
    }

let update model action =
  match action with
  // Create a new tuple composed of an unique Id and an initial counter record.
  // We also increment the `NextId` value for future usage.
  | CreateCounter ->
      { model with
          Counters = model.Counters @ [(model.NextId, Counter.Model.Initial)]
          NextId = model.NextId + 1 }, []
  // In functional programming we work with immutable data to avoid side effect.
  // So to delete a specific counter, we build a new list minus the counter having is counterId equal to id
  | DeleteCounter id ->
      let counters =
        model.Counters
        |> List.filter(fun (counterId, _) ->
          counterId <> id
        )
      { model with Counters = counters }, []
  // Iterate over the counter list to trigger a Reset message for each.
  | ResetAll ->
      let message =
        [ fun h ->
            for (id, counter) in model.Counters do
              h(CounterActions (id, counter, Counter.Reset))
        ]
      model, message
  // Apply actions of sub application
  | CounterActions (id, counter, act) ->
      // Apply sub application update
      let (res, action) = Counter.update counter act
      // Remap the new sub app actions
      let mActions = mapActions CounterActions action
      // Update the counter list with the new value
      let counters =
        model.Counters
        |> List.map(fun (counterId, counterModel) ->
          if counterId = id then
            (counterId, res)
          else
            (counterId, counterModel)
        )
      { model with Counters = counters }, mActions

let simpleButton txt action =
  div
    [ classy "column is-narrow" ]
    [ a
        [ classy "button"
          VDom.voidLinkAction<Actions>
          onMouseClick(fun _ ->
            action
          )
        ]
        [ text txt ]
    ]

let counterRow (id, counter) =
  div
    [ classy "columns is-vcentered is-flex-mobile" ]
    [ VDom.column<Actions>
      div
        [ classy "column is-narrow" ]
        [
          a
            [ classy "button"
              VDom.voidLinkAction<Actions>
              onMouseClick(fun _ ->
                (DeleteCounter id)
              )
            ]
            [ i
                [ classy "fa fa-trash" ]
                []
            ]
          ]
      div
        []
        [ Html.map (fun act -> CounterActions (id, counter, act)) (Counter.view counter) ]
      VDom.column<Actions>
    ]

let view model =
  let countersView =
    model.Counters
    |> List.map(fun (id, counter) -> counterRow (id, counter))
  div
    []
    (div
      [ classy "columns is-vcentered is-flex-mobile" ]
      [ VDom.column<Actions>
        simpleButton "Create a new counter" CreateCounter
        simpleButton "Reset all" ResetAll
        VDom.column<Actions>
      ] :: countersView)

createApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> start
