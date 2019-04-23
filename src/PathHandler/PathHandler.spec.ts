import { Injector } from '@booster-ts/core';
import { PathHandler } from './PathHandler';

describe("PathHandler", () => {

    let injector: Injector;
    let pathHandler: PathHandler;

    describe("getRootPath", () => {

        beforeEach(() => {
            injector = new Injector();
            pathHandler = injector.inject(PathHandler);
        });

        it("Should get Package path", () => {
            expect(pathHandler.getRootPath()).toBe(process.cwd());
        });

    });

    describe("getCurrentPath", () => {

        beforeEach(() => {
            injector = new Injector();
            pathHandler = injector.inject(PathHandler);
        });

        it("Should get Current path", () => {
            expect(pathHandler.getCurrentPath()).toBe(process.cwd());
        });

    });

    describe("getProjectPath", () => {

        beforeEach(() => {
            injector = new Injector();
            pathHandler = injector.inject(PathHandler);
        });

        it("Should get project path", () => {
            expect(pathHandler.getProjectPath()).toBe(process.cwd());
        });

        it("Should get project path after searching parent folder", () => {
            jest.spyOn(pathHandler, 'getCurrentPath').mockReturnValue(__dirname);
            expect(pathHandler.getProjectPath()).toBe(process.cwd());
        });

        it("Should fail to get project path", () => {
            jest.spyOn(pathHandler, 'getCurrentPath').mockReturnValue(__dirname);
            expect(pathHandler.getProjectPath(1)).toBe(__dirname);
        });

    });

});
