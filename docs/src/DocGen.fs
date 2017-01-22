namespace WebApp

open Fable.Core
open Fable.Import
open Fable.PowerPack.Fetch
open Fable.PowerPack
open System.Text.RegularExpressions

module DocGen =

  let sampleSourceDirectory = "src/Pages/Sample"

  let docFilesDirectory = "doc_files"

  #if DEV
  let baseUrl = ""
  let rawUrl = ""
  #else
  let baseUrl = "https://mangelmaxime.github.io/fable-arch"
  let rawUrl = "https://raw.githubusercontent.com/MangelMaxime/fable-arch/gh-pages/"
  #endif

  let createSampleURL file =
    sprintf "%s/%s/%s" rawUrl sampleSourceDirectory file

  let createDocFilesDirectoryURL fileName =
    sprintf "%s/%s/%s.md" baseUrl docFilesDirectory fileName

  let createDocURL fileName =
    sprintf "#/docs?fileName=%s" fileName

  type CaptureState =
    | Nothing
    | Content
    | Block of string

  type Block =
    { Key: string
      Text: string
    }

    static member Create key content =
      { Key = key
        Text = content
      }

  type ParserResult =
    { Text: string
      Blocks: Block list
      CaptureState: CaptureState
      Offset: int
    }

    static member Initial =
      { Text = ""
        Blocks = []
        CaptureState = Nothing
        Offset = 0
      }

  let (|Contains|_|) (p:string) (s:string) =
    if s.Contains(p) then
      Some s
    else
      None

  let (|Prefix|_|) (p:string) (s:string) =
    if s.StartsWith(p) then
      Some s
    else
      None

  let (|IsBeginBlock|_|) input =
    let pattern = ".*\\[BeginBlock:([a-z0-9]*)\\]"
    let m = Regex.Match(input, pattern, RegexOptions.IgnoreCase)
    if (m.Success) then
      Some m.Groups.[1].Value
    else
      None

  let (|IsEndBlock|_|) input =
    let pattern = ".*\\[EndBlock\\]"
    let m = Regex.Match(input, pattern, RegexOptions.IgnoreCase)
    if (m.Success) then
      Some true
    else
      None

  let (|IsBlock|_|) input =
    let pattern = ".*\\[Block:([a-z0-9]*)\\]"
    let m = Regex.Match(input, pattern, RegexOptions.IgnoreCase)
    if (m.Success) then
      Some m.Groups.[1].Value
    else
      None

  let (|IsFsharpBlock|_|) input =
    let pattern = ".*\\[FsharpBlock:([a-z0-9]*)\\]"
    let m = Regex.Match(input, pattern, RegexOptions.IgnoreCase)
    if (m.Success) then
      Some m.Groups.[1].Value
    else
      None

  let rec countStart (chars: char list) index =
    match chars with
    | x::xs ->
        if x = ' ' then
          countStart xs (index + 1)
        else
          index
    | [] ->
        index

  let generateBlock result blockName format =
    let exist = result.Blocks |> List.exists(fun x -> x.Key = blockName)
    let blockText =
      if exist then
        result.Blocks
        |> List.filter(fun x ->
          x.Key = blockName
        )
        |> List.head
        |> (fun x ->
          x.Text
        )
      else
        ""
    { result with
        Text = sprintf format result.Text blockText
    }

  let generateDocumentation (text: string) =
    let lines = text.Split('\n') |> Array.toList

    let rec parseSample lines result =
      match lines with
      | line::xs ->
          let newResult =
            match line with
            | Contains "[BeginDocs]" line ->
              { result with
                  CaptureState = Content
                  Offset = countStart (line.ToCharArray() |> Array.toList) 0
              }
            | Contains "[EndDocs]" line ->
              { result with
                  CaptureState = Nothing
                  Offset = 0
              }
            | IsBeginBlock groupName ->
                { result with
                    CaptureState = Block groupName
                    Offset = countStart (line.ToCharArray() |> Array.toList) 0
                }
            | IsEndBlock _ ->
                { result with
                    CaptureState = Nothing
                    Offset = 0
                }
            | line ->
                match result.CaptureState with
                | Content ->
                    match line with
                    | IsBlock name ->
                        generateBlock result name "%s\n%s"
                    | IsFsharpBlock name ->
                        generateBlock result name "%s\n```fsharp\n%s```"
                    | _ ->
                        { result with
                            Text = sprintf "%s\n%s" result.Text (line.Substring(result.Offset))
                        }
                | Block key ->
                    let exist = result.Blocks |> List.exists(fun x -> x.Key = key)

                    let blocks' =
                      if exist then
                        result.Blocks
                        |> List.map(fun x ->
                          if x.Key = key then
                            { x with
                                Text = sprintf "%s\n%s" x.Text (line.Substring(result.Offset))
                            }
                          else
                            x
                        )
                      else
                        Block.Create key (line.Substring(result.Offset)) :: result.Blocks

                    { result with
                        Blocks = blocks'
                    }
                | Nothing -> result
          parseSample xs newResult
      | [] -> result

    let result = parseSample lines ParserResult.Initial
    result.Text

  /// Simple class used to fetch and cache the generated docs
  type Documentation (url) =
    let mutable generated = false
    let mutable html = ""
    let sourceFile = createSampleURL url

    member self.RetrieveFile () =
        fetch sourceFile []
        |> Promise.bind(fun res ->
          res.text()
        )
        |> Promise.map(fun text ->
          html <-
            generateDocumentation text
            |> Marked.Globals.marked.parse
          generated <- true
        )
        |> ignore

    member self.Html
      with get() : string =
        if not generated then
          self.RetrieveFile()
        html
