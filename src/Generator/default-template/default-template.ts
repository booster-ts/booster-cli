import Generator = require("yeoman-generator");
import { PathHandler } from "../../PathHandler/PathHandler";
import fs = require("fs");
import path = require("path");
import { ConfigHandler, IConfig } from "../../ConfigHandler/ConfigHandler";
import { EOL } from "os";

export default class extends Generator {

    private pathHandler = new PathHandler();
    private projectConfig: IConfig;
    private templateName: string;
    private fileName: string;
    private file: string;

    constructor(args, opts) {
        super(args, opts);

        this.file = opts.file;
        this.fileName = path.basename(opts.file);
        this.templateName = opts.template;
        this.projectConfig = new ConfigHandler(
            path.join(this.pathHandler.getProjectPath(), '.booster/config.json')
        ).getConfig();
    }

    public writing() {
        let options = {
            name: this.fileName,
            source: ''
        };
        options = {
            ...options,
            ...process.env
        };
        const templatePath = this.findTemplate();
        let destination = `./${this.projectConfig.root}`;
        destination = path.join(destination, this.projectConfig[this.templateName] || '');
        destination = path.join(destination, this.file);
        destination = path.join(destination, `${this.fileName}.ts`);
        options.source = this.getInjectFile(
            path.join(this.projectConfig.root, this.projectConfig[this.templateName] || ''),
            this.fileName
        );
        this.fs.copyTpl(
            templatePath,
            this.destinationPath(destination),
            options
        );
    }

    public end() {
        this.log(`${EOL}✅  ${this.templateName} ${this.fileName} was created`);
    }

    private findTemplate() {
        const paths = [
            path.join(this.pathHandler.getProjectPath(), '.booster'),
            path.join(this.pathHandler.getRootPath(), '.booster')
        ];
        const templateName = this.templateName.toLocaleLowerCase();

        for (const currentPath of paths) {
            if (!fs.existsSync(currentPath))
                continue;
            const templates = fs.readdirSync(currentPath);
            for (const file of templates)
                if (templateName.match((path.parse(file).name).toLocaleLowerCase())) {
                    const templatePath = path.join(currentPath, `${file}`);
                    return templatePath;
                }
        }
        throw new Error(`Template ${this.templateName} Not Found`);
    }

    private getInjectFile(baseFile, fileName): string {
        const dest = this.projectConfig.root;
        const base = path.join(this.pathHandler.getProjectPath(), dest);
        return path.relative(`${baseFile}/${fileName}`, base);
    }

}

export const getTemplates = (): Array<string> => {
    const pathHandler = new PathHandler();
    const paths = [
        path.join(pathHandler.getProjectPath(), '.booster'),
        path.join(pathHandler.getRootPath(), '.booster')
    ];
    const templates = [];

    for (const currentPath of paths) {
        if (!fs.existsSync(currentPath))
            continue;
        const files = fs.readdirSync(currentPath);
        templates.push(...files.filter(( file ) => {
            if (file.match(/.*\.(ts)/ig) && !templates.includes(file))
                return file;
        }));
    }
    return templates;
};
