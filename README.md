# booster-cli

[![Build Status](https://api.travis-ci.com/booster-ts/booster-cli.svg?branch=master)](https://travis-ci.org/booster-ts/booster-cli)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/664ee35dd9094e4f9d06bd8a5eeb5817)](https://www.codacy.com/app/ImOverlord/booster-cli?utm_source=github.com&utm_medium=referral&utm_content=booster-ts/booster-cli&utm_campaign=Badge_Coverage)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/664ee35dd9094e4f9d06bd8a5eeb5817)](https://www.codacy.com/app/ImOverlord/booster-cli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=booster-ts/booster-cli&amp;utm_campaign=Badge_Grade)

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