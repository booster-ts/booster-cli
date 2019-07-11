# booster-cli

https://api.travis-ci.com/booster-ts/booster-cli.svg?branch=master
[![Build Status](https://api.travis-ci.com/booster-ts/booster-cli.svg?branch=master)](https://travis-ci.org/booster-ts/booster-cli)

CLI for Booster

## Install

Booster-cli is available on npm

```sh
$ npm i -g @booster-ts/cli
```

## Getting Started

### Creating a new Project

```sh
$ boost init ProjectName
```

This will create a new project with all the dependencies needed to start.
You can start working on your app with the entry file *src/app.ts*.

You can now use the CLI to generate the class files

```sh
$ boost template FileName
```

This will generate a new Class in *src/FileName/FileName.ts*

Once the Class generated you can use in the *app.ts*.

```ts
import injector from './injector';
import FileName from './FileName/FileName.ts'

const class = injector.inject(FileName);

/** You Can now interact with the class */
```

For more information you can view the Wiki.