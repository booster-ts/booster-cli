import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import * as fs from 'fs';
import * as path from 'path';
import * as commander from 'commander';

/**
 * Commands
 * @description ARGV Handler
 */
@booster()
export class Commands {

    private commander: typeof commander;
    private templates: Array<string>;

    constructor(
        private pathHandler: PathHandler
    ) {
        this.commander = commander;
    }

    /**
     * getOptions
     * @description Returns current options
     */
    public getOptions(): typeof commander {
        return this.commander;
    }

    /**
     * getTemplates
     * @description Returns templates
     */
    public getTemplates(): Array<string> {
        return this.templates;
    }

    /**
     * handler
     * @description Handles processing argv
     */
    public handler(): void {
        this.commander.option("init <project>", "Create new Project");
        this.findTemplates().forEach((template) => {
            this.commander.option(`${template} <name>`, `Create New ${template}`);
        });
        this.commander.parse(process.argv);
    }

    /**
     * findTemplates
     * @description Searches for templates
     */
    private findTemplates(): Array<string> {
        let templates = [];
        const paths = [this.pathHandler.getRootPath(), this.pathHandler.getProjectPath()];

        for (const currentPath of paths)
            try {
                let files = fs.readdirSync(`${currentPath}/.booster`);
                files = files.filter((file) => {
                    return path.extname(file) === ".ts";
                });
                files = files.map((file) => {
                    return file.replace('.ts', '');
                });
                templates.push(...files);
            // tslint:disable-next-line:no-empty
            } catch (e) { }
        templates = templates.filter((elem, index, self) => {
            return index === self.indexOf(elem);
        });
        this.templates = templates;
        return this.templates;
    }
}
