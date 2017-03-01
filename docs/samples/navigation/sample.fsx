// If you are using the sample in standalone please switch the import lines
// #r "node_modules/fable-core/Fable.Core.dll"
// #r "node_modules/fable-arch/Fable.Arch.dll"
// Imports for docs site mode
#r "../../node_modules/fable-core/Fable.Core.dll"
#r "../../node_modules/fable-arch/Fable.Arch.dll"

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.App.AppApi
open Fable.Arch.Html
open Fable.Arch.Navigation


// Url handling
let toUrl count = sprintf "#/%i" count
    
let urlParser location = 
  int (location.Hash.Substring(2))

// Model
type Model =
  { Value: int
  }

  /// Static member giving back an init Model
  static member Initial =
    { Value = 0 }

let initValue = Location.getLocation() |> urlParser

type Actions =
  | Increment
  | Decrement
  | Reset

let update model action =
  match action with
  // Increment by 1
  | Increment ->
      { model with Value = model.Value + 1 }
  // Decrement by 1
  | Decrement ->
      { model with Value = model.Value - 1 }
  // Set the counter Value to 0
  | Reset ->
      { model with Value = 0 }
  // We return the new value and push a new state in the Navigation history
  |> (fun m -> m, [fun _ -> Navigation.pushState (toUrl m.Value)])

// Update function used by the Navigation
// This function is used to uddate the model when a Navigation event occured
let navigationUpdate model urlValue =  
  { model with Value = urlValue }, []

// View
let voidLinkAction<'T> : Attribute<'T> = property "href" "javascript:void(0)"
let simpleButton txt action =
  div
    [ classy "column is-narrow is-narrow-mobile" ]
    [ a
        [ classy "button"
          voidLinkAction<Actions>
          onMouseClick(fun _ ->
            action
          )
        ]
        [ text txt ]
    ]

let view model =
  div
    [ classy "columns is-vcentered is-flex-mobile" ]
    [ // We add a column at the beginning and the end to force center of the view
      div [ classy "column" ] []
      div
        [ classy "column is-narrow is-narrow-mobile"
          Style [ "width", "170px" ]
        ]
        [ text (sprintf "Counter value: %i" model.Value) ]
      simpleButton "+1" Increment
      simpleButton "-1" Decrement
      simpleButton "Reset" Reset
      div [ classy "column" ] []
    ]

createApp Model.Initial view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> withNavigation urlParser navigationUpdate
|> start
