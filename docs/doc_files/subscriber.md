# Subscriber

A subscriber is a function attach to an application. This subscriber will be notify every time an event/message is being handle by the application.

## Signature


As we can see here a subscriber is a function taking `ModelChanged<'TMessage,'TModel>` as an entry and return `unit`.

ModelChanged type definition:
```fsharp
type ModelChanged<'TMessage, 'TModel> =
  {
    PreviousState: 'TModel
    Message: 'TMessage
    CurrentState: 'TModel
  }
```

## Sample

Here a sample, showing how to print in the console all the message handle by the app.

```fsharp
createApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#app"
// Here is the subscriber
|> withSubscriber (fun x -> console.log("Action received:", x.Message))
|> start
|> ignore
```
