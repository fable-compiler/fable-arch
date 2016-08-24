 - tagline: How to use Hot Module Replacement with Fable-VirtualDom

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

The file `Source/static/index.js` is used has a starting point by Webpack.

```js
// Pull in desired css/stylus files
require( '../styles/app.styl' );

// Call Entry point
var Entry = require( '../../out/Entry' );
```

The application start point is `Entry` module (js file).
Fable is generating one *.js* file by *.fsx*.

The `Entry.fsx` file is used to set up the HMR and start the VirtualDom application.

```fsharp
let contentNode = "#app"

#if DEV_HMR

type IModule =
  abstract hot: obj with get, set

let [<Global>] [<Emit("module")>] Module : IModule = failwith "JS only"

let node = document.querySelector contentNode

if isNotNull Module.hot then
  Module.hot?accept() |> ignore

  Module.hot?dispose(fun _ ->
    node.removeChild(node.firstChild) |> ignore
  ) |> ignore
#endif

App.Main.start contentNode ()
```

The file `Main.fsx` is a Fable-VirtualDom application with some configuration to support the HMR. 

```fsharp
type Model =
    { Input: string }

    static member initial =
      #if DEV_HMR
      // This section is used to maintain state between HMR
      if isNotNull (unbox window?storage) then
        unbox window?storage
      else
        let model = { Input = "" }
        window?storage <- model
        model
      #else
      { Input = "" }
      #endif

  // Actions supported by the application
  type Actions =
    | ChangeInput of string

  let update (model: Model) action =
    let model', action' =
      match action with
      | ChangeInput s ->
        { model with Input = s } , []

    #if DEV_HMR
    // Update the model in storage
    window?storage <- model'
    #endif

    model', action'
```

We used the `window?storage` to store the state of our application on each update and load the app from here if there is information in it at loading time.

## Known limitations

There is some limitation with the actual way to maintain the state. All your application state stored in the model is working. 

But you will lose the focus on the current node (input, textarea, etc.) because it's not stored in your model. 
And Fable-VirtualDom is going to redraw your application on reload.

## Can I use it ?

Definitely yes, I am actually using this template for all my Fable-VirtualDom projects. 
You just need to clone the repo and follow the [How to use in development mode ?](#How-to-use-in-development-mode) to start playing with this starter.

## Bonus

The embedded webpack is also configure to generate production ready files. 

You just run the command `npm run build` and got the folder `public/` generated with all the files need for your client side.
