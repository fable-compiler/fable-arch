module Fable.Arch.React

open Fable.Core
open Fable.Core.JsInterop
open System.Diagnostics
open Fable.Import
module R=Fable.Helpers.React

type MkView<'model> = ('model->unit) -> ('model->React.ReactElement)
type [<Pojo>] Props<'model> = {
    main:MkView<'model>
}

type [<Pojo>] AppProps<[<Pojo>]'model> = {
    initState:'model
    subscribe:('model->unit)->unit
    render:'model->React.ReactElement
}

type App<[<Pojo>]'model>(props) as this =
    inherit React.Component<AppProps<'model>, 'model>(props)
    do base.setInitState(props.initState)
    do props.subscribe(this.setState)

    member __.render() =
        this.props.render(this.state)

// module Components =
//     let mutable internal mounted = false

//     type App<'model>(p:Props<'model>) as this =
//         inherit React.Component<Props<'model>,'model>(p)
//         do mounted <- false
//         let safeState state =
//             match mounted with
//             | false -> this.setInitState state
//             | _ -> this.setState state
//         let view = this.props.main safeState
//         member this.componentDidMount() =
//             mounted <- true
//         member this.shouldComponentUpdate(nextProps, nextState, nextContext) =
//             not <| this.props.equal this.props.model nextProps.model
//         member this.render () =
//             view this.state

let createRenderer<[<Pojo>]'model,'msg> viewFn initModel sel =
    fun hand vm ->
        let props =
            { initState = initModel
            ; subscribe = fun f -> f vm
            ; render = viewFn }
        let targetNode = Browser.document.body.querySelector(sel)
        let comp = R.com<App<'model>,_,_> props []
        ReactDom.render(comp, targetNode)
