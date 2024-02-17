import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname } from "node:path";

import { Command } from "@toridoriv/cliffy";
import shell from "shelljs";

export const cp = new Command()
  .name("cp")
  .option("-s --source <source:string>", "", {
    required: true,
  })
  .option("-t --target <target:string>", "", {
    required: true,
  })
  .option("-r --recursive", "", {
    default: false,
  })
  .action(function handle(options) {
    if (!existsSync(options.target)) {
      mkdirSync(options.target, { recursive: true });
    }

    const files = readdirSync(options.source, {
      recursive: options.recursive,
      encoding: "utf-8",
    });
    const targetFiles = readdirSync(options.target, {
      recursive: options.recursive,
      encoding: "utf-8",
    });

    for (const file of files) {
      if (targetFiles.includes(file)) {
        continue;
      } else {
        const source = options.source + "/" + file;
        const target = options.target + "/" + file;
        const targetDirname = dirname(target);

        if (!existsSync(targetDirname)) {
          mkdirSync(targetDirname, { recursive: true });
        }

        try {
          copyFileSync(source, target);
          console.info(`${source} copied`);
        } catch (e) {
          console.error(`Could not copy ${source}`, e);
        }
      }
    }
  });
