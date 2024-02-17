import { createRequire } from "node:module";

import { Command } from "@toridoriv/cliffy";

import { commands } from "./commands/index.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");
const macoscript = new Command()
  .name("macoscript")
  .description(pkg.description)
  .action(function () {
    this.showHelp();
  });

for (const cmd of commands) {
  macoscript.command(cmd.getName(), cmd);
}

macoscript.parse(process.argv.slice(2));
