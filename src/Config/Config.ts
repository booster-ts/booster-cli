import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import { IConfig, defaultConfig } from './IConfig';
import * as fs from 'fs';
import { join } from 'path';

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
            config = null;
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

    public getTemplatePath(templateName: string) {
        const config = this.getConfig();
        const path = getParameterCaseInsensitive(config, templateName);
        if (path)
            return join(config.root, path);
        return config.root;
    }

    private parseConfig(config: object) {
        for (const key in config)
            if (config.hasOwnProperty(key))
                this.config[key] = config[key];
    }
}

/**
 * getParameterCaseInsensitive
 * @description Finds key in object (case insensitive)
 * @param object where to find key
 * @param key to find
 */
const getParameterCaseInsensitive = (object, key) => {
    return object[Object.keys(object)
      .find((k) => k.toLowerCase() === key.toLowerCase())
    ];
};
