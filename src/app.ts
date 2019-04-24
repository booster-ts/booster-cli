#!/usr/bin/env node

import { Injector } from '@booster-ts/core';
import { Commands } from './Commands/Commands';
import { PathHandler } from './PathHandler/PathHandler';
import Creator from './Creator/Creator';
import Generator from './Generator/Generator';
import Config from './Config/Config';

const container = new Injector();
const path = container.inject(PathHandler);
const command = container.inject(Commands);
const creator = container.inject(Creator);
const generator = container.inject(Generator);
const config = container.inject(Config);

config.handler();
command.handler();

const options = command.getOptions();
if (options.init) {
    console.log(`Creating New Project ${options.init}`);
    creator.handler(options.init);
    console.log(`Created New Project ${options.init}`);
} else
    generator.handler();
