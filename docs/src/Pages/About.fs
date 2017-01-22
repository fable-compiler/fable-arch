namespace WebApp.Pages

open Fable.Import
open Fable.Arch
open Fable.Arch.Html

module About =

  let markdownText =
    "
# About

This website is written with:

- [Fable](http://fable.io/) a transpiler F# to Javascript
- [Fable-arch](https://github.com/fable-compiler/fable-arch) a set of tools for building modern web applications inspired by the [elm architecture](http://guide.elm-lang.org/architecture/index.html).
- [Bulma](http://bulma.io/) a modern CSS framework based on Flexbox
- [Marked](https://github.com/chjj/marked) a markdown parser and compiler. Built for speed
- [PrismJS](http://prismjs.com/) a lightweight, extensible syntax highlighter
    "

  let view () =
    div
      [ classy "section" ]
      [ div
          [ classy "container" ]
          [ div
              [ classy "content"
                property "innerHTML" (Marked.Globals.marked.parse(markdownText))
              ]
              []
          ]
      ]
