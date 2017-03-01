module Fable.Arch.Html

[<AutoOpen>]
module Types =
    open Fable.Core

    type EventHandler<'TMessage> = string*(obj -> 'TMessage)

    type Style = (string*string) list

    type KeyValue = string*string

    [<Erase>]
    type HookValue = HookValue 

    type Attribute<'TMessage> =
        | EventHandler of EventHandler<'TMessage>
        | Style of Style
        | Property of KeyValue
        | Attribute of KeyValue
        | Hook of string * HookValue

    type Element<'TMessage> = string * Attribute<'TMessage> list
    /// A Node in Html have the following forms
    type VoidElement<'TMessage> = string * Attribute<'TMessage> list
    type DomNode<'TMessage> =
    /// A regular html element that can contain a list of other nodes
    | Element of Element<'TMessage> * DomNode<'TMessage> list
    /// A void element is one that can't have content, like link, br, hr, meta
    /// See: https://dev.w3.org/html5/html-author/#void
    | VoidElement of VoidElement<'TMessage>
    /// A text value for a node
    | Text of string
    /// Whitespace for formatting
    | WhiteSpace of string
    | Svg of Element<'TMessage> * DomNode<'TMessage> list
    | VirtualNode of string * Map<string, string> * obj[]

let mapEventHandler<'T1,'T2> (mapping:('T1 -> 'T2)) (e,f) = EventHandler(e, f >> mapping)

let mapAttributes<'T1,'T2> (mapping:('T1 -> 'T2)) (attribute:Attribute<'T1>) =
    match attribute with
    | EventHandler(eb) -> mapEventHandler mapping eb
    | Style s -> Style s
    | Property kv -> Property kv
    | Attribute kv -> Attribute kv
    | Hook (key, value) -> Hook (key, value)

let mapElem<'T1,'T2> (mapping:('T1 -> 'T2)) (node:Element<'T1>) =
    let (tag, attrs) = node
    (tag, attrs |> List.map (mapAttributes mapping))

let mapVoidElem<'T1,'T2> (mapping:('T1 -> 'T2)) (node:Element<'T1>) =
    let (tag, attrs) = node
    (tag, attrs |> List.map (mapAttributes mapping))

let rec map<'T1,'T2> (mapping:('T1 -> 'T2)) (node:DomNode<'T1>) =
    match node with
    | Element(e,ns) -> Element(mapElem mapping e, ns |> List.map (map mapping))
    | VoidElement(ve) -> VoidElement(mapVoidElem mapping ve)
    | Text(s) -> Text s
    | WhiteSpace(ws) -> WhiteSpace ws
    | Svg(e,ns) -> Element(mapElem mapping e, ns |> List.map (map mapping))
    | VirtualNode(tag, props, childrens) -> VirtualNode(tag, props, childrens)

[<AutoOpen>]
module Tags =
    let elem tagName attrs children = Element((tagName, attrs), children)
    let voidElem tagName attrs = VoidElement(tagName, attrs)

    let whiteSpace x = WhiteSpace x
    let text x = Text x

    let vnode tag props children = VirtualNode(tag, props, children)
    
    // Elements - list of elements here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    // Void elements
    let br x = voidElem "br" x
    let area x = voidElem "area" x
    let baseHtml x = voidElem "base" x
    let col x = voidElem "col" x
    let embed x = voidElem "embed" x
    let hr x = voidElem "hr" x
    let img x = voidElem "img" x
    let input x = voidElem "input" x
    let link x = voidElem "link" x
    let meta x = voidElem "meta" x
    let param x = voidElem "param" x
    let source x = voidElem "source" x
    let track x = voidElem "track" x
    let wbr x = voidElem "wbr" x

    // Metadata
    let head x = elem "head" x
    let style x = elem "style" x
    let title x = elem "title" x

    // Content sectioning
    let address x = elem "address" x
    let article x = elem "article" x
    let aside x = elem "aside" x
    let footer x = elem "footer" x
    let header x = elem "header" x
    let h1 x = elem "h1" x
    let h2 x = elem "h2" x
    let h3 x = elem "h3" x
    let h4 x = elem "h4" x
    let h5 x = elem "h5" x
    let h6 x = elem "h6" x
    let hgroup x = elem "hgroup" x
    let nav x = elem "nav" x

    // Text content
    let dd x = elem "dd" x
    let div x = elem "div" x
    let dl x = elem "dl" x
    let dt x = elem "dt" x
    let figcaption x = elem "figcaption" x
    let figure x = elem "figure" x
    let li x = elem "li" x
    let main x = elem "main" x
    let ol x = elem "ol" x
    let p x = elem "p" x
    let pre x = elem "pre" x
    let section x = elem "section" x
    let ul x = elem "ul" x

    // Text semantics
    let a x = elem "a" x
    let abbr x = elem "abbr" x
    let b x = elem "b" x
    let bdi x = elem "bdi" x
    let bdo x = elem "bdo" x
    let cite x = elem "cite" x
    let code x = elem "code" x
    let data x = elem "data" x
    let dfn x = elem "dfn" x
    let em x = elem "em" x
    let i x = elem "i" x
    let kbd x = elem "kbd" x
    let mark x = elem "mark" x
    let q x = elem "q" x
    let rp x = elem "rp" x
    let rt x = elem "rt" x
    let rtc x = elem "rtc" x
    let ruby x = elem "ruby" x
    let s x = elem "s" x
    let samp x = elem "samp" x
    let small x = elem "small" x
    let span x = elem "span" x
    let strong x = elem "strong" x
    let sub x = elem "sub" x
    let sup x = elem "sup" x
    let time x = elem "time" x
    let u x = elem "u" x
    let var x = elem "var" x

    // Image and multimedia
    let audio x = elem "audio" x
    let map x = elem "map" x
    let video x = elem "video" x

    // Embedded content
    let objectHtml x = elem "object" x
    let iframe x = elem "iframe" x

    // Demarcasting edits
    let del x = elem "del" x
    let ins x = elem "ins" x

    // Table content
    let caption x = elem "caption" x
    let colgroup x = elem "colgroup" x
    let table x = elem "table" x
    let tbody x = elem "tbody" x
    let td x = elem "td" x
    let tfoot x = elem "tfoot" x
    let th x = elem "th" x
    let thead x = elem "thead" x
    let tr x = elem "tr" x

    // Forms
    let button x = elem "button" x
    let datalist x = elem "datalist" x
    let fieldset x = elem "fieldset" x
    let form x = elem "form" x
    let label x = elem "label" x
    let legend x = elem "legend" x
    let meter x = elem "meter" x
    let optgroup x = elem "optgroup" x
    let option x = elem "option" x
    let output x = elem "output" x
    let progress x = elem "progress" x
    let select x = elem "select" x
    let textarea x = elem "textarea" x

    // Interactive elements
    let details x = elem "details" x
    let dialog x = elem "dialog" x
    let menu x = elem "menu" x
    let menuitem x = elem "menuitem" x
    let summary x = elem "summary" x

[<AutoOpen>]
module Attributes =
    open Fable.Core
    open Fable.Core.JsInterop
    open Fable.Import.Browser

    let attribute key value = Attribute.Attribute (key,value)
    let property key value = Attribute.Property (key,value)

    let hook key value = Attribute.Hook (key, value)

    type HookHelper =
        // Hook
        [<Emit("(function() { var Hook = function() {}; Hook.prototype.hook = $0; return new Hook(); })()")>]
        static member CreateHook(hook: JsFunc2<HTMLElement, string, unit>) : HookValue = jsNative
        [<Emit("(function() { var Hook = function() {}; Hook.prototype.hook = $0; return new Hook(); })()")>]
        static member CreateHook(hook: JsFunc3<HTMLElement, string, HTMLElement, unit>) : HookValue = jsNative
        // Unhook
        [<Emit("(function() { var Hook = function() {}; Hook.prototype.unhook = $0; return new Hook(); })()")>]
        static member CreateUnhook(unhook: JsFunc2<HTMLElement, string, unit>) : HookValue = jsNative
        [<Emit("(function() { var Hook = function() {}; Hook.prototype.unhook = $0; return new Hook(); })()")>]
        static member CreateUnhook(unhook: JsFunc3<HTMLElement, string, HTMLElement, unit>) : HookValue = jsNative
        // Hook & Unhook
        [<Emit("(function() { var Hook = function() {}; Hook.prototype.hook = $0; Hook.prototype.unhook = $1; return new Hook(); })()")>]
        static member CreateTwoWayHook(hook: JsFunc3<HTMLElement, string, HTMLElement, unit>, unhook: JsFunc3<HTMLElement, string, HTMLElement, unit>) : HookValue = jsNative

    /// class attribute helper
    let classy value = attribute "class" value

    /// Helper to build space separated class
    let classList (list: (string*bool) seq) =
        list
            |> Seq.filter (fun (c,cond) -> cond)
            |> Seq.map (fun (c, cond) -> c)
            |> String.concat " "
            |> classy

    /// Helper to build space separated class with a static part
    let classBaseList b (list: (string*bool) seq) =
        list
            |> Seq.filter (fun (c,cond) -> cond)
            |> Seq.map (fun (c, cond) -> c)
            |> String.concat " "
            |> sprintf "%s %s" b
            |> classy

    let boolAttribute name (value: bool) =
        attribute name (string value)

[<AutoOpen>]
module Events =
    open Fable.Core.JsInterop
    let onMouseEvent eventType f =
        let h e =
            e?stopPropagation() |> ignore
            e?preventDefault() |> ignore
            f e
        EventHandler (eventType, h)

    let onMouseClick x = onMouseEvent "onclick" x
    let onContextMenu x = onMouseEvent "oncontextmenu" x
    let onDblClick x = onMouseEvent "ondblclick" x
    let onMouseDown x = onMouseEvent "onmousedown" x
    let onMouseEnter x = onMouseEvent "onmouseenter" x
    let onMouseLeave x = onMouseEvent "onmouseleave" x
    let onMouseMove x = onMouseEvent "onmousemove" x
    let onMouseOut x = onMouseEvent "onmouseout" x
    let onMouseOver x = onMouseEvent "onmouseover" x
    let onMouseUp x = onMouseEvent "onmouseup" x
    let onShow x = onMouseEvent "onshow" x
    let onKeyboardEvent eventType f = EventHandler (eventType, f)
    let onKeydown x = onKeyboardEvent "onkeydown" x
    let onKeypress x = onKeyboardEvent "onkeypress" x
    let onKeyup x = onKeyboardEvent "onkeyup" x

    let onEvent eventType f = EventHandler (eventType, f)
    let onAbort x = onEvent "onabort" x
    let onAfterPrint x = onEvent "onafterprint" x
    let onAudioEnd x = onEvent "onaudioend" x
    let onAudioStart x = onEvent "onaudiostart" x
    let onBeforePrint x = onEvent "onbeforeprint" x
    let onCached x = onEvent "oncached" x
    let onCanPlay x = onEvent "oncanplay" x
    let onCanPlayThrough x = onEvent "oncanplaythrough" x
    let onChange x = onEvent "onchange" x
    let onChargingChange x = onEvent "onchargingchange" x
    let onChargingTimeChange x = onEvent "onchargingtimechange" x
    let onChecking x = onEvent "onchecking" x
    let onClose x = onEvent "onclose" x
    let onDischargingTimeChange x = onEvent "ondischargingtimechange" x
    let onDOMContentLoaded x = onEvent "onDOMContentLoaded" x
    let onDownloading x = onEvent "ondownloading" x
    let onDurationchange x = onEvent "ondurationchange" x
    let onEmptied x = onEvent "onemptied" x
    let onEnd x = onEvent "onend" x
    let onEnded x = onEvent "onended" x
    let onError x = onEvent "onerror" x
    let onCullScreenChange x = onEvent "onfullscreenchange" x
    let onCullScreenError x = onEvent "onfullscreenerror" x
    let onInput x = onEvent "oninput" x
    let onInvalid x = onEvent "oninvalid" x
    let onLanguageChange x = onEvent "onlanguagechange" x
    let onLevelChange x = onEvent "onlevelchange" x
    let onLoadedData x = onEvent "onloadeddata" x
    let onLoadedMetaData x = onEvent "onloadedmetadata" x
    let onNoUpdate x = onEvent "onnoupdate" x
    let onObsolete x = onEvent "onobsolete" x
    let onOffline x = onEvent "onoffline" x
    let onOnline x = onEvent "ononline" x
    let onOpen x = onEvent "onopen" x
    let onOrientationChange x = onEvent "onorientationchange" x
    let onPause x = onEvent "onpause" x
    let onPointerlockchange x = onEvent "onpointerlockchange" x
    let onPointerlockerror x = onEvent "onpointerlockerror" x
    let onPlay x = onEvent "onplay" x
    let onPlaying x = onEvent "onplaying" x
    let onRateChange x = onEvent "onratechange" x
    let onReadyStateChange x = onEvent "onreadystatechange" x
    let onReset x = onEvent "onreset" x
    let onSeeked x = onEvent "onseeked" x
    let onSeeking x = onEvent "onseeking" x
    let onSelectStart x = onEvent "onselectstart" x
    let onSelectionChange x = onEvent "onselectionchange" x
    let onSoundEnd x = onEvent "onsoundend" x
    let onSoundStart x = onEvent "onsoundstart" x
    let onSpeechEnd x = onEvent "onspeechend" x
    let onSpeechStart x = onEvent "onspeechstart" x
    let onStalled x = onEvent "onstalled" x
    let onStart x = onEvent "onstart" x
    let onSubmit x = onEvent "onsubmit" x
    let onSuccess x = onEvent "onsuccess" x
    let onSuspend x = onEvent "onsuspend" x
    let onTimeUpdate x = onEvent "ontimeupdate" x
    let onUpdateReady x = onEvent "onupdateready" x
    let onVoicesChanged x = onEvent "onvoiceschanged" x
    let onVisibilityChange x = onEvent "onvisibilitychange" x
    let onVolumeChange x = onEvent "onvolumechange" x
    let onVrdisplayConnected x = onEvent "onvrdisplayconnected" x
    let onVrdisplayDisconnected x = onEvent "onvrdisplaydisconnected" x
    let onVrdisplayPresentChange x = onEvent "onvrdisplaypresentchange" x
    let onWaiting x = onEvent "onwaiting" x

    let onBlur x = onEvent "onblur" x
    let onFocus x = onEvent "onfocus" x

[<AutoOpen>]
module Svg =
    let svgNS = Attribute.Property("namespace","http://www.w3.org/2000/svg")
    let svgElem tagName attrs children = Element((tagName, svgNS::attrs), children)

    let svg x = svgElem "svg" x
    let circle x = svgElem "circle" x
    let rect x = svgElem "rect" x

    let width x = attribute "width" x
    let height x = attribute "height" x
    let viewBox x = attribute "viewBox" x
    let cx x = attribute "cx" x
    let cy x = attribute "cy" x
    let r x = attribute "r" x
    let stroke x = attribute "stroke" x
    let strokeWidth x = attribute "stroke-width" x
    let fill x = attribute "fill" x
