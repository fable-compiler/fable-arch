
// Load Fable.Core and bindings to JS global objects
#r "node_modules/fable-core/Fable.Core.dll"
#load "node_modules/fable-import-virtualdom/Fable.Helpers.Virtualdom.fs"

open System
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import

module SudokuSolver =
    open System.Collections.Generic
    
    type Box = int
    type Sudoku = Box array array
    
    let rows = id
    let cols (sudoku:Sudoku) =
        sudoku
        |> Array.mapi (fun a row -> row |> Array.mapi (fun b cell -> sudoku.[b].[a]))
    
    let getBoxIndex count row col = 
       let n = row/count
       let m = col/count
       n * count + m
    
    let boxes (sudoku:Sudoku) = 
        let d = sudoku |> Array.length |> float |> System.Math.Sqrt |> int
        let list = new List<_>()
        for a in 0..(d*d) - 1 do list.Add(new List<_>())
    
        for a in 0..(Array.length sudoku - 1) do
            for b in 0..(Array.length sudoku - 1) do
                list.[getBoxIndex d a b].Add(sudoku.[a].[b])
    
        list 
          |> Seq.map Seq.toArray
      
    let toSudoku x : Sudoku = 
        x
        |> Seq.map Seq.toArray
        |> Seq.toArray
    
    let allUnique numbers =
        let set = new HashSet<_>()
        numbers
        |> Seq.filter ((<>) 0)
        |> Seq.forall set.Add
    
    let solvable sudoku =
        rows sudoku
        |> Seq.append (cols sudoku)
        |> Seq.append (boxes sudoku)
        |> Seq.forall allUnique
    
    let replaceAtPos (x:Sudoku) row col newValue :Sudoku =     
        [| for a in 0..(Array.length x - 1) ->
            [| for b in 0..(Array.length x - 1) -> 
                if a = row && b = col then newValue else x.[a].[b] |] |]
    
    let rec substitute row col (x:Sudoku) = 
        let a,b = if col >= Array.length x then row+1,0 else row,col
        if a >= Array.length x then seq { yield x } else
        if x.[a].[b] = 0 then 
            [1..Array.length x]           
                |> Seq.map (replaceAtPos x a b)  
                |> Seq.filter solvable                     
                |> Seq.map (substitute a (b+1))
                |> Seq.concat
         else substitute a (b+1) x
    
    let getFirstSolution = substitute 0 0 >> Seq.head

open SudokuSolver

type SudokuAppState = {
    Sudoku:Sudoku
}
type Position = int * int
type Val = int
type Actions = 
    | Solve
    | ChangeBox of Position * Val

let update (model:Sudoku) command =
    match command with
    | Solve -> getFirstSolution model
    | ChangeBox ((x,y),v) ->
        model.[x].[y] <- v
        model
    |> (fun m -> m, []) 

let initModel = 
            [[0; 0; 8;  3; 0; 0;  6; 0; 0]
             [0; 0; 4;  0; 0; 0;  0; 1; 0]
             [6; 7; 0;  0; 8; 0;  0; 0; 0]

             [0; 1; 6;  4; 3; 0;  0; 0; 0]
             [0; 0; 0;  7; 9; 0;  0; 2; 0]
             [0; 9; 0;  0; 0; 0;  4; 0; 1]

             [0; 0; 0;  9; 1; 0;  0; 0; 5]
             [0; 0; 3;  0; 5; 0;  0; 0; 2]
             [0; 5; 0;  0; 0; 0;  0; 7; 4]]
              |> toSudoku

open Fable.Helpers.Virtualdom
open Fable.Helpers.Virtualdom.App
open Fable.Helpers.Virtualdom.Html

let inline onInput x = onEvent "oninput" (fun e -> x (unbox e?target?value))
let maxlength (i:int) = attribute "maxlength" (string i) 
let view (model:Sudoku) = 
    let inputs =
         div [] 
            [for i in 0 .. model.Length-1 ->
              div 
                [] 
                [ for j in 0 .. model.Length-1 ->
                        input
                            [
                                maxlength 1
                                property "value" 
                                    (match model.[i].[j] with
                                        | 0 -> unbox ""
                                        | v -> unbox (v.ToString()))
                                onInput (fun x -> ChangeBox ((i,j), int (unbox x)))
                            ]
                ]
            ]


    div [] 
        [ h1 [ ] [text "Sudoku"]
          div [] 
            [
                inputs
                br []
                button [
                    attribute "class" "button"
                    onMouseClick (fun _ -> Solve )
                ] [ text "Solve" ]
            ]
        ]

open Fable.Import.Browser
createApp initModel view update
|> withStartNodeSelector "#todoapp"
|> withSubscriber "allseeingeye" (fun x -> window.console.log("Something happened: ", x))
|> start renderer 