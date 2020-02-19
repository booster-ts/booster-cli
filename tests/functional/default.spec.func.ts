import { execSync, exec } from 'child_process';
import fs = require("fs");

const project = "project1";

describe("Config Test", () => {

    let currentPWD;

    beforeAll(() => {
        currentPWD = process.cwd();
        process.chdir("testing");
    });

    it("Should create new Project", (done) => {
        const cmd = exec(`boost new ${project}`);
        cmd.on('exit', (code) => {
            expect(code).toBe(0);
            expect(fs.existsSync(project)).toBeTruthy();
            process.chdir(project);
            done();
        });
    });

    it("Should create a new Class", () => {
        execSync("boost g class class1");
        expect(fs.existsSync("./src/class1/class1.ts")).toBeTruthy();
    });

    it("Should support multiple templates", () => {
        execSync("mkdir -p .booster");
        execSync("cp ../../.booster/class.ts .booster/route.ts");
        const out = execSync("boost g").toString();
        expect(out).toContain("route");
        execSync(`boost g route route1`);
        expect(fs.existsSync("./src/route1/route1.ts")).toBeTruthy();
    });

    it("Should support template name as case insenstive", () => {
        execSync("boost g clAss service2");
        expect(fs.existsSync("./src/service2/service2.ts")).toBeTruthy();
    });

    it("Create new Class with path as name", () => {
        execSync("boost g class Providers/Service");
        expect(fs.existsSync("./src/Providers/Service/Service.ts")).toBeTruthy();
    });

    it("Should build", (done) => {
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
