[<RequireQualifiedAccess>]
module Fable.Arch.Virtualdom

open Fable.Core
open Fable.Import.Browser
open Fable.Core.JsInterop

open Html
open App

[<Import("h","virtual-dom")>]
let h(arg1: string, arg2: obj, arg3: obj[]): obj = failwith "JS only"

[<Import("diff","virtual-dom")>]
let diff (tree1:obj) (tree2:obj): obj = failwith "JS only"

[<Import("patch","virtual-dom")>]
let patch (node:obj) (patches:obj): Fable.Import.Browser.Node = failwith "JS only"

[<Import("create","virtual-dom")>]
let createElement (e:obj): Fable.Import.Browser.Node = failwith "JS only"

let createTree<'T> (handler:'T -> unit) tag (attributes:Attribute<'T> list) children =
    let toAttrs (attrs:Attribute<'T> list) =
        let elAttributes = 
            attrs
            |> List.map (function
                | Attribute (k,v) -> (k ==> v) |> Some
                | _ -> None)
            |> List.choose id
            |> (function | [] -> None | v -> Some ("attributes" ==> (createObj(v))))
        let props =
            attrs
            |> List.filter (function | Attribute _ -> false | _ -> true)
            |> List.map (function
                | Attribute _ -> failwith "Shouldn't happen"
                | Style style -> "style" ==> createObj(unbox style)
                | Property (k,v) -> k ==> v
                | EventHandler(ev,f) -> ev ==> ((f >> handler) :> obj)
                | Hook (k,v) -> k ==> v
            )

        match elAttributes with
        | None -> props
        | Some x -> x::props
        |> createObj
    let elem = h(tag, toAttrs attributes, List.toArray children)
    elem

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

let rec renderSomething handler node = 
    match node with
    | Element((tag,attrs), nodes)
    | Svg((tag,attrs), nodes) -> createTree handler tag attrs (nodes |> List.map (renderSomething handler))
    | VoidElement (tag, attrs) -> createTree handler tag attrs []
    | Text str -> box(string str)
    | WhiteSpace str -> box(string str)
    | VirtualNode(tag, props, childrens) -> h(tag, props, childrens)

let render handler view viewState =
    let tree = renderSomething handler view
    {viewState with NextTree = tree}

let createRender selector handler view =
    let node = 
        match selector with
        | Query sel -> document.body.querySelector(sel) :?> HTMLElement
        | Node elem -> elem

    let tree = renderSomething handler view
    let vdomNode = createElement tree
    node.appendChild(vdomNode) |> ignore
    let mutable viewState = 
        {
            CurrentTree = tree
            NextTree = tree
            Node = vdomNode
            RenderState = NoRequest
        }

    let raf cb = 
        Fable.Import.Browser.window.requestAnimationFrame(fun fb -> cb())

    let render' handler view = 
        let viewState' = render handler view viewState
        viewState <- viewState'

        let rec callBack() = 
            match viewState.RenderState with
            | PendingRequest ->
                raf callBack |> ignore
                viewState <- {viewState with RenderState = ExtraRequest}

                let patches = diff viewState.CurrentTree viewState.NextTree
                patch viewState.Node patches |> ignore
                viewState <- {viewState with CurrentTree = viewState.NextTree}
            | ExtraRequest -> 
                viewState <- {viewState with RenderState = NoRequest}
            | NoRequest -> raise (exn "Shouldn't happen")
        
        match viewState.RenderState with
        | NoRequest ->
            raf callBack |> ignore
        | _ -> ()
        viewState <- {viewState with RenderState = PendingRequest}

    render'
