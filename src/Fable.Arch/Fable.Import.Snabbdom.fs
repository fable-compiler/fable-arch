module Fable.Import

open System
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import.JS
open Fable.Import.Browser

module Snabbdom =

    type PreHook = JsFunc1<unit, obj>

    and InitHook = JsFunc1<VNode, obj>

    and CreateHook = JsFunc2<VNode, VNode, obj>

    and InsertHook = JsFunc1<VNode, obj>

    and PrePatchHook = JsFunc2<VNode, VNode, obj>

    and UpdateHook = JsFunc2<VNode, VNode, obj>

    and PostPatchHook = JsFunc2<VNode, VNode, obj>

    and DestroyHook = JsFunc1<VNode, obj>

    and RemoveHook = JsFunc2<VNode, Func<unit, unit>, obj>

    and PostHook = JsFunc1<unit, obj>

    and [<KeyValueList>] Hooks =
        | Pre of PreHook
        | Init of InitHook
        | Create of CreateHook
        | Insert of InsertHook
        | Prepatch of PrePatchHook
        | Update of UpdateHook
        | Postpatch of PostPatchHook
        | Destroy of DestroyHook
        | Remove of RemoveHook
        | Post of PostHook

    and Key = U2<string, float>

    and VNode =
        abstract sel: string option with get, set
        abstract data: VNodeData list with get, set
        abstract children: U2<VNode, string> array with get, set
        abstract elm: Node option with get, set
        abstract text: string option with get, set
        abstract key: Key with get, set

    and [<KeyValueList>] VNodeData =
        | Props of Props list
        | Attrs of obj
        | Class of obj
        | Style of obj
        | Dataset of obj
        | On of obj
        | Hero of obj
        | AttachData of obj
        | Hook of Hooks
        | Key of Key
        | Ns of string
        | Fn of JsFunc1<unit, VNode>
        | Args of ResizeArray<obj>
        //[<Emit("$0[$1]{{=$2}}")>] abstract Item: key: string -> obj with get, set

    and HyperData =
        | Props of Props list
        | Events of EventsDU list

    and [<KeyValueList>] Props =
        | Href of string
        | [<Erase>] Extra of string * string

    and EventsDU =
        | Click of (Fable.Import.Browser.MouseEvent -> unit)
        | Generic of string * JsFunc1<obj, unit>

    and [<Erase>] Module = Module

    and Modules =
        [<Import("default","snabbdom/modules/class")>] static member Class : Module = jsNative
        [<Import("default","snabbdom/modules/props")>] static member Props : Module = jsNative
        [<Import("default","snabbdom/modules/style")>] static member Style : Module = jsNative
        [<Import("default","snabbdom/modules/eventlisteners")>] static member EventListeners : Module = jsNative

    and [<Import("*","snabbdom/h")>] H =
            static member h(sel: string): VNode = jsNative
            static member h(sel: string, data: VNodeData list): VNode = jsNative
            static member h(sel: string, text: string): VNode = jsNative
            static member h(sel: string, children: VNode array): VNode = jsNative
            static member h(sel: string, data: VNodeData list, text: string): VNode = jsNative
            static member h(sel: string, data: VNodeData list, children: VNode array): VNode = jsNative


    and [<Import("*","snabbdom/snabbdom")>] Globals =
        static member init(modules: Module array): Func<U2<VNode, Element>, VNode, VNode> = jsNative
