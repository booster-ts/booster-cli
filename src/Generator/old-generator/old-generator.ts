import Generator = require("yeoman-generator");
import { PathHandler } from "../../PathHandler/PathHandler";
import fs = require("fs");
import path = require("path");
import { ConfigHandler, IConfig } from "../../ConfigHandler/ConfigHandler";
import { EOL } from "os";

module.exports = class extends Generator {

    private pathHandler = new PathHandler();
    private projectConfig: IConfig;
    private props = {};
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
            name: this.fileName
        };
        options = { ...options, ...process.env };
        const templatePath = this.findTemplate();
        let destination = `./${this.projectConfig.root}`;
        destination = path.join(destination, this.projectConfig[this.templateName] || '');
        destination = path.join(destination, this.file);
        destination = path.join(destination, `${this.fileName}.ts`);
        let template = this.fs.read(templatePath);
        template = template.replace(/__NAME__/g, this.fileName);
        template =
        template.replace(/__SOURCE__/g, this.getInjectFile(
            path.join(this.projectConfig.root, this.projectConfig[this.templateName] || ''),
            this.fileName
        ));
        this.fs.write(
            this.destinationPath(destination),
            template
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

        for (const currentPath of paths) {
            const templatePath = path.join(currentPath, `${this.templateName}.ts`);
            if (fs.existsSync(templatePath))
                return templatePath;
        }
        throw new Error(`Template ${this.templateName} Not Found`);
    }

    private getInjectFile(baseFile, fileName) {
        const dest = this.projectConfig.root;
        const base = path.join(this.pathHandler.getProjectPath(), dest);
        return path.relative(`${baseFile}/${fileName}`, base);
    }
}
