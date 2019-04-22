import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import { IConfig, defaultConfig } from './IConfig';
import * as fs from 'fs';

@booster()
export default class Config {

    private config: IConfig;

    constructor(
        private pathHandler: PathHandler
    ) {
        this.config = defaultConfig;
    }

    public getConfig(): IConfig {
        return this.config;
    }

    public handler() {
        let config: IConfig = null;
        const paths = [
            this.pathHandler.getProjectPath(),
            this.pathHandler.getRootPath()
        ];

        for (const currentPath of paths) {
            try {
                const file = fs.readFileSync(`${currentPath}/.booster/config.json`)
                .toString('utf-8');
                config = JSON.parse(file);
            // tslint:disable-next-line:no-empty
            } catch (e) { }
            if (config != null) {
                this.parseConfig(config);
                return;
            }
        }
    }

    private parseConfig(config: object) {
        for (const key in config)
            if (config.hasOwnProperty(key))
                this.config[key] = config[key];
    }
}
