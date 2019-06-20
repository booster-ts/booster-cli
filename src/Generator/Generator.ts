import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import { Commands } from '../Commands/Commands';
import Config from '../Config/Config';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';

/**
 * Generator
 * @description Generates Files
 */
@booster()
export default class Generator {

    constructor(
        private pathHandler: PathHandler,
        private commands: Commands,
        private config: Config
    ) { }

    /**
     * handler
     * @description Handles creating file
     */
    public handler() {
        const options = this.commands.getOptions();
        const templates = this.commands.getTemplates();
        const base = this.pathHandler.getProjectPath();
        const root = this.config.getConfig().root;

        templates.forEach((template) => {
            if (options[template]) {
                const fileName = path.basename(options[template]);
                let file = this.getTemplates(template);
                const dest = this.config.getTemplatePath(template);
                const injectFile = this.getInjectFile(root, dest, options[template]);
                file = file.replace(/__NAME__/g, fileName);
                file = file.replace(/__SOURCE__/g, injectFile);
                fse.mkdirpSync(`${base}/${dest}/${options[template]}`);
                fs.writeFileSync(
                    `${base}/${dest}/${options[template]}/${fileName}.ts`,
                    file
                );
                console.log(`Generated ${template} ${options[template]}`);
            }
        });
    }

    /**
     * getTemplates
     * @description Get Template
     * @param type template type
     */
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

    /**
     * getInjectFile
     * @description Searches for inject file in project
     * @param dest root src folder
     * @param baseFile where template will be generated
     * @param fileName generated file name
     */
    private getInjectFile(dest, baseFile, fileName) {
        const base = path.join(this.pathHandler.getProjectPath(), dest);
        return path.relative(`${baseFile}/${fileName}`, base);
    }

}
