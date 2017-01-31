#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-arch/Fable.Arch.Html.fs"
#load "node_modules/fable-arch/Fable.Arch.App.fs"
#load "node_modules/fable-arch/Fable.Arch.Virtualdom.fs"

open Fable.Core
open Fable.Core.JsInterop

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.Html


type Input = 
    | Const of int
    | Plus
    | Minus 
    | Times 
    | Div
    | Clear
    | Equals

type Model = 
    | InputStack of Input list

type Actions =
    | PushInput of Input

let (|Operation|_|) = function 
    | Plus -> Some Plus
    | Minus -> Some Minus
    | Times -> Some Times
    | Div -> Some Div
    | _ -> None
     
let concatInts x y = int (sprintf "%d%d" x y)

let opString = function 
    | Plus -> "+"
    | Minus -> "-"
    | Times -> "*"
    | Div -> "/"
    | Equals -> "="
    | Clear -> "CE"
    | _ -> ""

let inputString = function
    | Operation op -> opString op
    | Const n -> string n
    | _ -> ""

let modelString (InputStack xs) = 
    xs 
    |> List.map inputString
    |> String.concat ""

let solve (InputStack [Const x; Operation op; Const y]) = 
    match op with
    | Plus -> x + y
    | Minus -> x - y
    | Times -> x * y
    | Div -> x / y
    | _ -> failwith "Will not happen"

// Update
let update (InputStack xs) (PushInput input) =
    if input = Clear then InputStack []
    else
    match xs with
    | [] -> 
        match input with
        | Operation op -> InputStack []
        | Equals -> InputStack []
        | _ -> InputStack [input]
    | [Const x] ->
        match input with
        | Const y -> InputStack [Const (concatInts x y)]
        | Operation op -> InputStack [Const x; op]
        | _ -> InputStack xs
    | [Const x; Operation op] ->  
        match input with
        | Const y -> InputStack [Const x; op; Const y] // push Const y to stack
        | Operation otherOp -> InputStack [Const x; otherOp] // replace op with otheOp
        | _ -> InputStack xs // do nothing
    | [Const x; Operation op; Const y] ->
        match input with
        | Const y' -> InputStack [Const x; op; Const (concatInts y y')]
        | Equals -> InputStack [Const (solve (InputStack xs))]
        | Operation op -> 
            let result = solve (InputStack xs)
            InputStack [Const result; op]
        | _ -> InputStack xs
    | _ -> InputStack xs



let digitStyle = 
    Style [
        ("height", "40px")
        ("width", "55px")
        ("font-size","24px")
        ("cursor","pointer")
        ("padding", "15px")
        ("margin","5px")
        ("text-align","center")
        ("vertical-align","middle")
        ("line-height","40px")
        ("background-color","lightgreen")
        ("box-shadow", "0 0 3px black")
    ]

let opButtonStyle = 
    Style [
        ("height", "40px")
        ("width", "55px")
        ("font-size","24px")
        ("padding", "15px")
        ("text-align","center")
        ("vertical-align","middle")
        ("line-height","40px")
        ("cursor","pointer")
        ("margin","5px")
        ("background-color","lightblue")
        ("box-shadow", "0 0 3px black")
    ]

let view model =
    let digit n = 
        div 
            [ 
                digitStyle
                onMouseClick (fun _ -> PushInput (Const n))
            ] 
            [ text (string n) ]

    let opBtn input = 
        let content = 
            match input with
            | Operation op -> opString op
            | Equals -> "="
            | Clear -> "CE"
            | _ -> ""
        div 
            [ 
                opButtonStyle
                onMouseClick (fun _ -> PushInput input)
            ] 
            [ text content ]
    
    let row xs =
        tr []
           [
             for x in xs -> 
                td []
                   [x]
           ]

    div
        [ Style [ ("width", "407px"); ("border", "2px black solid"); ("border-radius", "15px"); ("padding", "10px")]]
        [
            h2 [] [text "Arch Calculator"]
            h2 [ Style [("padding-left", "20px"); ("height", "30px")] ] [ text (modelString model) ]
            br []
            table 
               []
               [
                   row [digit 1; digit 2; digit 3; opBtn Plus]
                   row [digit 4; digit 5; digit 6; opBtn Minus]
                   row [digit 7; digit 8; digit 9; opBtn Times]
                   row [opBtn Clear; digit 0; opBtn Equals; opBtn Div]
               ]
        ]


createSimpleApp (InputStack []) view update Virtualdom.createRender
|> withStartNodeSelector "#calc"
|> start