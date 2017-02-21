# Subscriber sample

This sample take the [hello sample](#/sample/hello?height=350) and add a subscriber to it.

## Register subscriber

To register a subscriber we use `withSubscriber` function.

This function signature is `(ModelChanged<'a,'b> -> unit) -> app:AppSpecification<'b,'a,'c> -> AppSpecification<'b,'a,'c>`


So we need to provide it with a function taking a `ModelChanged` argument and return unit. We also need to pass it the `AppSpecification` on which to attach.

```fsharp
createSimpleApp "" view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
// Next line is how we register the subscriber
|> withSubscriber (fun x -> Fable.Import.Browser.console.log("Event received: ", x))
|> start
```
