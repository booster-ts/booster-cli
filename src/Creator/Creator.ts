import env = require("yeoman-environment");

/**
 * ICreatorOptions
 * @description Options when creating a new Project
 */
export interface ICreatorOptions {
    /** Project Name */
    name: string;
    /** Flags passed from CLI */
    flags?: Array<string>;
}

export class Creator {

    private env: env;

    constructor() {
        this.env = env.createEnv();
    }

    /**
     * handler
     * @description Handler to create new Project
     * @param options Project Options
     */
    public async handler(options: ICreatorOptions): Promise<void> {
        this.env.registerStub(require('./default-creator/default-creator'), 'default');
        return new Promise((resolve, reject) => {
            this.env.run('default', options, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
}
