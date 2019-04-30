import { Injector } from '@booster-ts/core';
import Config from './Config';
import { defaultConfig } from './IConfig';
import * as fs from 'fs';

describe("Config", () => {

    let injector: Injector;
    let config: Config;

    describe("getConfig", () => {

        beforeEach(() => {
            injector = new Injector();
            config = injector.inject(Config);
        });

        it("Should return default config", () => {
            expect(config.getConfig()).toEqual(defaultConfig);
        });

        it("Should return updated config", () => {
            const newConfig = {
                root: "app/"
            };
            config['parseConfig'](newConfig);

            expect(config.getConfig()).toEqual(newConfig);
        });

        // it("Should return updated config with new fields", () => {
        //     const expectedConfig: any = defaultConfig;
        //     expectedConfig.template = "./src/Template";
        //     const newConfig = {
        //         template: "./src/Template"
        //     };
        //     config['parseConfig'](newConfig);

        //     expect(config.getConfig()).toEqual(expectedConfig);
        // });

    });

    describe("Handler", () => {

        beforeEach(() => {
            injector = null;
            injector = new Injector();
            config = injector.inject(Config);
        });

        it("Should read config file", () => {
            const expectedConfig: any = defaultConfig;
            expectedConfig.template = "./src/Template";
            jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(expectedConfig));

            config.handler();
            expect(config.getConfig()).toEqual(expectedConfig);
        });
    });

});
