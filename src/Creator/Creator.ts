import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import * as fs from 'fs';
import { execSync, exec } from 'child_process';
import { IPackage } from './IPackage';

@booster()
export default class Creator {

    constructor(
        private pathHandler: PathHandler
    ) { }

    public handler(projectName: string) {
        const currentPath = this.pathHandler.getCurrentPath();
        fs.mkdirSync(projectName);
        process.chdir(projectName);
        execSync("git init");
        execSync("npm init -y");
        execSync("npm i @booster-ts/core --save");
        execSync("npm i typescript --save");
        fs.mkdirSync("./src");
        fs.copyFileSync(
            `${this.pathHandler.getRootPath()}/ressources/tsconfig.json`, "./tsconfig.json"
        );
        fs.copyFileSync(`${this.pathHandler.getRootPath()}/ressources/app.ts`, "./src/app.ts");
        fs.copyFileSync(
            `${this.pathHandler.getRootPath()}/ressources/injector.ts`, "./src/injector.ts"
        );
        this.updatePackage();
        process.chdir(currentPath);
    }

    private updatePackage() {
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
}
