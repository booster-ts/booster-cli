import Generator = require("yeoman-generator");
import { join } from 'path';
import { EOL } from 'os';
import { Spinner } from 'clui';
import chalk = require('chalk');

const blue = chalk.blue;

module.exports = class extends Generator {

    private props = {};

    constructor(args, opts) {
        super(args, opts);
    }

    public prompting() {
        this.log(
            `${blue('Booster-TS')} Default Project Generator${EOL}`
        );

        const prompts = [ ];

        if (!this.options.name)
            prompts.push({
                type: 'input',
                name: 'projectname',
                message: 'Project name:',
                default: this.appname
            });

        return this.prompt(prompts).then((props) => {
            this.props = props;
            if (this.options.name)
                this.props['projectname'] = this.options.name;
        });
    }

    public writing() {
        this.log();
        this.sourceRoot(join(require.main.filename, '../..', 'templates/default'));
        this.fs.copyTpl(
            this.templatePath('**'),
            this.destinationPath(`${this.props['projectname']}`),
            this.props
        );
    }

    public async install() {
        return new Promise((resolve, reject) => {
            this.log(`${EOL}Installing dependencies${EOL}`);
            this.log(`> ${blue('npm i')}${EOL}`);
            const spinner = new Spinner("Installing Dependencies");
            spinner.start();
            this.spawnCommand(
                'npm', ['install'], {
                    cwd: this.destinationPath(`${this.props['projectname']}`),
                    stdio: null
                }
            )
            .on('exit', (code) => {
                spinner.stop();
                resolve();
            });
        });
    }

    public end() {
        this.log(`Next steps${EOL}`);
        this.log(
            `\t Goto to your new project directory ${blue(`cd ./${this.props['projectname']}`)}`
        );
        this.log(
            `\t Start editing ${blue('./src/app.ts')}`
        );
        this.log(
            `\t Run ${blue(`npm run build`)} and ${blue('npm start')} to run your project`
        );
        this.log('');
    }
};
