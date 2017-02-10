namespace WebApp.Pages.Docs

open Fable.Core
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html

open WebApp
open WebApp.Common

module Dispatcher =

  type Model =
    { Viewer: Viewer.Model
    }

    static member Initial (currentPage: DocsApi.Route) =
      { Viewer = Viewer.Model.Initial
      }

  type Actions =
    | NoOp
    | ViewerActions of Viewer.Actions

  let update model action =
    match action with
    | NoOp ->
        model, []
    | ViewerActions act ->
        let (res, action) = Viewer.update model.Viewer act
        let action' = mapActions ViewerActions action
        { model with Viewer = res}, action'


  type TileDocs =
    { Title: string
      SubTitle: string
      FileName: string
    }

  let tileDocs info =
    div
      [ classy "tile is-parent is-vertical" ]
      [ article
          [ classy "tile is-child notification" ]
          [ p
              [ classy "title" ]
              [ a
                  [ voidLinkAction<Actions>
                    property "href" (DocGen.createDocURL info.FileName)
                  ]
                  [ text info.Title ]
              ]
            p
              [ classy "subtitle" ]
              [ text info.SubTitle ]
          ]
      ]

  let tileVertical tiles =
    div
      [ classy "tile is-vertical is-6" ]
      (tiles |> List.map tileDocs)

  let indexView =
    div
      [ classy "container" ]
      [ div
          [ classy "section" ]
          [ div
              [ classy "tile is-ancestor" ]
              [ tileVertical
                  [ { Title = "Hot Module Replacement (HMR)"
                      SubTitle = "Hot Module Reloading, or Replacement, is a feature where you inject update modules in a running application.
                                  This opens up the possibility to time travel in the application without losing context.
                                  It also makes it easier to try out changes in the functionality while retaining the state of the application."
                      FileName = "hmr"
                    }
                  ]
                tileVertical
                  [ { Title = "Subscriber"
                      SubTitle = "A subscriber is a function attached to an application. The subscriber will be notified every time an event/message
                                  is handled by the application."
                      FileName = "subscriber"
                    }
                  ]
              ]
          ]
      ]


  let view model subRoute =
    match subRoute with
    | DocsApi.Index -> indexView
    | DocsApi.Viewer _ -> Html.map ViewerActions (Viewer.view model.Viewer)
