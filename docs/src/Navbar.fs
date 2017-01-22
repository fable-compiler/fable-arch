namespace WebApp

open Fable.Core
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html

open WebApp.Common

module Navbar =

  type Model =
    { CurrentPage: Route
    }

    static member Initial (page) =
      { CurrentPage = page
      }

    static member CurrentPage_ =
      (fun r -> r.CurrentPage), (fun v r -> { r with CurrentPage = v })

  type Actions
    = NoOp
    | NavigateTo of Route

  type NavLink =
    { Text: string
      Route: Route
    }

    static member Create (text, route) =
      { Text = text
        Route = route
      }

  let update model action =
    match action with
    | NoOp -> model, []
    | NavigateTo route ->
      let message =
        [ fun _ ->
            let url = resolveRoutesToUrl route
            match url with
            | Some u -> location.hash <- u
            | None -> failwith "Cannot be reached. Route should always be resolve"
        ]
      model, message

  let navItem navLink currentPage =
    let class' =
      classBaseList
        "nav-item"
        [ "is-active", navLink.Route = currentPage
        ]
    a
      [ class'
        voidLinkAction<Actions>
        onMouseClick(fun _ ->
          NavigateTo navLink.Route
        )
      ]
      [ text navLink.Text ]

  let navButton id href faClass txt =
    a
      [ classy "button"
        property "id" id
        property "href" href
        property "target" "_blank"
      ]
      [ span
          [ classy "icon"]
          [ i
              [ classy (sprintf "fa %s" faClass) ]
              []
          ]
        span
          []
          [ text txt ]
      ]

  let navButtons =
    span
      [ classy "nav-item"]
      [ navButton "twitter" "https://twitter.com/FableCompiler" "fa-twitter" "Twitter"
        navButton "github" "https://github.com/fable-compiler/fable-arch" "fa-github" "Fork me"
        navButton "github" "https://gitter.im/fable-compiler/Fable" "fa-comments" "Gitter"
      ]

  let view model =
    nav
      [ classy "nav" ]
      [ div
          [ classy "nav-left" ]
          [ h1
              [ classy "nav-item is-brand title is-4"
                voidLinkAction<Actions>
              ]
              [ text "Fable-Arch"
              ]
          ]
        navButtons
      ]
