import { execSync, exec } from "child_process";
import * as fs from 'fs';

describe("Functional Test 1", () => {

    let currentPWD;

    beforeAll(() => {
        currentPWD = process.cwd();
        process.chdir("testing");
    });

    it("Should have booster installed", () => {
        execSync("boost --help");
    });

    it("Should created new Project", (done) => {
        const cmd = exec('boost new project1');
        cmd.on('exit', (code) => {
            expect(code).toBe(0);
            expect(fs.existsSync("project1")).toBeTruthy();
            done();
        });
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
        execSync("boost g class service");
        expect(fs.existsSync("./src/service/service.ts")).toBeTruthy();
    });

    it("Should Display list of templates", () => {
        execSync("mkdir -p .booster");
        execSync("cp ../../.booster/class.ts .booster/router.ts");
        const out = execSync("boost g").toString();
        expect(out).toContain("route");
    });

    it("Create new Class with path as name", () => {
        execSync("boost g class Providers/Service");
        expect(fs.existsSync("./src/Providers/Service/Service.ts")).toBeTruthy();
    });

    it("Should read source folder from config", () => {
        const config = {
            root: './tmp'
        };
        fs.writeFileSync("./.booster/config.json", JSON.stringify(config));
        execSync("boost g class service");
        expect(fs.existsSync("./tmp/service/service.ts")).toBeTruthy();
    });

    it("Should read template source folder from config", () => {
        const config = {
            root: 'src/',
            class: 'template/'
        };
        fs.writeFileSync("./.booster/config.json", JSON.stringify(config));
        execSync("boost g class service1");
        expect(fs.existsSync("./src/template/service1/service1.ts")).toBeTruthy();
    });

    it("Should support template name as case insenstive", () => {
        execSync("boost g clAss service2");
        expect(fs.existsSync("./src/service2/service2.ts")).toBeTruthy();
    });

    it("Should exit with code 1 when template not found", (done) => {
        exec("boost g temmplate service3")
        .on('exit', (code) => {
            expect(code).toBe(1);
            done();
        });
    });

    it("Should use correct template", (done) => {
        execSync("mkdir -p .booster");
        execSync("cp ../../.booster/class.ts .booster/action.ts");
        execSync("cp ../../.booster/class.ts .booster/reaction.ts");
        const config = {
            root: './src',
            reaction: 'reaction/'
        };
        fs.writeFileSync("./.booster/config.json", JSON.stringify(config));
        const cmd = exec('boost g reaction name');
        cmd.stderr.on('data', console.log);
        cmd.stdout.on('data', console.log);
        cmd.on('exit', (code) => {
            expect(code).toBe(0);
            expect(fs.existsSync("./src/reaction/name/name.ts")).toBeTruthy();
            done();
        });
    });

    it("Should compile project", (done) => {
        jest.setTimeout(10000);
        const cmd = exec("npm run build");
        cmd.on('exit', (code) => {
            expect(code).toBe(0);
            done();
        });
    });

    afterAll(() => {
        process.chdir(currentPWD);
    });

});
