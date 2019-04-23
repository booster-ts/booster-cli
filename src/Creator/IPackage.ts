/**
 * Interface of a package.json
 */
export interface IPackage {
    name: string;
    version: string;
    description: string;
    main: string;
    scripts: any;
    repository: any;
    keywords: Array<string>;
    author: string;
    license: string;
    bugs: any;
    homepage: string;
    dependencies: any;
    devDependencies: string;
}
