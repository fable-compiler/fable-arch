module Fable.Arch.React

open Fable.Core
open Fable.Core.JsInterop
open System.Diagnostics
open Fable.Import
module R=Fable.Helpers.React

type [<Pojo>] ReactAppState<'model, 'msg> =
    { handler : 'msg->unit
    ; model   : 'model }

type [<Pojo>] ReactAppProps<'model, 'msg> =
    { initModel : 'model
    ; subscribe : (ReactAppState<'model, 'msg>->unit)->unit
    ; render    : ('msg->unit)->'model->React.ReactElement }

type ReactApp<'model, 'msg>(props) as this =
    inherit React.Component<ReactAppProps<'model, 'msg>, ReactAppState<'model, 'msg>>(props)
    do base.setInitState({ handler = ignore; model = props.initModel })
    do props.subscribe(this.setState)

    member __.render() =
        this.props.render this.state.handler this.state.model

open Fable.Arch.App.Types

let createRenderer<[<Pojo>]'model, 'msg>
    (render: ('msg->unit) -> 'model -> React.ReactElement)
    (initModel: 'model)
    (sel: string) =
    let update =
        ref Unchecked.defaultof<ReactAppState<'model, 'msg>->unit>
    let props =
        { initModel = initModel
        ; subscribe = fun f -> update := f
        ; render = render }
    ReactDom.render(
        R.com<ReactApp<'model, 'msg>,_,_> props [],
        Browser.document.body.querySelector(sel))
    fun (handler: 'msg->unit) (model: 'model) ->
        !update { handler = handler; model = model }
