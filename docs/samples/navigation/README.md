# Navigation sample

This sample will reproduce the [counter sample](#/sample/counter?height=300) with support for Navigation.

## Usage

In order to see the navigation in the address bar you need to click on "Open in tab".

## Helpers

First we will need to write 3 functions.

The first named `toUrl` convert the `Model` into a string (url).

```fsharp
  let toUrl count = sprintf "#/%i" count
```

The second named `urlParser` take the location value and extract the `Model` state from it.

```fsharp
  let urlParser location = 
    location.Hash |> fromUrl
```

The third named `navigationUpdate` will be used by the Navigation module to reflect the url change into the model.

```fsharp
let navigationUpdate model urlValue =  
  { model with Value = urlValue }, []
```

## Update

```fsharp
let update model action =
  match action with
  // Increment by 1
  | Increment ->
      { model with Value = model.Value + 1 }
  // Decrement by 1
  | Decrement ->
      { model with Value = model.Value - 1 }
  // Set the counter Value to 0
  | Reset ->
      { model with Value = 0 }
  // We return the new value and push a new state in the Navigation history
  |> (fun m -> m, [fun _ -> Navigation.pushState (toUrl m.Value)])
```

## Attach Navigation module

We attach the navigation module by passing the `urlParser` and `navigationUpdate`.

```fsharp
createApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> withNavigation urlParser navigationUpdate
|> start
```