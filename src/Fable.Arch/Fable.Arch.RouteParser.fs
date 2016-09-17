namespace Fable.Arch.RouteParser 
(*
Based on the excellent blog series by Scott Wlaschin: http://fsharpforfunandprofit.com/posts/understanding-parser-combinators/
Inspired by Elm Route Parser: http://package.elm-lang.org/packages/etaque/elm-route-parser/2.2.1/

*)

[<AutoOpen>]
module Parsing =

    open System
    type ParserLabel = string
    type ParserError = string
    type Result<'a,'b> =
        | Success of 'a
        | Failure of 'b 

    type Parser<'a> = {
        parseFn : (string -> Result<'a * string, ParserLabel*ParserError>)
        label:  ParserLabel 
        }

    let printResult result =
        match result with
        | Success (value,input) -> 
            printfn "%A" value
        | Failure (label,error) -> 
            printfn "Error parsing %s\n%s" label error

    let satisfy predicate label =
        let innerFn input =
            if String.IsNullOrEmpty(input) then
                Failure (label,"No more input")
            else
                let first = input.[0] 
                if predicate first then
                    let remainingInput = input.Substring(1)
                    Success (first,remainingInput)
                else
                    let err = sprintf "Unexpected '%c'" first
                    Failure (label,err)
        {parseFn=innerFn;label=label}

    let pchar charToMatch = 
        let predicate ch = (ch = charToMatch) 
        let label = sprintf "%c" charToMatch 
        satisfy predicate label 

    let digitChar = 
        let predicate = fun c -> ['0' .. '9'] |> List.contains c 
        let label = "digit"
        satisfy predicate label 

    let run parser input = 
        let innerFn = parser.parseFn 
        innerFn input

    let getLabel parser = 
        parser.label

    let setLabel parser newLabel = 
        let newInnerFn input = 
            let result = parser.parseFn input
            match result with
            | Success s ->
                Success s 
            | Failure (oldLabel,err) -> 
                Failure (newLabel,err)
        {parseFn=newInnerFn; label=newLabel} 

    let ( <?> ) = setLabel

    let bindP f p =
        let label = "unknown" 
        let innerFn input =
            let result1 = run p input 
            match result1 with
            | Failure (label,err) -> 
                Failure (label,err)  
            | Success (value1,remainingInput) ->
                let p2 = f value1
                run p2 remainingInput
        {parseFn=innerFn; label=label}

    let ( >>= ) p f = bindP f p

    let returnP x = 
        let label = sprintf "%A" x
        let innerFn input =
            Success (x,input)
        {parseFn=innerFn; label=label}

    let mapP f = 
        bindP (f >> returnP)

    let ( <!> ) = mapP

    let ( |>> ) x f = mapP f x

    let applyP fP xP =         
        fP >>= (fun f -> 
        xP >>= (fun x -> 
            returnP (f x) ))

    let ( <*> ) = applyP

    let lift2 f xP yP =
        returnP f <*> xP <*> yP

    let andThen p1 p2 =         
        let label = sprintf "%s andThen %s" (getLabel p1) (getLabel p2)
        p1 >>= (fun p1Result -> 
        p2 >>= (fun p2Result -> 
            returnP (p1Result,p2Result) ))
        <?> label

    let ( .>>. ) = andThen

    let orElse parser1 parser2 =
        let label = sprintf "%s orElse %s" (getLabel parser1) (getLabel parser2)

        let innerFn input =
            let result1 = run parser1 input

            match result1 with
            | Success result -> 
                result1
            | Failure (_,err) -> 
                let result2 = run parser2 input
                match result2 with
                | Success _ -> 
                    result2
                | Failure (_,err) -> 
                    Failure (label,err)
        {parseFn=innerFn; label=label}

    let ( <|> ) = orElse

    let choice listOfParsers = 
        List.reduce ( <|> ) listOfParsers 

    let anyOf listOfChars = 
        let label = sprintf "any of %A" listOfChars 
        listOfChars
        |> List.map pchar
        |> choice
        <?> label

    let zeroOrOne parser = 
        let innerFn input = 
            if input = "" then Success("", "")
            else
                run parser input
        {parseFn=innerFn; label="zeroOrOne"}

    let rec parseZeroOrMore parser input =
        let firstResult = run parser input 
        match firstResult with
        | Failure (_,_) -> 
            ([],input)  
        | Success (firstValue,inputAfterFirstParse) -> 
            let (subsequentValues,remainingInput) = 
                parseZeroOrMore parser inputAfterFirstParse
            let values = firstValue::subsequentValues
            (values,remainingInput)  

    let parseXTimes count parser = 
        let innerFn input = 
            let rec innerParse count' input' acc = 
                if count' = 0 
                then Success ((acc |> List.rev),input')
                else 
                    match run parser input' with
                    | Failure (label,error) -> 
                        let label = sprintf "Failed to parse \"%s\" %i number of times " label count
                        Failure (label,error)
                    | Success (v, rest) ->
                        innerParse (count' - 1) rest (v::acc)
            innerParse count input []
        let label = sprintf "Failed to parse \"%s\" %i number of times " (getLabel parser) count
        {parseFn=innerFn; label=label}

    let many parser = 
        let label = sprintf "many %s" (getLabel parser)
        let rec innerFn input =
            Success (parseZeroOrMore parser input)
        {parseFn=innerFn; label=label}

    let many1 p =         
        let label = sprintf "many1 %s" (getLabel p)

        p      >>= (fun head -> 
        many p >>= (fun tail -> 
            returnP (head::tail) ))
        <?> label

    let (.>>) p1 p2 = 
        p1 .>>. p2 
        |> mapP (fun (a,b) -> a) 

    let (>>.) p1 p2 = 
        p1 .>>. p2 
        |> mapP (fun (a,b) -> b) 

    let drop p = 
        let innerFn input =
            match run p input with
            | Success (_, rest) -> Success ((), rest)
            | Failure (label, error) -> Failure(label, error)
        {parseFn=innerFn; label="drop"}

    let opt p = 
        let label = sprintf "opt %s" (getLabel p)
        let some = p |>> Some
        let none = returnP None
        (some <|> none) <?> label

    let charListToStr charList =
        String(List.toArray charList) 

    let manyChars cp =
        many cp
        |>> charListToStr

    let manyChars1 cp =
        many1 cp
        |>> charListToStr

    let pint = 
        let label = "integer" 

        let resultToInt (sign,digits) = 
            let i = digits |> int
            match sign with
            | Some ch -> -i
            | None -> i
            
        let digits = manyChars1 digitChar 

        opt (pchar '-') .>>. digits 
        |> mapP resultToInt
        <?> label

    let pfloat = 
        let label = "float" 

        let resultToFloat (((sign,digits1),point),digits2) = 
            let fl = sprintf "%s.%s" digits1 digits2 |> float
            match sign with
            | Some ch -> -fl
            | None -> fl

        let digits = manyChars1 digitChar 

        opt (pchar '-') .>>. digits .>>. pchar '.' .>>. digits
        |> mapP resultToFloat
        <?> label

    let rec sequence parserList =
        let cons head tail = head::tail

        let consP = lift2 cons

        match parserList with
        | [] -> 
            returnP []
        | head::tail ->
            consP head (sequence tail)

    let pStaticStr str = 
        let label = str 

        str
        |> List.ofSeq
        |> List.map pchar 
        |> sequence
        |> mapP charListToStr 
        <?> label

    let pString = 
        let label = "string"
        let predicate = fun _ -> true
        satisfy predicate "string"
        |> many
        |> mapP charListToStr

    let pStringTo endingChar = 
        let label = sprintf "string up to char %c" endingChar
        let ending = pchar endingChar

        let predicate = fun c -> c <> endingChar
        let stringParser = 
            satisfy predicate "string"
            |> many
            |> mapP charListToStr
        stringParser .>> ending

    let phexdigit = 
        let label = "hexadecimal"
        let hexChars = [['a' .. 'f']; ['A' .. 'F']; [ '0' .. '9']] |> List.concat
        anyOf hexChars <?> "Expected valid hex digit"
    
    let pguid = 
        let resultToGuid ((x1,(x2:string list)),x3) = 
            let guidStr = sprintf "%s-%s-%s-%s-%s" x1 x2.[0] x2.[1] x2.[2] x3
            Guid.Parse(guidStr)
        
        let parseMiddlePart = pchar '-' >>. (parseXTimes 4 phexdigit) |> mapP charListToStr
        (parseXTimes 8 phexdigit |> mapP charListToStr) .>>. (parseXTimes 3 parseMiddlePart) .>> pchar '-' .>>. (parseXTimes 12 phexdigit |> mapP charListToStr)
        |> mapP resultToGuid
        <?> "guid"        

    let (</>) p1 p2 =
        p1 .>> pchar '/' .>>. p2

    let (<./>) p1 p2 =
        p1 .>> pchar '/' .>> p2

    let (</.>) p1 p2 =
        p1 >>. pchar '/' >>. p2
    
    let _end parser =
        let label = "End of input"
        let innerFn input =
            match run parser input with
            | Success (x, rest) ->
                if String.IsNullOrEmpty(rest) 
                then
                    Success (x, rest)
                else 
                    Failure (label, sprintf "Expected rest of input to be empty, got %s" rest)
            | Failure (label, err) -> Failure(label, err)
        {parseFn=innerFn; label=label}
        
    let choose routes input = 
        routes
        |> List.tryPick (fun r -> 
            match r input with
            | Success x -> Some x
            | Failure (_,_) -> None )

    let runM map route str = 
        match run route str with
        | Success ((),_) -> map |> Success
        | Failure (x,y) -> Failure (x,y) 

    let runM1 map route str = 
        match run route str with
        | Success (x,_) -> map x |> Success
        | Failure (x,y) -> Failure (x,y) 

    let runM2 = runM1

    let runM3 map route str = 
        match run route str with
        | Success (((x,y),z),_) -> map (x,y,z) |> Success
        | Failure (x,y) -> Failure (x,y) 

    let runM4 map route str = 
        match run route str with
        | Success ((((x,y),z), v),_) -> map (x,y,z,v) |> Success
        | Failure (x,y) -> Failure (x,y) 

    let runM5 map route str = 
        match run route str with
        | Success (((((x,y),z),v),w),_) -> map (x,y,z,v,w) |> Success
        | Failure (x,y) -> Failure (x,y) 

    let runM6 map route str = 
        match run route str with
        | Success ((((((x,y),z),v),w),u),_) -> map (x,y,z,v,w,u) |> Success
        | Failure (x,y) -> Failure (x,y) 

module RouteParser = 
    open System
    open Parsing
    open Fable.Import.Browser
    type LocationHandler = 
        {
            SubscribeToChange: (string -> unit) -> unit
            PushChange: string -> unit
        }
    type Router<'TRoute> =
        {
            Parse: string -> 'TRoute option
            Route: 'TRoute -> string option
        }
    let createRouter routes mapRoute =
        {
            Parse = choose routes
            Route = mapRoute
        } 

    let routeProducer locationHandler router handler = 
        let changeHandler str =
            match router.Parse str with
            | Some route -> route |> handler
            | None -> () 
        locationHandler.SubscribeToChange changeHandler

    let routeSubscriber locationHandler router message = 
        message
        |> router
        |> function
            | Some s -> locationHandler.PushChange s
            | None _ -> ()
