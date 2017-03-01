# Nested counter sample

This sample will show you how to create nested applications. Here we will used the counter sample as sub application.
In this sample every thing preceded by `Counter.` is comming from the counter sample.
Ex: `Counter.update` is the update function defined for the counter sample.

## Model

This application will show a list of counter so the model consist of a list of counter with an *Id* associated.
We also store in `NextId` the value we used for the next counter.

```fsharp
type Model =
  { Counters: (int * Counter.Model) list
    NextId: int
  }

  static member Initial =
    { Counters = []
      NextId = 0
    }
```

## Actions

There are four actions implemented:

* Create a new counter
* Delete the counter of a certain Id
* Reset all the counter value to zero
* Wrap the sub actions comming from the counter application.

```fsharp
type Actions =
  | CreateCounter
  | DeleteCounter of int
  | ResetAll
  | CounterActions of int * Counter.Model * Counter.Actions
```

As you can see the definition for `CounterActions` is a tuple.

* `int`: id of the counter on which we want to apply the actions
* `Counter.Model`: current value of the counter. We pass it to simply the update function.
* `Counter.Action`: action to apply

## Update

```fsharp
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
```

## View

For the view, the only special case is this line:

```fsharp
div
    []
    [ Html.map (fun act -> CounterActions (id, counter, act)) (Counter.sampleDemo counter) ]
```

Here we are using the `Html.map` function given by fable-arch. This functions will map the sub view message via the mapping function `(fun act -> CounterActions (id, counter, act))`.

```fsharp
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
    [ classy "columns is-vcentered" ]
    [ VDom.column<Actions>
      div
        [ classy "column" ]
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
      [ classy "columns is-vcentered" ]
      [ VDom.column<Actions>
        simpleButton "Create a new counter" CreateCounter
        simpleButton "Reset all" ResetAll
        VDom.column<Actions>
      ] :: countersView)
```
