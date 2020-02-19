import { execSync, exec } from 'child_process';
import fs = require("fs");

const project = "project3";

describe("CLI Commands Test", () => {

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

    it("Should Display list of templates", () => {
        execSync("mkdir -p .booster");
        execSync("cp ../../.booster/class.ts .booster/router.ts");
        const out = execSync("boost g").toString();
        expect(out).toContain("route");
    });

    afterAll(() => {
        process.chdir(currentPWD);
    });

});
