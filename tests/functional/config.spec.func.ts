import { execSync, exec } from 'child_process';
import fs = require("fs");

const project = "project2";

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

    it("Should support different source root", () => {
        const config = {
            root: 'source/'
        };
        fs.writeFileSync(`.booster/config.json`, JSON.stringify(config));

        execSync(`boost g class class1`);
        expect(fs.existsSync(`source/class1/class1.ts`));
    });

    it("Should support difference template root", () => {
        const config = {
            root: 'source/',
            class: 'class/'
        };
        fs.writeFileSync(`.booster/config.json`, JSON.stringify(config));

        execSync(`boost g class class1`);
        expect(fs.existsSync(`source/class/class1/class1.ts`));
    });

    it("Should match correct template", () => {
        const config = {
            root: 'source/',
            class: 'class/',
            action: 'action/',
            reaction: 'reaction/'
        };
        fs.writeFileSync(`.booster/config.json`, JSON.stringify(config));
        execSync("cp ../../.booster/class.ts .booster/action.ts");
        execSync("cp ../../.booster/class.ts .booster/reaction.ts");
        const out = execSync("boost g reaction name").toString();
        expect(fs.existsSync("./source/reaction/name/name.ts")).toBeTruthy();
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
