import { booster } from '@booster-ts/core';
import * as path from 'path';
import * as fs from 'fs';

@booster()
export class PathHandler {

    /**
     * getRootPath
     * @description Returns CLI location
     */
    public getRootPath(): string {
        return path.join(__dirname, "../..");
    }

    /**
     * getCurrentPath
     * @description Returns current path where CLI was called from
     */
    public getCurrentPath(): string {
        return process.cwd();
    }

    /**
     * getProjectPath
     * @description Returns path to current project which used the CLI
     * @param ticks number of child it should check
     */
    public getProjectPath(ticks = 3): string {
        let currentPath = this.getCurrentPath();
        let ttl = ticks;

        while (ttl > 0) {
            if (this.isPackageHere(currentPath))
                return currentPath;
            currentPath = this.getParent(currentPath);
            ttl--;
        }
        return this.getCurrentPath();
    }

    /**
     * isPackageHere
     * @description Checks if path contains package.json
     * @param path where to look
     */
    private isPackageHere(currentPath: string): boolean {
        try {
            const files = fs.readdirSync(currentPath);

            for (const file of files)
                if (file === "package.json")
                    return true;
            return false;
        } catch (e) {
            return false;
        }
    }

    /**
     * getParent
     * @description Finds parent path
     * @param currentPath child path
     */
    private getParent(currentPath: string) {
        return path.resolve(currentPath, '..');
    }
}
