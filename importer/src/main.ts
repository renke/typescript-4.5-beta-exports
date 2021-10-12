// Works: auto-import ExportMainFunction (this didn't work previously, but now it does)
// Works: auto-import ExportOldMainFunction

// Doesn't work: auto-import ExportFeature (it does work when something from "exporter/feature" was exported elsewhere)
// Doesn't work: auto-import ExportAllMain (cannot even be imported manually)