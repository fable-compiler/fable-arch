namespace WebApp.Pages.Sample

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html
open Fable.Core
open Fable.Import
open Fable.Import.Browser
open Fable.PowerPack
open Fable.PowerPack.Fetch
open WebApp.Common
open WebApp

module Viewer =

  type State =
    | Available
    | Pending

  type DocHTML =
    { SampleName: string
      Html: string
      State: State
    }

    static member Initial sampleName =
      { SampleName = sampleName
        Html = ""
        State = Pending
      }

  type Model =
    { CurrentFile: string
      IframeHeight: int
      DocsHTML: DocHTML list
    }

    static member Initial =
      { CurrentFile = ""
        DocsHTML = []
        IframeHeight = 350
      }

  type Actions =
    | SetDoc of string
    | SetDocHTML of string * string
    | SetHeight of int

  let update model action =
    match action with
    | SetDoc (sampleName) ->
        // Fetch the markdown content only if unknown doc entry
        let exist =
          model.DocsHTML
          |> List.exists(fun x -> x.SampleName = sampleName)
        if exist then
          { model with CurrentFile = sampleName } , []
        else
          let m' =
            { model with
                CurrentFile = sampleName
                DocsHTML =  (DocHTML.Initial sampleName) :: model.DocsHTML
            }
          let message =
            [ fun h ->
                fetch (DocGen.createSampleReadmeURL sampleName) []
                |> Promise.bind(fun res ->
                  res.text()
                )
                |> Promise.map(
                  fun text ->
                    h(SetDocHTML (sampleName, Marked.Globals.marked.parse text))
                )
                |> ignore
              fun h ->
                try
                  let search = location.href.Split '?'
                  let parameters = search.[1].Split '&'
                  let heightParam =
                    parameters
                    |> Array.find(fun p -> p.Contains "height")
                  let height = int (heightParam.Split '=').[1]
                  h(SetHeight height)
                // If an error occured when extracting height from the parameters
                // We do nothing
                with
                  | _ -> console.error "Error when extracting the iframe height parameter"
            ]
          m', message
    | SetDocHTML (key, html) ->
        let docs =
          model.DocsHTML
          |> List.map(fun doc ->
            if doc.SampleName = key then
              { doc with
                  State = Available
                  Html = html
              }
            else
              doc
          )

        { model with DocsHTML = docs}, []
    | SetHeight height ->
        { model with IframeHeight = height }, []

  let iframe x = elem "iframe" x

  let view model =
    let doc =
      // Catch KeyNotFoundException which occured when the markdown
      // content have never been fetched yet
      try
        model.DocsHTML
        |> List.find(fun x ->
          x.SampleName = model.CurrentFile
        )
        |> Some
      with _ -> None

    let html =
      if doc.IsSome && doc.Value.State = Available then
        div
          [ property "innerHTML" doc.Value.Html ]
          []
      else
        div
          [ classy "has-text-centered" ]
          [ i
              [ classy "fa fa-spinner fa-pulse fa-3x fa-fw" ]
              []
          ]

    div
      [ classy "section" ]
      [ div
          [ classy "content" ]
          [ div
              [ classy "container" ]
              [ h1
                  [ classy "has-text-centered" ]
                  [ text "Demo" ]
                div
                  [ classy "columns" ]
                  [ div
                      [ classy "column is-half is-offset-one-quarter has-text-centered" ]
                      [ a
                          [ classy "button is-primary is-pulled-left"
                            property "href" (DocGen.createSampleDirectoryURL model.CurrentFile)
                            property "target" "_blank"
                          ]
                          [ text "Open in tab" ]
                        a
                          [ classy "button is-pulled-right"
                            property "href" (DocGen.githubURL model.CurrentFile)
                            property "target" "_blank"
                          ]
                          [ span
                              [ classy "icon"]
                              [ i
                                  [ classy "fa fa-github" ]
                                  []
                              ]
                            span
                              []
                              [ text "Go to source" ]
                          ]
                        br []
                        br []
                        iframe
                          [ classy "sample-viewer"
                            property "src" (DocGen.createSampleDirectoryURL model.CurrentFile)
                            property "height" (string model.IframeHeight)
                          ]
                          []
                      ]
                  ]
                div
                  [ classy "content" ]
                  [ h1
                      [ classy "has-text-centered" ]
                      [ text "Explanations" ]
                    div
                      [ classy "container" ]
                      [ html ]
                  ]
              ]
          ]
      ]
