module Fable.Arch.DevTools

open Fable.Arch.App
open Fable.Arch.Html

open Fable.Core
open Fable.Import
open System
//open Fable.Import.Browser
type ActionItem<'TAppMessage, 'TAppModel> = {
    Id: Guid
    Excluded: bool
    Message: 'TAppMessage
    State: 'TAppModel
}
type DevToolsModel<'TAppMessage, 'TAppModel> = 
    {
        Base: 'TAppModel
        LastCommited: 'TAppModel option
        Actions: ActionItem<'TAppMessage, 'TAppModel> list
        Collapsed: Map<string,bool>
        PushToApp: 'TAppModel * ((Guid*'TAppMessage) list) -> unit
    }

type DevToolsMessage<'TAppMessage, 'TAppModel> = 
    | AddMessage of 'TAppMessage * 'TAppModel
    | MessagesReplayed of (Guid*'TAppModel) list
    | ToggleObjectVisibility of string
    | ToggleAction of Guid
    | Commit
    | Sweep
    | Revert
    | Reset

let isCollapsed str model = 
    model.Collapsed 
    |> Map.tryFind str 
    |> Option.fold (fun x y -> x || y) false

let devToolsUpdate model action = 
    let model', messages = 
        match action with
        | Commit ->
            let latestCommited = (model.Actions |> List.last).State
            {model with LastCommited = Some latestCommited; Actions = []}, [fun h -> model.PushToApp (latestCommited,[])]
        | AddMessage (msg, appModel) ->
            {model with Actions = model.Actions @ [{Id = Guid.NewGuid(); Excluded = false; Message = msg; State = appModel}]},[]
        | MessagesReplayed modelList ->
            let actions = 
                modelList
                |> List.fold (fun s (id, m) -> s |> List.map (fun a -> if a.Id = id then {a with State = m} else a)) model.Actions
            {model with Actions = actions}, []
        | ToggleObjectVisibility str ->
            let currentValue = isCollapsed str model
            {model with Collapsed = model.Collapsed |> Map.add str (currentValue |> not)},[]
        | ToggleAction id ->
            let actions =
                model.Actions 
                |> List.map (fun i -> if i.Id = id then {i with Excluded = not i.Excluded} else i)
            let m' = {model with Actions = actions }
            
            let actionsToReplay = 
                m'.Actions
                |> List.filter (fun i -> i.Excluded |> not)
                |> List.map (fun i -> i.Id, i.Message)

            let currentBase = defaultArg m'.LastCommited m'.Base
            let messages = 
                [
                    (fun h -> model.PushToApp (currentBase, actionsToReplay))
                ]
            m', messages
        | Sweep ->
            let actions = model.Actions |> List.filter (fun i -> i.Excluded |> not)
            {model with Actions = actions}, []
        | Revert -> 
            match model.LastCommited with
            | Some m ->
                {model with Actions = []},[fun h -> model.PushToApp (m,[])]
            | None ->
                model,[]
        | Reset -> 
            {model with Actions = []; LastCommited = None}, [fun h -> model.PushToApp (model.Base, [])]

    model', messages

let cssString = """
    ._fable_dev_tools {
        background-color: #2d2a2a;
        position: fixed;
        top: 0;
        right: 0;
        min-width: 400px;
        height: 100%;
        font-family: 'Open Sans', sans-serif;
        color: #e0e0e0;
        z-index: 1000;
    }
    ._fable_dev_tools ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    ._fable_dev_tools .actions {
        margin-bottom: 5px;
    }
    ._fable_dev_tools .actions li {
        color: #565656;
        display: inline-block;
        width: 90px;
        text-align:center;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-left: 5px;
        margin-right: 5px;
        font-weight: bold;
    }
    ._fable_dev_tools .actions li.active {
        background-color: #565656;
        color: #e0e0e0;
        cursor: pointer;
    }

    ._fable_dev_tools .action-list {
        margin: 0px;
        padding: 0px;
        margin-left: 0px;
        overflow-y: auto;
        height: 100%;
    }

    ._fable_dev_tools .action-list .row {
        margin: 0px;
    }
    ._fable_dev_tools .action-list .row.excluded .content {
        display: none;
    }

    ._fable_dev_tools .action-list .row.excluded .header {
        background-color: #343434;
        color: #565656;
        text-decoration: line-through;
    }

    ._fable_dev_tools .action-list .header {
        padding: 15px;
        background-color: #565656;
        width: 100%;
    }

    ._fable_dev_tools .action-list .header.action {
        cursor: pointer;
    }

    ._fable_dev_tools .action-list .content {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    ._fable_dev_tools .action-list .item {
        padding-left: 15px;    
    }

    ._fable_dev_tools .action-list .row:last-child {
        margin-bottom: 40px;
    }

    ._fable_dev_tools .action-list .item .item-header.expand-collapse {
        cursor: pointer;
        margin-left: 15px;
    }

    ._fable_dev_tools .action-list .item .item-header.expand-collapse::before {
        content: "\25BA";
        position: relative;
        font-size: 10px;
        margin-left: -15px;
        margin-top: 3px;
        transform: rotate(90deg);
        transition-property: transform;
        transition-duration: 0.3s;
        display: inline-block;
        padding-right: 5px;
    }

    ._fable_dev_tools .action-list .item.collapsed .item-header.expand-collapse::before {
        transform: rotate(0deg);
        transition-property: transform;
        transition-duration: 0.3s;
    }

    ._fable_dev_tools .action-list .item.collapsed .item-value {
        display: none;
    }

    ._fable_dev_tools .item .item-short-value.string {
        color: #345678;
    }

    ._fable_dev_tools .item .item-short-value.number {
        color: #876543;
    }

    ._fable_dev_tools .item .item-short-value.array {
        color: #9356ab;
    }

    ._fable_dev_tools .item .item-short-value.object {
        color: #ab9356;
    }

    ._fable_dev_tools .item .item-short-value.bool {
        color: #93ab56;
    }
"""

open JsInterop


let [<Emit("$0 instanceof Object")>] isObj (x:obj): bool = failwith "JS only" 
let [<Emit("$0 instanceof Array")>] isArray (x:obj): bool = failwith "JS only" 
let [<Emit("$0 != undefined && $0.constructor === Number")>] isNumber (x:obj): bool = failwith "JS only" 
let [<Emit("$0 != undefined && $0.constructor === String")>] isString (x:obj): bool = failwith "JS only" 
let [<Emit("$0 != undefined && $0.constructor === Boolean")>] isBool (x:obj): bool = failwith "JS only" 

let [<Emit("(function() {var x = []; $0.mapIndexed(function(idx,item) {x[idx] = item;}); return x;})()")>] listToArray (list:obj): JS.Array<_> = failwith "JS only"
let [<Emit("$0 instanceof $1")>] instanceof (x: obj) (t: obj): bool = failwith "JS only"

let devToolsView model =
    let pluralize str count = 
        if count <> 1 then sprintf "%s%s" str "s"
        else str

    let getMessageTitle o =
        let x = JsInterop.toPlainJsObj o
        sprintf "%s" (x?Case |> string)

    let rec renderThing thingName parentId (o:obj) =
        let thisId = sprintf "%s_%s" parentId thingName
        let collapsed = isCollapsed thisId model
        let extraClass = if collapsed then " collapsed" else ""

        let renderChildren propertyNames o = 
            propertyNames |> Seq.map (fun y -> renderThing y thisId (o?(y))) |> Seq.toList

        let renderValue thingName typeName value = 
                div [attribute "class" "item-value"] [
                    span [attribute "class" "item-name"] [text (sprintf "%s: " thingName)]
                    span [attribute "class" (sprintf "item-short-value %s" typeName)] [text value]
                ]
            
        let header thingName collapseable onClicked typeName value =
            let headerClass = if collapseable then "item-header expand-collapse" else "item-header" 
            let headerAttributes = 
                (attribute "class" headerClass) ::
                match onClicked with
                | None -> []
                | Some h -> [onMouseClick h]
            div headerAttributes
                [
                    span [attribute "class" "item-key"] [text (sprintf "%s: " thingName)]
                    span [attribute "class" (sprintf "item-short-value %s" typeName)] [text value]
                ]                

        let renderComplexType t keys typeName o = 
            let length = keys |> List.length
            let itemWord = if t = "object" then "key" else "item"
            let headerText = (sprintf "%s (%i %s) " typeName length (pluralize itemWord length))
            [
                header thingName true (Some (fun _ -> ToggleObjectVisibility thisId)) t headerText
                div [attribute "class" "item-value"]
                    (renderChildren keys o)
            ]

        let renderItem children = 
            div [attribute "class" (sprintf "item%s" extraClass); attribute "id" thisId]
                children

        let valueOnly typeName value = header thingName false None typeName (value.ToString())
        match o with
        | null -> [valueOnly "" o]
        | x when x.GetType().Name = "FSharpList" ->
            let list = listToArray o 
            renderComplexType "array" ([0 .. ((-) (list?length |> string |> int)) 1] |> List.map string) "FSharpList" list
        | x when instanceof x JS.Array ->
            renderComplexType "array" ([0 .. ((-) (o?length |> string |> int)) 1] |> List.map string) (x.GetType().Name) x
        | x when instanceof x JS.Object-> 
            renderComplexType "object" (Fable.Import.JS.Object.getOwnPropertyNames(o) |> Seq.toList) (x.GetType().Name) x
        | x when isNumber x -> 
            [ valueOnly "number" x ]
        | x when isString x -> 
            [ valueOnly "string" x ]
        | x when isBool x -> 
            [ valueOnly "bool" x ]
        | _ -> [ valueOnly "???" o]
        |> renderItem

    let toolStyles = 
        style []
            [
                text cssString
                link [ attribute "href" "https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i"; attribute "rel" "stylesheet"]
            ]

    let toolHeader model =
        let actions = model.Actions 
        let headerAction headerText func = 
            match func with
            | None -> li [] [text headerText]
            | Some f -> li [attribute "class" "active"; onMouseClick (fun _ -> f)] [text headerText]

        let excluded = actions |> List.exists (fun i -> i.Excluded)
        let anyNotExcluded = actions |> List.exists (fun i -> not i.Excluded)
        let isCommited = model.LastCommited |> Option.isSome
        let anyActions = actions |> List.isEmpty |> not

        header [attribute "class" "actions"]
            [
                ul []
                    [
                        headerAction "Reset" (if anyActions || isCommited then Some Reset else None)
                        headerAction "Revert" (if isCommited && anyActions then Some Revert else None)
                        headerAction "Sweep" (if excluded then Some Sweep else None)
                        headerAction "Commit" (if anyNotExcluded then Some Commit else None)
                    ]
            ]

    let row headerText headerClicked excluded content =
        let rowClass = if excluded then "row excluded" else "row"

        let headerAttributes = 
            match headerClicked with
            | Some h -> [onMouseClick h; attribute "class" "header action"]
            | None -> [attribute "class" "header"]
            
        let inner = 
            (div headerAttributes [text headerText]) ::
                    match excluded with
                    | true -> []
                    | false -> [ div [attribute "class" "content"] [content] ]

        div [attribute "class" rowClass]
            inner

    let renderAction a = 
        let toggleAction = Some (fun _ -> ToggleAction a.Id)
        let content = 
            div []
                [
                    a.Message |> renderThing "action" (sprintf "_action_%s" (a.Id.ToString()))
                    a.State |> renderThing "state" (sprintf "_state_%s" (a.Id.ToString()))
                ]
        row (a.Message |> getMessageTitle) toggleAction a.Excluded content

    let toolContent model = 
        let currentBase = defaultArg model.LastCommited model.Base
        let baseState = row "BASE" None false (currentBase |> renderThing "model" "_base")
        let actions = 
            model.Actions |> List.map renderAction
        div [attribute "class" "action-list"]
            (baseState::actions)

    div [attribute "class" "_fable_dev_tools"]
        [
            toolStyles
            toolHeader model
            toolContent model
        ]

type LinkMessage<'TMessage, 'TModel> = 
    | SetHandler of (AppMessage<'TMessage, 'TModel> -> unit)
    | Push of AppMessage<'TMessage, 'TModel>

type LinkState<'TMessage, 'TModel> = 
    {
        Handler: AppMessage<'TMessage, 'TModel> -> unit
    }

let createDevTools<'TMessage, 'TModel> pluginId initModel=
    let containerNode = Browser.window.document.createElement("div")
    containerNode.id <- "___devtools"
    Browser.window.document.body.appendChild containerNode |> ignore
    
    let linkAgent = MailboxProcessor.Start(fun inbox ->
        let rec loop (state:LinkState<'TMessage, 'TModel>) = 
            async {
                let! msg = inbox.Receive()
                match msg with
                | Push m -> 
                    state.Handler m
                    return! loop state
                | SetHandler h -> 
                    return! loop {state with Handler = h}
            }
        loop ({Handler = (fun _ -> ())}:LinkState<'TMessage, 'TModel>)
    )

    let devToolsAgent = 
        let initModel = 
            {
                Base = initModel
                Actions = []
                Collapsed = Map.empty
                LastCommited = None
                PushToApp = (fun m -> linkAgent.Post (Push (AppMessage.Replay m)))
            }
        createApp initModel devToolsView devToolsUpdate Virtualdom.createRender
        |> withStartNodeSelector "#___devtools"
        |> start 
    
    {
        Producer = (fun h -> linkAgent.Post(SetHandler h)) 
        Subscriber = (function 
                        | ModelChanged m -> devToolsAgent (Message (AddMessage (m.Message, m.CurrentState)))
                        | Replayed modelList -> devToolsAgent (Message (MessagesReplayed modelList))
                        | _ -> ())
    }
