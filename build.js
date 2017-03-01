var path = require("path");
var fs = require("fs-extra");
var fable = require("fable-compiler");
// var fable = require("../Fable/build/fable");

var version;

var targets = {
    all() {
        return fable.promisify(fs.remove, "npm")
            .then(_ => fable.compile({projFile: "src/Fable.Arch"}))
            .then(_ => fable.compile({projFile: "src/Fable.Arch", target: "umd"}))
            .then(_ => fable.promisify(fs.copy, "package.json", "npm/package.json"))
            .then(_ => fable.promisify(fs.copy, "README.md", "npm/README.md"))
            .then(_ => fable.promisify(fs.readFile, "RELEASE_NOTES.md"))
            .then(line => {
                version = /\d[^\s]*/.exec(line)[0];
                return fable.runCommand("npm", "npm version " + version);
            });
    },
    dev() {
        return fable.promisify(fs.remove, "npm")
            .then(_ => fable.compile({projFile: "src/Fable.Arch", watch: true}))
    },
    publish() {
        return this.all()
            .then(_ => {
                var command = version && version.indexOf("alpha") > -1
                    ? "npm publish --tag next"
                    : "npm publish";
                fable.runCommand("npm", command)
            })
    }
}

targets[process.argv[2] || "all"]().catch(err => {
    console.log("[ERROR] " + err);
    process.exit(-1);
});
