# TypeScript 4.5 Beta Exports

Run `npm install` on top-level to install and build all packages. 

To test auto import make sure to use the workspace version of TypeScript in VSCode.

You may also want to start a clean version of VSCode via `code --extensions-dir /tmp/code-ext --user-data-dir /tmp/code-profile .`

Packages

* importer – Playground to test auto import (e.g. in main.js)
* exporter-old – Uses the "old" types field in package.json
* expoter – Uses the new exports field to expose root module and a feature module
* exporer-all – Uses the new exports but exposes everything via `./*`

# Problem 1 – Auto import doesn't work as expected

```
// Works: auto-import ExportMainFunction (this didn't work in an earlier repro, but now it does; not sure why.)
// Works: auto-import ExportOldMainFunction

// Doesn't work: auto-import ExportFeature (it does work when something from "exporter/feature" was exported elsewhere)
// Doesn't work: auto-import ExportAllMain (cannot even be imported manually)
```

Manually importing them and running `node main.js` works without any problems, so the exports should be correct at least by Node.js's logic.  

Also, it seems like in the exporter package, one has has to specify `types` in addition to `module`. I would expect this not to be necessary when the declaration file is located next to the JS file.

# Problem 2 – Watch mode behaves strangely

There is also different, probably unrelated problem with `tsc -w`. The initial build of `tsc -w` in the importer package generated the correct code for `main.ts`, a subsequent build generates the code with the wrong target (looks like ES5?), yet another build (and apparently all builds that follow) again generates the correct code.

To reproduce, run `npx tsc -w` in the importer package, look at `lib/main.js` and then trigger a change in `src/main.ts`; the `lib/main.js` will contain code generated for the wrong target. `src/main.ts` should contain some code to actually see the problem.