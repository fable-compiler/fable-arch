// include Fake libs
#r "./packages/FAKE/tools/FakeLib.dll"

open Fake
open Fake.NpmHelper

// Directories
let buildDir  = "./build/"
let deployDir = "./deploy/"


// Filesets
let appReferences  =
    !! "/**/*.csproj"
      ++ "/**/*.fsproj"

// version info
let version = "0.1"  // or retrieve from CI server

// Targets
Target "Clean" (fun _ ->
    CleanDirs [buildDir; deployDir]
)

Target "Npm" (fun _ ->
    Npm (fun p ->
            { p with
                Command = Install Standard
                WorkingDirectory = "./src/Fable.Import.Virtualdom/"
            })
)

Target "Build" (fun _ ->
    // compile all projects below src/app/
    MSBuildDebug buildDir "Build" appReferences
        |> Log "AppBuild-Output: "
)

Target "Deploy" (fun _ ->
    !! (buildDir + "/**/*.*")
        -- "*.zip"
        |> Zip buildDir (deployDir + "ApplicationName." + version + ".zip")
)

// Build order
"Clean"
  ==> "Npm"
  ==> "Build"
  ==> "Deploy"

// start build
RunTargetOrDefault "Build"
