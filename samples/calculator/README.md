# Calculator sample

  This sample is a simple calculator written using fable-arch. Created by [Zaid-Ajaj](https://github.com/Zaid-Ajaj). 

## Model 

The first thing we do is define a *model*. Sometimes we call this the *state of the app*. The state is what we would like to keep track of when the user interacts with the app.

In our case, the `Input` type represents what the user can click on in the calculator and `Model` represents what buttons the user had clicked so far.

Not every click will be added to the model. It's up to the `update` function to decide how to compute the next state of the app once the user clicked something.

You might ask, *How does the `update` function know what the user clicked if it only operates on the model?* It is the `view` function the sends or dispatches the actions to the `update` function. The `update` function computes the next state and returns the result to the `view`. The `view` function gets called and the UI gets re-rendered.

```fsharp
type Input = 
| Const of int
| Plus
| Minus 
| Times 
| Div
| Clear
| Equals

type Model = InputStack of Input list
```
## Actions
The action is what gets dispatched/sent to the update function, then the update function gets both the current model/state and the action dispatched and decides how the next state should be computed.
```fsharp
type Actions = PushInput of Input
```
### Helper functions
Before we dive in the update function that has all the logic of the app, let us first define some helper functions that operate on our model and input. These should be self-explainatory for an F# developer.

```fsharp
// lets you concat two ints, i.e. concatInts 11 22 -> 1122
// concatInts : int -> int -> int
let concatInts x y = int (sprintf "%d%d" x y)

// Active pattern that matches with an operation
Operation : Input -> Input option
let (|Operation|_|) = function 
| Plus -> Some Plus
| Minus -> Some Minus
| Times -> Some Times
| Div -> Some Div
| _ -> None

// when the model has the shape `[Const a; operation; Const b]`, we reduce that to `(operation) a b` 
// solve : Model -> int 
let solve (InputStack [Const x; Operation op; Const y]) = 
    match op with
    | Plus -> x + y
    | Minus -> x - y
    | Times -> x * y
    | Div -> x / y
    | _ -> failwith "Will not happen"
```

## Update
The update function: contains the logic of how to compute the next state or model based on the current state and the action dispatched by the user.
```fsharp
// update : Model -> Action -> Model
let update (InputStack xs) (PushInput input) =
if input = Clear then InputStack []
else
match xs with
| [] -> // model is empty 
    match input with
    | Operation op -> InputStack [] // user clicks an operation -> model stays empty
    | Equals -> InputStack [] // user clicks = -> model stays empty
    | _ -> InputStack [input] // otherwise, add whatever input was clicked to model
| [Const x] -> // model contains a number
    match input with
    | Const y -> InputStack [Const (concatInts x y)] // user clikced on digit -> concat the two
    | Operation op -> InputStack [Const x; op] // user clicked an operation -> add it to model
    | _ -> InputStack xs // otherwise -> return the model unchanged
| [Const x; Operation op] ->  // the model contains a number and an operation
    match input with
    | Const y -> InputStack [Const x; op; Const y] // user clicked another digit -> push the digit to model
    | Operation otherOp -> InputStack [Const x; otherOp] // user clicked another operation -> replace op with otheOp
    | _ -> InputStack xs // otherwise -> return model unchanged
| [Const x; Operation op; Const y] -> // now model contains the shape we want to send to the "solve" function
    match input with
    | Const y' -> InputStack [Const x; op; Const (concatInts y y')] // clicked on digit -> concat it with Const y
    | Equals -> InputStack [Const (solve (InputStack xs))] // calculate result, reset model and push result to model
    | Operation op -> 
        let result = solve (InputStack xs)
        InputStack [Const result; op]
    | _ -> InputStack xs
| _ -> InputStack xs
```
## View
  
Now the view. The view depends on the current state and dispatches actions to the update function, there by getting a new state. At this point the view will rerender itself.

### Helper functions
```fsharp
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
```
### Styles for the buttons
```fsharp
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
```

## The `view` function 
```fsharp
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
    
// table row
let row xs = tr [] [ for x in xs -> td [] [x]]

div
    [ Style [ ("width", "407px"); ("border", "2px black solid"); ("border-radius", "15px"); ("padding", "10px")]]
    [
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
```

# Create the app
```fsharp
let initialState = InputStack []
createSimpleApp initialState view update Virtualdom.createRender
|> withStartNodeSelector "#calc"
|> start
```
