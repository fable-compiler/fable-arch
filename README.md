# Fable-Arch

Framework for building applications based on the elm architecture. [Docs site](http://fable.io/fable-arch/)

## Installation

```sh
$ npm install --save virtual-dom fable-core
$ npm install --save-dev fable-arch
```

## Usage

### In an F# project (.fsproj)

```xml
  <ItemGroup>
    <Reference Include="node_modules/fable-core/Fable.Core.dll" />
  </ItemGroup>
  <Reference Include="Fable.Arch">
    <HintPath>node_modules\fable-arch\Fable.Arch.dll</HintPath>
  </Reference>
```

### In an F# script (.fsx)

```fsharp
#r "node_modules/fable-core/Fable.Core.dll"
#r "node_modules/fable-arch/Fable.Arch.dll"

open Fable.Core
open Fable.Import
open Fable.Arch
open Fable.Arch.App
open Fable.Arch.App.AppApi
open Fable.Arch.Html
```

### Rollup

If you are using Rollup as the bundler you need to tell it how to bundle virtual-dom.

Example:

```json
  "rollup": {
    "dest": "public/bundle.js",
    "plugins": {
      "commonjs": {
        "namedExports": {
          "virtual-dom": [ "h", "create", "diff", "patch" ]
        }
      }
    }
  }
```
