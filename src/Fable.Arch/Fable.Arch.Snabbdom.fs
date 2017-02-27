[<RequireQualifiedAccess>]
module Fable.Arch.Snabbdom

open System
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import.JS
open Fable.Import.Browser
open Fable.Import.Snabbdom

type RenderState =
    | NoRequest
    | PendingRequest
    | ExtraRequest

type ViewState<'TMessage> =
    {
        CurrentTree: obj
        NextTree: obj
        Node: Node
        RenderState: RenderState
    }

let mapEvents (handler:'T -> unit) (view: VNode) =
    let rec mapF (view: VNode) =
        console.log view
        for child in view.children do
            match child with
            | Case1 vnode ->
                // Unbox to JavaScript Object
                let data = unbox<Object> vnode.data
                if data.hasOwnProperty("on") then
                    console.log (Object.keys(vnode.data?on))
                    for prop in Object.keys(vnode.data?on) do
                        vnode.data?on?(prop) <- vnode.data?on?(prop) >> !!handler
            | Case2 str -> ()

    mapF view
    view

let createRender (modules: Module array) selector (handler:'T -> unit) view =
    let node = document.body.querySelector(selector)

    let patch = Globals.init(modules)

    let mutable oldVNode = view

    let render' handler (view: VNode) =
        let mappedView = mapEvents handler view
        oldVNode <- patch.Invoke(Case1 oldVNode, mappedView)

    let mappedView = mapEvents handler view
    // Init the view and snabbdom
    oldVNode <- patch.Invoke(Case2 node, mappedView)
    render'
