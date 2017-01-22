const path = require('path');
const fs = require('fs-extra');
const fable = require('fable-compiler');

const BUILD_DIR = "public"
const JS_DIR = "js"
const DEST_FILE = "bundle.js"
const PKG_JSON = "package.json"
const README = "README.md"
const RELEASE_NOTES = "RELEASE_NOTES.md"
const PROJ_FILE = "src/WebApp.fsproj"

const fableconfig = {
  "babelPlugins": [ "transform-runtime" ],
  "projFile": PROJ_FILE,
  "rollup": {
    "dest": path.join(BUILD_DIR, JS_DIR, DEST_FILE),
    "plugins": {
      "commonjs": {
        "namedExports": {
          "virtual-dom": [ "h", "create", "diff", "patch" ]
        }
      }
    }
  }
};

const fableconfigDev =
  Object.assign({
    "sourceMaps": true,
    "watch": true,
    "symbols": "DEV"
  }, fableconfig)

const targets = {
  clean() {
    return fable.promisify(fs.remove, path.join(BUILD_DIR, JS_DIR))
  },
  build() {
    return this.clean()
      .then(_ => fable.compile(fableconfig))
  },
  dev() {
    return this.clean()
      .then(_ => fable.compile(fableconfigDev))
  }
}

// As with FAKE scripts, run a default target if no one is specified
targets[process.argv[2] || "build"]().catch(err => {
  console.log(err);
  process.exit(-1);
});
