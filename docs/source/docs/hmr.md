 - tagline: Explanation on how to use Hot Module Replacement with Fable-VirtualDom

# Hot Module Replacement

According to webpack website:

> “Hot Module Replacement” (HMR) is a feature to inject updated modules into the active runtime.
>
> It’s like LiveReload for every module.

In this documentation we are going to see how HMR can be used with Fable-VirtualDom to dynamically update the application and maintain the state between realods.


## How to use in development mode ?

First we need to install the npm dependencies and dev dependencies with: `npm install`

Second we run `npm run dev` which have two effect:

1. Start fable compiler in watching mode
2. Start webpack development server for serving the files and activating the HMR

Now you can access the website by navigating at [http://localhost:8080](http://localhost:8080)


## Architecture

The application start point is `Entry.fsx`

```fsharp
let contentNode = "#app"

type IModule =
  abstract hot: obj with get, set

let [<Global>] [<Emit("module")>] Module : IModule = failwith "JS only"

let node = document.querySelector contentNode

if isNotNull Module.hot then
  Module.hot?accept() |> ignore

  Module.hot?dispose(fun _ ->
    node.removeChild(node.firstChild) |> ignore
  ) |> ignore
```

In this file we are activating the HMR support