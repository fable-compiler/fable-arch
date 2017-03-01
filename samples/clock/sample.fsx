// If you are using the sample in standalone please switch the import lines
// #r "node_modules/fable-core/Fable.Core.dll"
// #r "node_modules/fable-arch/Fable.Arch.dll"
// Imports for docs site mode
#r "../../node_modules/fable-core/Fable.Core.dll"
#r "../../node_modules/fable-arch/Fable.Arch.dll"

open Fable.Core
open Fable.Import
open Fable.Import.Browser

open Fable.Arch
open Fable.Arch.Html
open Fable.Arch.App

open System

module Clock =

  type Actions =
    | Tick of DateTime

  /// A really simple type to Store our ModelChanged
  type Model =
    { Time: string      // Time: HH:mm:ss
      Date: string }    // Date: YYYY/MM/DD

    /// Static member giving back an init Model
    static member Initial =
      { Time = "00:00:00"
        Date = "01/01/1970" }


  /// Make sure that number have a minimal representation of 2 digits
  let normalizeNumber x =
    if x < 10 then
      sprintf "0%i" x
    else
      string x

  let update model action =
    let model_, action_ =
      match action with
      /// Tick are push by the producer
      | Tick datetime ->
        // Normalize the day and month to ensure a 2 digit representation
        let day = datetime.Day |> normalizeNumber
        let month = datetime.Month |> normalizeNumber
        // Create our date string
        let date = sprintf "%s/%s/%i" month day datetime.Year
        { model with
            Time = String.Format("{0:HH:mm:ss}", datetime)
            Date = date }, []
    model_, action_

  let view model =
    div
      [ classy "content has-text-centered" ]
      [ h1
          [ classy "is-marginless" ]
          [ text (sprintf "%s %s" model.Date model.Time )]
      ]

  let tickProducer push =
    window.setInterval((fun _ ->
        push(Tick DateTime.Now)
        null
    ), 1000) |> ignore
    // Force the first to push to have immediate effect
    // If we don't do that there is one second before the first push
    // and the view is rendered with the Model.init values
    push(Tick DateTime.Now)


  createApp Model.Initial view update Virtualdom.createRender
  |> withStartNodeSelector "#sample"
  |> withProducer tickProducer
  |> start