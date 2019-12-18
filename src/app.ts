#!/usr/bin/env node

import program = require("commander");
import { Generator, IGeneratorOptions } from "./Generator/Generator";
import { Creator, ICreatorOptions } from "./Creator/Creator";
const info = require("../package.json");

const generate = () => {
    return (...options) => {
        const [template, file] = options[0];
        if (!template && !file) {
            (new Generator()).getTemplates();
            return;
        }
        const option: IGeneratorOptions = {
            file,
            template,
            flags: options[1]
        };
        (new Generator()).handler(option)
        .catch(errorHandler());
    };
};

const create = () => {
    return (...options) => {
        const [ project ] = options[0];
        const config: ICreatorOptions = {
            name: project,
            flags: options[1]
        };
        (new Creator()).handler(config)
        .catch(errorHandler());
    };
};

const errorHandler = () => {
    return (e) => {
        process.exitCode = 1;
        console.log(`❌  ${e.message}.`);
    };
};

// tslint:disable-next-line: no-empty
program.addImplicitHelpCommand = () => {};

program
.version(info.version)
.command('new <project-name>', "Create a new Booster Project")
.command('generate <template> [file-name]', "Generate new File(s) based on a template")
.on("command:new", create())
.on("command:generate", generate())
.on("command:g", generate())
.on("command:help", () => {
    program.help();
})
.on("command:*", (...options) => {
    const [ command ] = options[0];
    process.exitCode = 1;
    console.log(`❌  The command ${command} is invalid.`);
})
.parse(process.argv);
