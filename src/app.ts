import { Injector } from '@booster-ts/core';
import { Commands } from './Commands/Commands';
import { PathHandler } from './PathHandler/PathHandler';
import Creator from './Creator/Creator';
import Generator from './Generator/Generator';

const container = new Injector();
const path = container.inject(PathHandler);
const command = container.inject(Commands);
const creator = container.inject(Creator);
const generator = container.inject(Generator);

command.handler();

const options = command.getOptions();
if (options.init) {
    console.log(`Create New Project ${options.init}`);
    creator.handler(options.init);
} else
    generator.handler();
