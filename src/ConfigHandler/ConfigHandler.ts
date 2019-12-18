
/**
 * IConfig
 * @description Interface for a booster config file
 */
export interface IConfig {
    /** Source Code Root foler */
    root: string;
    /** Whether Generator should use the previous system */
    oldGenerator?: string;
    /** Extra Options */
    [key: string]: string;
}

/**
 * Config Handler
 * @description Class to handle user Config
 */
export class ConfigHandler {

    /** Default Booster Config */
    private config: IConfig = {
        root: 'src/'
    };

    constructor(
        private path: string
    ) {
        try {
            this.config = {...this.config, ...require(this.path)};
        } catch (e) {
            if (e.name === "SyntaxError")
                throw Error("Invalid Booster Config File");
        }
    }

    /**
     * getConfig
     * @description Returns User Config found
     */
    public getConfig(): IConfig {
        return this.config;
    }

}
