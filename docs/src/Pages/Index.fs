namespace WebApp.Pages

open Fable.Import
open Fable.Arch
open Fable.Arch.Html

module Index =

  let markdownText =
    "
# Fable-arch samples

Fable-arch is a set of tools for building modern web applications inspired by the [elm architecture](http://guide.elm-lang.org/architecture/index.html).

Fable-arch use [Fable](http://fable.io/) which allow you to write your code using F# and compile in JavaScript.

It is implemented around a set of abstractions which makes it possible to implement custom renderers if there is a need.
Fable-arch comes with a HTML Dsl and a renderer built on top of [virtual-dom](https://github.com/Matt-Esch/virtual-dom) and all
the samples here are using those two tools.
Hopefully the samples here show you how to get started and gives you some inspiration about how to build your application using Fable-arch.

You can also contribute more examples by sending us a pull request.
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
