import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import { Commands } from '../Commands/Commands';
import Config from '../Config/Config';
import * as fs from 'fs';
import * as path from 'path';

@booster()
export default class Generator {

    constructor(
        private pathHandler: PathHandler,
        private commands: Commands,
        private config: Config
    ) { }

    public handler() {
        const options = this.commands.getOptions();
        const templates = this.commands.getTemplates();
        let fileName: string;

        templates.forEach((template) => {
            if (options[template]) {
                fileName = path.basename(options[template]);
                let file = this.getTemplates(template);
                const dest = this.config.getConfig().root;
                file = file.replace(/__NAME__/g, fileName);
                fs.mkdirSync(`${this.pathHandler.getProjectPath()}/${dest}/${fileName}`);
                fs.writeFileSync(
                    `${this.pathHandler.getProjectPath()}/${dest}/${fileName}/${fileName}.ts`,
                    file
                );
                console.log(`Generate ${template} ${fileName}`);
            }
        });
    }

    private getTemplates(type: string) {
        const paths = [
            this.pathHandler.getProjectPath(),
            this.pathHandler.getRootPath()
        ];
        let file: string = "";

        for (const currentPath of paths)
            try {
                file = fs.readFileSync(`${currentPath}/.booster/${type}.ts`).toString('utf-8');
            // tslint:disable-next-line:no-empty
            } catch (e) { }
        return file;
    }

}
