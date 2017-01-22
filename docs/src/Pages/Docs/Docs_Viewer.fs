namespace WebApp.Pages.Docs

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
    { FileName: string
      Html: string
      State: State
    }

    static member Initial fileName =
      { FileName = fileName
        Html = ""
        State = Pending
      }

  type Model =
    { CurrentFile: string
      DocsHTML: DocHTML list
    }

    static member Initial =
      { CurrentFile = ""
        DocsHTML = []
      }

  type Actions =
    | SetDoc of string
    | SetDocHTML of string * string

  let update model action =
    match action with
    | SetDoc fileName ->
        // Fetch the markdown content only if unknown doc entry
        let exist =
          model.DocsHTML
          |> List.exists(fun x -> x.FileName = fileName)
        if exist then
          { model with CurrentFile = fileName } , []
        else
          let m' =
            { model with
                CurrentFile = fileName
                DocsHTML =  (DocHTML.Initial fileName) :: model.DocsHTML
            }
          let message =
            [ fun h ->
              fetch (DocGen.createDocFilesDirectoryURL fileName) []
              |> Promise.bind(fun res ->
                res.text()
              )
              |> Promise.map(fun text ->
                  h(SetDocHTML (fileName, Marked.Globals.marked.parse text))
              )
              |> ignore
            ]
          m', message
    | SetDocHTML (key, html) ->
        let docs =
          model.DocsHTML
          |> List.map(fun doc ->
            if doc.FileName = key then
              { doc with
                  State = Available
                  Html = html
              }
            else
              doc
          )

        { model with DocsHTML = docs}, []


  let view model =
    let doc =
      // Catch KeyNotFoundException which occured when the markdown
      // content have never been fetched yet
      try
        model.DocsHTML
        |> List.find(fun x ->
          x.FileName = model.CurrentFile
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
              [ html ]
          ]
      ]
