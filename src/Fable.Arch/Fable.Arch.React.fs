module Fable.Arch.React

open Fable.Arch.App
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import.React

open System.Diagnostics


type MkView<'model> = ('model->unit) -> ('model->ReactElement)
type [<Pojo>] Props<'model> = {
    main:MkView<'model>
}

module Components =
    let mutable internal mounted = false

    type App<'model>(props:Props<'model>) as this =
        inherit Component<Props<'model>,obj>(props)
        do
            mounted <- false

        let safeState state =
            match mounted with
            | false -> this.setInitState state
            | _ -> this.setState state
        let view = props.main safeState
        member this.componentDidMount() =
            mounted <- true

        member this.render () =
            view(unbox<'model> this.state)

let createRenderer viewFn initModel sel h v =
    let mutable setState = None
    let main s =
        setState <- Some s
        s initModel
        fun model -> viewFn model h

    let targetNode = 
        match sel with
        | Query selector -> Fable.Import.Browser.document.body.querySelector(selector) :?> Fable.Import.Browser.HTMLElement
        | Node node -> node

    let comp = Fable.Helpers.React.com<Components.App<_>,_,_> {main = main} []
    Fable.Import.ReactDom.render(comp,targetNode)

    fun hand vm ->
    (setState |> Option.get) vm