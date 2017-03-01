namespace WebApp

open Fable.Arch.Html

module Common =

  [<RequireQualifiedAccess>]
  module UserApi =
    type Route =
      | Index
      | Create
      | Edit of int
      | Show of int

  [<RequireQualifiedAccess>]
  module DocsApi =
    type Route =
      | Index
      | Viewer of string

  [<RequireQualifiedAccess>]
  module SampleApi =
    type Route =
      | Index
      | Viewer of string * int
      
  type Route =
    | Index
    | Docs of DocsApi.Route
    | Sample of SampleApi.Route
    | About

  let resolveRoutesToUrl r =
    match r with
      | Index -> Some "/"
      | Docs api ->
        match api with
        | DocsApi.Index -> Some "/docs"
        | DocsApi.Viewer fileName -> Some (sprintf "/docs?fileName=%s" fileName)
      | Sample api ->
        match api with
        | SampleApi.Index -> Some "/sample"
        | SampleApi.Viewer (fileName, height) -> Some (sprintf "/sample/%s?height=%i" fileName height)
      | About -> Some "/about"
       
  let voidLinkAction<'T> : Attribute<'T> = property "href" "javascript:void(0)"

  module VDom =

    [<AutoOpen>]
    module Types =

      type LabelInfo =
        { RefId: string
          Text: string
        }

        static member Create (refId, txt) =
          { RefId = refId
            Text = txt
          }

        member self.fRefId =
          sprintf "f%s" self.RefId

      type InputInfo<'Action> =
        { RefId: string
          Placeholder: string
          Value: string
          Action: string -> 'Action
        }

        static member Create (refId, placeholder, value, action) =
          { RefId = refId
            Placeholder = placeholder
            Value = value
            Action = action
          }

        member self.fRefId =
          sprintf "f%s" self.RefId

        member self.ToLabelInfo txt =
          { RefId = self.RefId
            Text = txt
          }

    module Html =

      open Fable.Core.JsInterop
      open Fable.Import

      let onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))

      let controlLabel (info: Types.LabelInfo) =
        label
            [ classy "label"
              attribute "for" info.fRefId
            ]
            [ text info.Text ]

      let formInput<'Action> (info: Types.InputInfo<'Action>) =
        div
          []
          [
            controlLabel (info.ToLabelInfo "Firstname")
            p
              [ classy "control" ]
              [ input
                  [ classy "input"
                    attribute "id" info.fRefId
                    attribute "type" "text"
                    attribute "placeholder" info.Placeholder
                    property "value" info.Value
                    onInput (fun x -> info.Action x)
                  ]
              ]
          ]

      let column<'T> : DomNode<'T> = div [ classy "column" ] []

      let sampleView title sampleDemoView markdownText =
        let markdownHTML =
          if markdownText = "" then
            div
              [ classy "has-text-centered" ]
              [ i
                  [ classy "fa fa-spinner fa-pulse fa-3x fa-fw" ]
                  []
              ]
          else
            div
              [ classy "content"
                property "innerHTML" markdownText
              ]
              []

        div
          [ classy "section" ]
          [ div
              [ classy "content" ]
              [ h1
                  []
                  [ text title ]
              ]
            div
              [ classy "columns" ]
              [ div
                  [ classy "column is-half is-offset-one-quarter" ]
                  [ sampleDemoView ]
              ]
            div
              [ classy "content" ]
              [ h1
                  []
                  [ text "Explanations" ]
                markdownHTML
              ]
          ]
