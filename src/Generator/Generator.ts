import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import { Commands } from '../Commands/Commands';
import Config from '../Config/Config';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';

@booster()
export default class Generator {

    constructor(
        private pathHandler: PathHandler,
        private commands: Commands,
        private config: Config
    ) { }

    public handler(): number {
        const options = this.commands.getOptions();
        const templates = this.commands.getTemplates();
        const base = this.pathHandler.getProjectPath();
        const root = this.config.getConfig().root;
        const templateName = getTemplate(options.rawArgs);
        const name = getTemplateName(options.rawArgs, templateName);
        for (const template of templates)
            if (templateName.toLowerCase() === template.toLowerCase()) {
                const fileName = path.basename(name);
                let file = this.getTemplates(template);
                const dest = this.config.getTemplatePath(template);
                const injectFile = this.getInjectFile(root, dest, name);
                file = file.replace(/__NAME__/g, fileName);
                file = file.replace(/__SOURCE__/g, injectFile);
                fse.mkdirpSync(`${base}/${dest}/${name}`);
                fs.writeFileSync(
                    `${base}/${dest}/${name}/${fileName}.ts`,
                    file
                );
                console.log(`Generated ${template.toLowerCase()} ${name}`);
                return 0;
            }
        return 1;
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

    private getInjectFile(dest, baseFile, fileName) {
        const base = path.join(this.pathHandler.getProjectPath(), dest);
        return path.relative(`${baseFile}/${fileName}`, base);
    }

}

const getTemplate = (args: Array<string>, offset = 2) => {
    let index = -1;
    for (const arg of args) {
        index += 1;
        if (index < offset)
            continue;
        if (arg[0] !== '-' && arg[1] !== '-')
            return arg;
    }
    return null;
};

const getTemplateName = (args: Array<string>, template: string) => {
    let index = -1;
    for (const arg of args) {
        index++;
        if (arg === template)
            return args[index + 1] || null;
    }
    return null;
};
