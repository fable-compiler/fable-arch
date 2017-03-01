const path = require('path');
const fs = require('fs-extra');
const fable = require('fable-compiler');
const child_process = require('child_process');

const BUILD_DIR = "public"
const JS_DIR = "js"
const DEST_FILE = "bundle.js"
const PKG_JSON = "package.json"
const README = "README.md"
const RELEASE_NOTES = "RELEASE_NOTES.md"
const PROJ_FILE = "src/WebApp.fsproj"
const SAMPLES_DIR = "samples"
const SAMPLES_TEMPLATE = path.join(SAMPLES_DIR, "template")
const GEN_DIR = "build"

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
  },
  createSample() {
    const destName = process.argv[3]

    if (destName === undefined){
      console.log("Missing destination name");
      console.log("Command: node build.js createSample [destName]");
      process.exit(-1);
    } else {
      const destPath = path.join(SAMPLES_DIR , destName);
      return fable.promisify(fs.copy, SAMPLES_TEMPLATE, destPath)
        .then(_ => console.log("Sample created at: " + destPath))
    }
  },
  buildAllSamples() {
    return fable.promisify(fs.readdir, SAMPLES_DIR, (err, files) => {

      files.forEach(file => {
        if (file !== "template" && file !== ".DS_Store") {
          const localDir = path.join(SAMPLES_DIR, file)
          console.log(localDir)
          child_process.execSync("node build.js",  {
            cwd: localDir
          });
        }
      });
    });
  }
}

// As with FAKE scripts, run a default target if no one is specified
targets[process.argv[2] || "build"]().catch(err => {
  console.log(err);
  process.exit(-1);
});
