namespace WebApp.Pages.Sample

open Fable.Core
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html

open WebApp
open WebApp.Common

module Dispatcher =

  type Model =
    {
      Viewer: Viewer.Model
    }

    static member Initial (currentPage: SampleApi.Route) =
      {
        Viewer = Viewer.Model.Initial
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
      Height: int
    }

  type SectionsInfo =
    {
      Section1: TileDocs list
      Section2: TileDocs list
      Section3: TileDocs list
    }

    static member Initial =
      {
        Section1 = []
        Section2 = []
        Section3 = []
      }

  let tileDocs info =
    let sampleURL =
      let sampleApi = SampleApi.Viewer (info.FileName, info.Height)
      match resolveRoutesToUrl (Sample sampleApi) with
      | Some url -> sprintf "#%s" url
      | None -> failwith "Uknown route"

    div
      [ classy "tile is-parent is-vertical" ]
      [ article
          [ classy "tile is-child notification" ]
          [ p
              [ classy "title" ]
              [ a
                  [ voidLinkAction<Actions>
                    property "href" sampleURL
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
      [ classy "tile is-vertical is-4" ]
      (tiles |> List.map tileDocs)
  let tileSection tiles =
    let rec divideTiles tiles index sectionsInfo =
      match tiles with
      | tile::trail ->
          let sectionsInfo' =
            match index % 3 with
            | 0 ->
                { sectionsInfo with
                    Section1 = sectionsInfo.Section1 @ [tile] }
            | 1 ->
                { sectionsInfo with
                        Section2 = sectionsInfo.Section2 @ [tile] }
            | 2 ->
                { sectionsInfo with
                        Section3 = sectionsInfo.Section3 @ [tile] }
            | _ -> failwith "Should not happened"
          divideTiles trail (index + 1) sectionsInfo'
      | [] ->
          sectionsInfo

    let info = divideTiles tiles 0 SectionsInfo.Initial
    div
      [ classy "tile is-ancestor" ]
      [ tileVertical info.Section1
        tileVertical info.Section2
        tileVertical info.Section3
      ]

  let beginnerView =
    div
      []
      [
        h1
          [ classy "title" ]
          [ text "Beginner" ]
        tileSection
          [ { Title = "Hello World"
              SubTitle = "A simple application showing inputs usage"
              FileName = "hello"
              Height = 350
            }
            { Title = "Counter"
              SubTitle = "A simple application showing how to support multiple actions"
              FileName = "counter"
              Height = 300
            }
            { Title = "Nested counter"
              SubTitle = "A application showing how to use nested application"
              FileName = "nestedcounter"
              Height = 400
            }
            { Title = "Clock"
              SubTitle = "A clock showing producer usage"
              FileName = "clock"
              Height = 300
            }
            { Title = "Echo"
              SubTitle = "An echo application showing how to make ajax calls"
              FileName = "echo"
              Height = 500
            }
            { Title = "Subscriber"
              SubTitle = "This application show you how to register a subscriber to your application"
              FileName = "subscriber"
              Height = 350
            }
            { Title = "Navigation"
              SubTitle = "This application show you how to use the navigation feature of Fable-Arch"
              FileName = "navigation"
              Height = 350
            }
            { Title = "React"
              SubTitle = "Port of the counter sample using React"
              FileName = "reactCounter"
              Height = 300
            }
          ]
      ]

  let advancedView =
    div
      []
      [
        h1
          [ classy "title" ]
          [ text "Medium" ]
        tileSection
          [ { Title = "Calculator"
              SubTitle = "A calculator application"
              FileName = "calculator"
              Height = 600
            }
            { Title = "Routing"
              SubTitle = "This application show you how to use the navigation feature of Fable-Arch"
              FileName = "routing"
              Height = 350
            }
          ]
      ]

  let expertView =
    div
      []
      [
        h1
          [ classy "title" ]
          [ text "Advanced" ]
        tileSection
          [
          ]
        div
          []
          [ text "Nothing to show yet"]
      ]

  let indexView =
    div
      [ classy "container" ]
      [ div
          [ classy "section" ]
          [
            beginnerView
            hr []
            advancedView
            hr []
            expertView
          ]
      ]

  let view model subRoute =
    match subRoute with
    | SampleApi.Index -> indexView
    | SampleApi.Viewer _ -> Html.map ViewerActions (Viewer.view model.Viewer)
