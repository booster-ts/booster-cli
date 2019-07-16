import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import * as fs from 'fs';
import { execSync, exec } from 'child_process';
import { IPackage } from './IPackage';
import { Spinner } from 'clui';
import chalk from 'chalk';

@booster()
export default class Creator {

    private loadingBar: Spinner;

    constructor(
        private pathHandler: PathHandler
    ) {
        this.loadingBar = new Spinner('Initializing CLI', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
    }

    /**
     * handler
     * @async
     * @description Handler from creating Project
     * @param projectName to create
     */
    public async handler(projectName: string) {
        this.loadingBar.start();
        this.loadingBar.message(chalk.yellow(`Creating Project ${projectName}`));
        const currentPath = this.pathHandler.getCurrentPath();
        this.createFolder(projectName);
        process.chdir(projectName);
        await this.setupProject();
        await this.installModules();
        await this.setupFiles();
        await this.updatePackage();
        process.chdir(currentPath);
        this.loadingBar.stop();
        console.log(chalk.green(`Done Creating Project ${projectName}`));
    }

    /**
     * setupProject
     * @description Initialize Project
     */
    private async setupProject() {
        await this.run("git init");
        await this.run("npm init -y");
    }

    /**
     * installModules
     * @async
     * @description Methods that downloads all modules needed
     */
    private async installModules() {
        this.loadingBar.message(chalk.yellow(`Installing Node Modules `));
        await this.run("npm i @booster-ts/core --save");
        await this.run("npm i typescript --save");
    }

    /**
     * setupFiles
     * @async
     * @description Setup files
     */
    private async setupFiles() {
        this.loadingBar.message(chalk.yellow(`Applying Booster Magic  `));
        this.createFolder("./src");
        fs.copyFileSync(
            `${this.pathHandler.getRootPath()}/ressources/tsconfig.json`, "./tsconfig.json"
        );
        fs.copyFileSync(`${this.pathHandler.getRootPath()}/ressources/app.ts`, "./src/app.ts");
        fs.copyFileSync(
            `${this.pathHandler.getRootPath()}/ressources/injector.ts`, "./src/injector.ts"
        );
    }

    /**
     * updatePackage
     * @description Update Package file
     */
    private async updatePackage() {
        const buffer = fs.readFileSync(`./package.json`).toString('utf-8');
        const packageFile = JSON.parse(buffer) as IPackage;

        packageFile.main = "./dist/app.js";
        packageFile.homepage = "";
        packageFile.scripts = {
            start: "node ./dist/app.js",
            build: "tsc"
        };
        fs.writeFileSync(`./package.json`, JSON.stringify(packageFile, null, 4));
    }

    private createFolder(folderName: string) {
        if (!fs.existsSync(folderName))
            fs.mkdirSync(folderName);
    }

    private run(command: string): Promise<void> {
        return new Promise((resolve, reject) => {
            exec(command)
            .on('exit',  (code) => {
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
        });
    }
}
