import inquire = require("inquirer");
import env = require("yeoman-environment");
import { PathHandler } from '../PathHandler/PathHandler';
import { parse, join } from 'path';
import { ConfigHandler } from '../ConfigHandler/ConfigHandler';

/**
 * IGeneratorOptions
 * @description Options when creating a new Files
 */
export interface IGeneratorOptions {
    template: string;
    file: string | undefined;
    flags?: Array<string>;
}

export class Generator {

    private env: env;
    private pathHandler: PathHandler;
    private configHandler: ConfigHandler;

    constructor() {
        this.env = env.createEnv();
        this.pathHandler = new PathHandler();
        this.configHandler = new ConfigHandler(
            join(this.pathHandler.getProjectPath(), '.booster/config.json')
        );
    }

    /**
     * handler
     * @description Handler to generate new Files
     * @param options Generator Options
     */
    public async handler(options: IGeneratorOptions): Promise<void> {
        if (!this.pathHandler.isInProject())
            throw new Error("To use the Generate Command you need to be in a Booster Project");
        if (options.file === undefined)
            options.file = await this.getFileName();
        return this.runDefaultGenerator(options);
    }

    /**
     * getTemplates
     * @description Handler to display the avaible Project of a template
     */
    public getTemplates() {
        const finder = require("./default-template/default-template").getTemplates;
        if (!finder)
            return;
        const templates = finder() as Array<string>;
        console.log(`Available Templates:`);
        for (const template of templates)
            console.log(`  - ${parse(template).name}`);
    }

    private async getFileName(): Promise<string> {
        return inquire.prompt([{
            type: "input",
            name: "file",
            message: "Name of the Class:"
        }])
        .then((input) => {
            return Promise.resolve(input.file);
        });
    }

    private runDefaultGenerator(options: IGeneratorOptions): Promise<void> {
        if (this.configHandler.getConfig().oldGenerator === "yes")
            this.env.registerStub(require("./old-generator/old-generator"), 'default');
        else
            this.env.registerStub(
                require("./default-template/default-template").default,
                'default'
            );
        return new Promise((resolve, reject) => {
            this.env.run('default', options, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }

}
