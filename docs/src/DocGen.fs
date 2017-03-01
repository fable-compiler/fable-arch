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
  let rawUrl = sprintf "http://%s" Browser.location.host
  let createSampleDirectoryURL sampleName =
    sprintf "%s/samples/%s/public/" rawUrl sampleName
  #else
  let rawUrl = "https://raw.githubusercontent.com/fable-compiler/fable-arch/gh-pages/"
  let createSampleDirectoryURL sampleName =
    sprintf "http://fable.io/fable-arch/samples/%s/public" sampleName
  #endif

  let createDocFilesDirectoryURL fileName =
    sprintf "%s/%s/%s.md" rawUrl docFilesDirectory fileName

  let createDocURL fileName =
    sprintf "#/docs?fileName=%s" fileName


  let createSampleReadmeURL sampleName =
    sprintf "%s/samples/%s/README.md" rawUrl sampleName

  let githubURL sampleName =
    sprintf "http://github.com/fable-compiler/fable-arch/tree/master/docs/samples/%s" sampleName
