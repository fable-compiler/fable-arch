# Clock sample

This sample will show you how to use producers.
A producer, is used to push a message into your application from the outside world.
In this sample, the producer is used to push a `Tick` actions every seconds.

## Model

The model will store two values:
* The `Time` string representation
* The `Date` string representation

```fsharp
/// A really simple type to Store our ModelChanged
type Model =
  { Time: string      // Time: HH:mm:ss
    Date: string }    // Date: YYYY/MM/DD

  /// Static member giving back an init Model
  static member Initial =
    { Time = "00:00:00"
      Date = "01/01/1970" }
```


## Actions

There is only one action defined. This action is a `Tick` which will transport a `DateTime` value.

```fsharp
type Actions =
  | Tick of DateTime
```

## Update

```fsharp
/// Make sure that number have a minimal representation of 2 digits
let normalizeNumber x =
  if x < 10 then
    sprintf "0%i" x
  else
    string x

let update model action =
  let model_, action_ =
    match action with
    /// Tick are push by the producer
    | Tick datetime ->
      // Normalize the day and month to ensure a 2 digit representation
      let day = datetime.Day |> normalizeNumber
      let month = datetime.Month |> normalizeNumber
      // Create our date string
      let date = sprintf "%s/%s/%i" month day datetime.Year
      { model with
          Time = String.Format("{0:HH:mm:ss}", datetime)
          Date = date }, []
  model_, action_
```

## Producer

Here is the producer used to send a `Tick` actions every seconds into the application.

```fsharp
let tickProducer push =
  window.setInterval((fun _ ->
      push(Tick DateTime.Now)
      null
  ), 1000) |> ignore
  // Force the first to push to have immediate effect
  // If we don't do that there is one second before the first push
  // and the view is rendered with the Model.init values
  push(Tick DateTime.Now)
```

To a register a producer in your application you need to call `withProducer`.

```fsharp
createApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> withProducer tickProducer
|> start
```
