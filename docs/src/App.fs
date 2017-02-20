namespace WebApp

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.App.AppApi
open Fable.Arch.Html
open Fable.Arch.RouteParser.Parsing
open Fable.Arch.RouteParser.RouteParser

open Aether
open Aether.Operators

open WebApp
open WebApp.Common

open System

module Main =

  type SubModels =
    { Navbar: Navbar.Model
      Header: Header.Model
      Docs: Pages.Docs.Dispatcher.Model
      Sample: Pages.Sample.Dispatcher.Model option
    }

    static member Initial =
      { Navbar = Navbar.Model.Initial(Index)
        Header = Header.Model.Initial(Index)
        Docs = Pages.Docs.Dispatcher.Model.Initial (DocsApi.Index)
        Sample = None
      }

    static member Header_ =
      (fun r -> r.Header), (fun v r -> { r with Header = v } )

    static member Docs_ =
      (fun r -> r.Docs), (fun v r -> { r with Docs = v } )

    static member Sample_ =
      (fun r -> r.Sample), (fun v r -> { r with Sample = Some v } )

    static member Navbar_ =
      (fun r -> r.Navbar), (fun v r -> { r with Navbar = v } )

  type Model =
    { CurrentPage: Route
      SubModels: SubModels
    }

    static member Initial =
      { CurrentPage = Index
        SubModels = SubModels.Initial
      }

    static member SubModels_ =
      (fun r -> r.SubModels), (fun v r -> { r with SubModels = v } )

    static member CurrentPage_ =
      (fun r -> r.CurrentPage), (fun v r -> { r with CurrentPage = v } )


  type Actions
    = NoOp
    | NavigateTo of Route
    | SampleDispatcherAction of Pages.Sample.Dispatcher.Actions
    | DocsDispatcherAction of Pages.Docs.Dispatcher.Actions
    | HeaderActions of Header.Actions
    | NavbarActions of Navbar.Actions


  let update model action =
    match action with
    | NavigateTo route ->
      match route with
      | Index ->
          let m' =
            model
            |> Optic.set (Model.SubModels_ >-> SubModels.Header_ >-> Header.Model.CurrentPage_) route
            |> Optic.set (Model.SubModels_ >-> SubModels.Navbar_ >-> Navbar.Model.CurrentPage_) route
            |> Optic.set (Model.CurrentPage_) route
          m', []
      | About ->
          let m' =
            model
            |> Optic.set (Model.SubModels_ >-> SubModels.Header_ >-> Header.Model.CurrentPage_) route
            |> Optic.set (Model.SubModels_ >-> SubModels.Navbar_ >-> Navbar.Model.CurrentPage_) route
            |> Optic.set (Model.CurrentPage_) route
          m', []
      | Docs subRoute ->
          // Info: We don't set a new value for SubModels.Docs because the value is set at the start of the app
          // and we want to keep the Docs value in "memory" to avoid get doc markdown files severals times
          let m' =
            model
            |> Optic.set (Model.SubModels_ >-> SubModels.Header_ >-> Header.Model.CurrentPage_) route
            |> Optic.set (Model.SubModels_ >-> SubModels.Navbar_ >-> Navbar.Model.CurrentPage_) route
            |> Optic.set (Model.CurrentPage_) route

          let message =
            match subRoute with
            | DocsApi.Index -> []
            | DocsApi.Viewer fileName ->
              [ fun h ->
                  h (DocsDispatcherAction (Pages.Docs.Dispatcher.ViewerActions (Pages.Docs.Viewer.SetDoc fileName)))
              ]

          m', message
      | Sample subRoute ->
          let m' =
            model
            |> Optic.set (Model.SubModels_ >-> SubModels.Sample_) (Pages.Sample.Dispatcher.Model.Initial(subRoute))
            |> Optic.set (Model.SubModels_ >-> SubModels.Header_ >-> Header.Model.CurrentPage_) route
            |> Optic.set (Model.SubModels_ >-> SubModels.Navbar_ >-> Navbar.Model.CurrentPage_) route
            |> Optic.set (Model.CurrentPage_) route

          let message =
            match subRoute with
            | SampleApi.Index -> []
            | SampleApi.Viewer (sampleName, _)->
              [ fun h ->
                  h (SampleDispatcherAction (Pages.Sample.Dispatcher.ViewerActions (Pages.Sample.Viewer.SetDoc sampleName)))
              ]

          m', message
    | DocsDispatcherAction act ->
        let (res, action) = Pages.Docs.Dispatcher.update model.SubModels.Docs act
        let action' = mapActions DocsDispatcherAction action
        let m' = Optic.set (Model.SubModels_ >-> SubModels.Docs_) res model
        m', action'
    | SampleDispatcherAction act ->
        // We need to protect from undefined model here
        // This can occured because we are using a producer to Tick the clock sample every seconds
        if model.SubModels.Sample.IsSome then
          let (res, action) = Pages.Sample.Dispatcher.update model.SubModels.Sample.Value act
          let action' = mapActions SampleDispatcherAction action
          let m' = Optic.set (Model.SubModels_ >-> SubModels.Sample_) res model
          m', action'
        else
          model, []
    | NavbarActions act ->
        let (res, action) = Navbar.update model.SubModels.Navbar act
        let action' = mapActions NavbarActions action
        let m' = Optic.set (Model.SubModels_ >-> SubModels.Navbar_) res model
        m', action'
    | HeaderActions act ->
        let (res, action) = Header.update model.SubModels.Header act
        let action' = mapActions HeaderActions action
        let m' = Optic.set (Model.SubModels_ >-> SubModels.Header_) res model
        m', action'
    | NoOp -> model, []

  let view model =
    let pageHtml =
      match model.CurrentPage with
      | Index -> Pages.Index.view()
      | Docs subRoute -> Html.map DocsDispatcherAction (Pages.Docs.Dispatcher.view model.SubModels.Docs subRoute)
      | Sample subRoute -> Html.map SampleDispatcherAction (Pages.Sample.Dispatcher.view model.SubModels.Sample.Value subRoute)
      | About -> Pages.About.view()

    let navbarHtml =
      Html.map NavbarActions (Navbar.view model.SubModels.Navbar)

    let headerHtml =
      Html.map HeaderActions (Header.view model.SubModels.Header)

    div
      []
      [ div
          [ classy "navbar-bg" ]
          [ div
              [ classy "container" ]
              [ navbarHtml
              ]
          ]
        headerHtml
        pageHtml
      ]

  // Customs helpers over the RouteParser
  let (<?>) p1 p2 =
      p1 .>> pchar '?' .>>. p2

  let (<.?>) p1 p2 =
      p1 .>> pchar '?' .>> p2

  let (<?.>) p1 p2 =
    p1 >>. pchar '?' >>. p2

  let (<=>) p1 p2 =
      p1 .>> pchar '=' .>>. p2

  let (<.=>) p1 p2 =
      p1 .>> pchar '=' .>> p2

  let (<=.>) p1 p2 =
    p1 >>. pchar '=' >>. p2

  let routes =
    [
      runM (NavigateTo Index) (pStaticStr "/" |> (drop >> _end))
      runM1 (fun fileName -> NavigateTo (Docs (DocsApi.Viewer fileName))) ((pStaticStr "/docs") <?> (pStaticStr "fileName") <=.> pString)
      runM (NavigateTo (Docs DocsApi.Index)) (pStaticStr "/docs" |> (drop >> _end))
      runM (NavigateTo (Sample SampleApi.Index)) (pStaticStr "/sample" |> (drop >> _end))
      runM2 (fun info -> NavigateTo(Sample (SampleApi.Viewer info))) (pStaticStr "/sample" </.> pStringTo '?' .>> pStaticStr "height" <=> pint |> _end)
      runM (NavigateTo About) (pStaticStr "/about" |> (drop >> _end))
    ]
    
  let mapToRoute route =
    match route with
    | NavigateTo r ->
        resolveRoutesToUrl r
    | _ -> None


  let router = createRouter routes mapToRoute

  let locationHandler =
    {
      SubscribeToChange =
        (fun h ->
            window.addEventListener_hashchange(fun _->
              h(location.hash.Substring 1)
              null
            )
        )

      PushChange =
        (fun s -> location.hash <- s)
    }


  let routerF m = router.Route m.Message

  createApp Model.Initial view update Virtualdom.createRender
  |> withStartNodeSelector "#app"
  |> withProducer (routeProducer locationHandler router)
  |> withSubscriber (routeSubscriber locationHandler routerF)
  |> start

  // Init location
  // If hash is empty go to root
  if location.hash = "" then
    location.hash <- "/"
  else
    // Else trigger hashchange to navigate to current route
    window.dispatchEvent(Event.Create("hashchange") ) |> ignore


  [<Emit("Prism.languages.fsharp")>]
  let prismFSharp = ""

  // Configure markdown parser
  let options =
    createObj [
      "highlight" ==> fun code -> PrismJS.Globals.Prism.highlight(code, unbox prismFSharp)
      "langPrefix" ==> "language-"
    ]

  Marked.Globals.marked.setOptions(unbox options)
  |> ignore
