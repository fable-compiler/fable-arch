# Hello sample

This sample is very basic in order to show you the basic structure of an application.

In this sample, we want to ask the user to enter a name and then say hello to him.

## Model

The first thing we defined is the model. This is used to store all the information used by our application.

In our case, we simply defined a string alias

```fsharp
type Model = string
```

## Actions

The actions are used to describe what can happen in your application.

In our case, we have only one action taking a string as a value

```fsharp
type Actions =
| ChangeStr of string
```

## Update

The update function is where we handle all the logic of our application.

In our case, we update the model with the new value transported by the `ChangeInput` action.

```fsharp
let update model action =
  match action with
  | ChangeStr str -> str
```

## View

The view function is where we set up the VirtualDom used by the display.

```fsharp
let view (model: Model) =
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
              VDom.onInput ChangeStr
            ]
        ]
      span
        []
        [ text (sprintf "Hello %s" model) ]
    ]
```

The function `VDom.onInput` is a simple helper to access the value from the onInput event. Below is its definition.

```fsharp
module VDom =
  let onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))
```
