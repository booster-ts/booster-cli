import { booster } from '@booster-ts/core';
import { PathHandler } from '../PathHandler/PathHandler';
import { IConfig, defaultConfig } from './IConfig';
import * as fs from 'fs';
import { join } from 'path';

/**
 * Config
 * @desciptions Config Handler
 */
@booster()
export default class Config {

    /** Config */
    private config: IConfig;

    constructor(
        private pathHandler: PathHandler
    ) {
        this.config = defaultConfig;
    }

    /**
     * getConfig
     * @description Returns current config
     */
    public getConfig(): IConfig {
        return this.config;
    }

    /**
     * handler
     * @description Handles Config file
     */
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

    /**
     * getTemplatePath
     * @description Gets a specific template path
     * @param templateName to find
     */
    public getTemplatePath(templateName: string) {
        const config = this.getConfig();
        const path = config[templateName];
        if (path)
            return join(config.root, path);
        return config.root;
    }

    /**
     * parseConfig
     * @description Parse config
     * @param config to parse
     */
    private parseConfig(config: object) {
        for (const key in config)
            if (config.hasOwnProperty(key))
                this.config[key] = config[key];
    }
}
