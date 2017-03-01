# Routing Sample

Application showing you how to use the Router provided by Fable-arch

## Usage

In order to see the routing reflected in the address bar you need to click on "Open in tab".

You can use the GUI to play with the sample and see the address bar been updated.

You can also type directly into the address bar your operations.

## Routing preparation

### Pages

First we need to describe all the pages available in our Application.

```fsharp
type Page =
  | Index
  | Sum of int * int
  | Sub of int * int
  | Mul of int * int
  | Divide of int * int
  | Unknown of int * int
```

### Route parser

We will use `Fable.Arch.RouteParser` In order to parse the url address.
In the next function we are creating a list mapping the url values to the `Page` type we created before.

```fsharp
let routes =
  [
    runM (NavigateTo Index) (pStaticStr "/" |> (drop >> _end))
    runM1 (fun numbers -> NavigateTo (Unknown numbers)) (pStaticStr "/unknown" </.> pint </> pint |> _end)
    runM1 (fun numbers -> NavigateTo (Sum numbers)) (pStaticStr "/sum" </.> pint </> pint |> _end)
    runM1 (fun numbers -> NavigateTo (Sub numbers)) (pStaticStr "/sub" </.> pint </> pint |> _end)
    runM1 (fun numbers -> NavigateTo (Mul numbers)) (pStaticStr "/mul" </.> pint </> pint |> _end)
    runM1 (fun numbers -> NavigateTo (Divide numbers)) (pStaticStr "/divide" </.> pint </> pint |> _end)
  ]
```

### Convert Page into Url

```fsharp
let resolveRoutesToUrl r =
  match r with
  | Index -> Some "/"
  | Sum (numA, numB) -> Some (sprintf "/sum/%i/%i" numA numB)
  | Sub (numA, numB) -> Some (sprintf "/sub/%i/%i" numA numB)
  | Mul (numA, numB) -> Some (sprintf "/mul/%i/%i" numA numB)
  | Divide(numA, numB) -> Some (sprintf "/divide/%i/%i" numA numB)
  | Unknown(numA, numB) -> Some (sprintf "/unknown/%i/%i" numA numB)
```

### Helpers need by Fable.Arch.RouteParser

```fsharp
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
```

### Linked to the app

With attach our helpers to the application.

```fsharp
createApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> withProducer (routeProducer locationHandler router)
|> withSubscriber (routeSubscriber locationHandler routerF)
|> start
```

After you page has been loaded the state of your application is not sync with the address bar.
To fix that we need to trigger and `hashchange` event manually.

```fsharp
if location.hash = "" then
  location.hash <- "/"
else
  // Else trigger hashchange to navigate to current route
  window.dispatchEvent(Event.Create("hashchange")) |> ignore
```