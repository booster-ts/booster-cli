import { EOL } from "os";
import chalk = require('chalk');
import { PathHandler } from "../PathHandler/PathHandler";
import { join } from "path";

export class Info {

    private info = require("../../package.json");
    private pathHandler: PathHandler;

    constructor() {
        this.pathHandler = new PathHandler();
    }

    public async handler() {
        const cliVersion = this.info.version;
        console.log(`${EOL}Booster Info:${EOL}`);
        console.log(`\tCLI\t: ${chalk.grey(cliVersion)}`);
        this.displayBoosterCoreVersion();
        this.displayCreatorVersion();
        console.log();
    }

    private displayBoosterCoreVersion() {
        try {
            const lockPath = join(
                this.pathHandler.getProjectPath(),
                'package-lock.json'
            );
            const lock = require(lockPath);
            const coreVersion = lock.dependencies['@booster-ts/core'].version;
            console.log(`\tCore\t: ${chalk.grey(coreVersion)}`);
        } catch (e) {
            console.log(`\tCore\t: ${chalk.grey("❌  Not In Booster Project")}`);
        }
    }

    private displayCreatorVersion() {
        try {
            const packagePath = join(
                this.pathHandler.getProjectPath(),
                'package.json'
            );
            const packageInfo = require(packagePath);
            const creatorName = this.findCreatorName(packageInfo['booster']);
            if (!creatorName) {
                console.log(`\tCreator\t: ${chalk.grey("❌  No Project-Creator found")}`);
                return;
            }
            const creatorVersion = packageInfo['booster'][creatorName];
            console.log(`\tCreator\t: ${chalk.grey(`${creatorName}(${creatorVersion})`)}`);
        } catch (e) {
            console.log(`\tCreator\t: ${chalk.grey("❌  Not In Booster Project")}`);
        }
    }

    private findCreatorName(boosterInfo: object): string {
        for (const key in boosterInfo) {
            if (key.match(/\w*-creator/))
                return key;
        }
        return null;
    }

}
