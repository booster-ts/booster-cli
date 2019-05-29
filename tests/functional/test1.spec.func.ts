import { execSync, exec } from "child_process";
import * as fs from 'fs';

describe("Function Test 1", () => {

    let currentPWD;

    beforeAll(() => {
        currentPWD = process.cwd();
        execSync("mkdir -p testing");
        process.chdir("testing");
    });

    it("Should have booster installed", () => {
        execSync("boost --help");
    });

    it("Should created new Project", () => {
        execSync("boost init project1 &> /dev/null");
        expect(fs.existsSync("project1")).toBeTruthy();
    });

    it("Should have the correct files", () => {
        process.chdir("project1");
        const list = [
            './src/app.ts',
            './src/injector.ts',
            './package.json',
            './tsconfig.json'
        ];
        for (const file of list)
            expect(fs.existsSync(file)).toBeTruthy();
    });

    it("Should create a new Class based of template", () => {
        execSync("boost template service");
        expect(fs.existsSync("./src/service/service.ts")).toBeTruthy();
    });

    it("Add new template", () => {
        execSync("mkdir -p .booster");
        execSync("cp ../../.booster/template.ts .booster/router.ts");
        const out = execSync("boost --help").toString();
        expect(out).toContain("route");
    });

    it("Create new Class with path as name", () => {
        execSync("boost template Providers/Service");
        expect(fs.existsSync("./src/Providers/Service/Service.ts")).toBeTruthy();
    });

    it("Should read source folder from config", () => {
        const config = {
            root: './tmp'
        };
        fs.writeFileSync("./.booster/config.json", JSON.stringify(config));
        execSync("boost template service");
        expect(fs.existsSync("./tmp/service/service.ts")).toBeTruthy();
    });

    it("Should read template source folder from config", () => {
        const config = {
            root: './src',
            template: './template'
        };
        fs.writeFileSync("./.booster/config.json", JSON.stringify(config));
        execSync("boost template service");
        expect(fs.existsSync("./src/template/service/service.ts")).toBeTruthy();
    });

    it("Should compile project", () => {
        execSync("npm run build");
    });

    afterAll(() => {
        process.chdir(currentPWD);
        execSync("rm -rf testing");
    });

});