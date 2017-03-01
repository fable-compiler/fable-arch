// If you are using the sample in standalone please switch the import lines
// #r "node_modules/fable-core/Fable.Core.dll"
// #r "node_modules/fable-arch/Fable.Arch.dll"
// Imports for docs site mode
#r "../../node_modules/fable-core/Fable.Core.dll"
#r "../../node_modules/fable-arch/Fable.Arch.dll"

open Fable.Arch
open Fable.Arch.App
open Fable.Arch.App.AppApi
open Fable.Arch.Html

// Input of user, the buttons that he/she can click
type Input =
    | Const of int
    | Plus
    | Minus
    | Times
    | Div
    | Clear
    | Equals
// the model or state of the app
// this is a list of the buttons the user has clicked so far
type Model =
    | InputStack of Input list

// The action is what gets dispatched/sent to the update function
// then the update function gets both the current model/state
// and the action dispatched and decides how the next state
// should be computed
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

// The update function: contains the logic of how to compute the next state or model
// based on the current state and the action dispatched by the User
// update : Model -> Action -> Model
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
        ("height", "50px")
        ("width", "55px")
        ("font-size","20px")
        ("cursor","pointer")
        ("padding", "15px")
        ("padding-top", "5px")
        ("margin","5px")
        ("text-align","center")
        ("line-height","40px")
        ("background-color","lightgreen")
        ("box-shadow", "0 0 3px black")
    ]

let opButtonStyle =
    Style [
        ("height", "50px")
        ("width", "55px")
        ("font-size","20px")
        ("padding", "15px")
        ("padding-top", "5px")
        ("text-align","center")
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

    let row xs = tr [] [ for x in xs -> td [] [x]]


    div
        [ Style [ ("width","320px"); ("border", "2px black solid"); ("border-radius", "15px"); ("padding", "10px")]]
        [
            h1 [ Style [("font-size","24px");("padding-left", "20px"); ("height", "30px")] ] [ text (modelString model) ]
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

// Using createSimpleApp instead of createApp since our
// update function doesn't generate any actions. See
// some of the other more advanced examples for how to
// use createApp. In addition to the application functions
// we also need to specify which renderer to use.
createSimpleApp (InputStack []) view update Virtualdom.createRender
|> withStartNodeSelector "#sample"
|> start
