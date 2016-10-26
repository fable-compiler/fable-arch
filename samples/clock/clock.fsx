(**
 - title: A simple clock - producer demo
 - tagline: Clock implemented with fable-arch
 - app-style: width:800px; margin:20px auto 50px auto;
 - require-paths: `'virtual-dom':'lib/virtual-dom'`
 - intro: This demo shows how you can add a producers of actions to fable-arch.
*)

// Load Fable.Core and fable-arch files and bindings to JS global objects
#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-arch/Fable.Arch.Html.fs"
#load "node_modules/fable-arch/Fable.Arch.App.fs"
#load "node_modules/fable-arch/Fable.Arch.Virtualdom.fs"

open System
open Fable.Core
open Fable.Import
open Fable.Import.Browser
open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html

module Clock =

    /// Make sure that number have a minimal representation of 2 digits
    let normalizeNumber x =
        if x < 10 then
            sprintf "0%i" x
        else
            string x

    type Action =
        | Tick of DateTime

    /// A really simple type to Store our ModelChanged
    type Model =
        { Time: string      // Time: HH:mm:ss
          Date: string }    // Date: YYYY/MM/DD

        /// Static member giving back an init Model
        static member init =
            { Time = "00:00:00"
              Date = "1970/01/01" }

    /// Handle all the update of our Application
    let update model action =
        let model', action' =
            match action with
            /// Tick are push by the producer
            | Tick datetime ->
                // Normalize the day and month to ensure a 2 digit representation
                let day = datetime.Day |> normalizeNumber
                let month = datetime.Month |> normalizeNumber
                // Create our date string
                let date = sprintf "%i/%s/%s" datetime.Year month day
                { model with
                    Time = String.Format("{0:HH:mm:ss}", datetime)
                    Date = date }, []
        model', action'

    /// Our application view
    let view model =
        div
            []
            [ text model.Date
              br []
              text model.Time]

    /// Producer used to send the current Time every second
    let tickProducer push =
        window.setInterval((fun _ ->
            push(Tick DateTime.Now)
            null
        ),
            1000) |> ignore
        // Force the first to push to have immediate effect
        // If we don't do that there is one second before the first push
        // and the view is rendered with the Model.init values
        push(Tick DateTime.Now)

    /// Create and run our application
    createApp Model.init view update (Virtualdom.createRender)
    |> withStartNodeSelector "#app"
    |> withProducer tickProducer    // Attach our producer to the app
    |> start
