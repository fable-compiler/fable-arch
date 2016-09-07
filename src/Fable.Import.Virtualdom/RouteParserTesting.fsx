#r "./node_modules/fable-core/Fable.Core.dll"
#load "./Fable.Helpers.RouteParser.fs"

module RouteParserTesting = 
    open Fable.Helpers.Parsing
    open Fable.Helpers.RouteParser
    open System
    type Route =
        | Home
        | HomeStr of string
        | HomeStrInt of string*int
        | Home1 of Guid
        | Home2 of Guid*int
        | Home3 of Guid*int*int
        | Home4 of Guid*int*int*int
        | Home5 of Guid*int*int*int*int
        | User of Guid*int*float
        | Admin of Guid
        | NotFound of string
    let routes = [
        runM Home (pStaticStr "home" |> (drop >> _end))
        runM2 HomeStrInt (pStringTo '/' .>>. pint |> _end)
        runM1 HomeStr (pStringTo '/' |> _end)
        runM1 Home1 (pStaticStr "home" </.> pguid |> _end) 
        runM2 Home2 (pStaticStr "home" </.> pguid </> pint |> _end) 
        runM3 Home3 (pStaticStr "home" </.> pguid </> pint </> pint |> _end) 
        runM4 Home4 (pStaticStr "home" </.> pguid </> pint </> pint </> pint |> _end) 
        runM5 Home5 (pStaticStr "home" </.> pguid </> pint </> pint </> pint </> pint |> _end) 
        runM3 User (pStaticStr "user" </.> pguid </> pint <./> pStaticStr "yolo" </> pfloat |> _end) 
        runM2 (fun (g,_) -> Admin g) (pStaticStr "admin" </.> pguid </> pint |> _end) 
        runM1 NotFound pString
    ]
    let run() = 
        [
            "home"
            "this is a random string/567"
            "this is random string with / at the end"
            "30FF82ab-2861-43f5-8b68-3b52e2b3ddbc/123121"
            "home/30FF82ab-2861-43f5-8b68-3b52e2b3ddbc"
            "home/30FF82ab-2861-43f5-8b68-3b52e2b3ddbc/123121"
            "home/30FF82ab-2861-43f5-8b68-3b52e2b3ddbc/123121/123"
            "home/30FF82ab-2861-43f5-8b68-3b52e2b3ddbc/123121/234/345"
            "home/30FF82ab-2861-43f5-8b68-3b52e2b3ddbc/123121/1/323/232"
            "home/30FF82ab-2861-43f5-8b68-3b52e2b3ddbc/123121/2342/234234/23432"
            "user/30ff82ab-2861-43f5-8b68-3b52e2b3ddbc/123121/yolo/34.23"
            "admin/30FF82ab-2861-43f5-8b68-3b52e2b3ddbc/123121"
            "30FF82ab-2861-43f5-8b68-3b52e2b3ddbc/123121xxxz"
        ] |> List.iter (fun i -> printfn "%A" (choose routes i))

RouteParserTesting.run()