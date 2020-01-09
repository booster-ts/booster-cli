# booster-cli

[![Build Status](https://api.travis-ci.com/booster-ts/booster-cli.svg?branch=master)](https://travis-ci.org/booster-ts/booster-cli)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/664ee35dd9094e4f9d06bd8a5eeb5817)](https://www.codacy.com/app/ImOverlord/booster-cli?utm_source=github.com&utm_medium=referral&utm_content=booster-ts/booster-cli&utm_campaign=Badge_Coverage)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/664ee35dd9094e4f9d06bd8a5eeb5817)](https://www.codacy.com/app/ImOverlord/booster-cli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=booster-ts/booster-cli&amp;utm_campaign=Badge_Grade)

CLI for Booster-ts

## Install

Booster-cli is available on npm.

```bash
$ npm i -g @booster-ts/cli
```

> ⚠️ The Documentation has been updated for Booster-TS CLI Version 0.3

## Getting Started

### Creating a new Project

```bash
$ boost new ProjectName
```

This will create a new project with all the dependencies needed to start.
You can start working on your app with the entry file *src/app.ts*.

You can now use the CLI to generate the class files

```bash
$ boost g
Available Templates:
  - class
```

Will display all templates available in the project, By Default the CLI commes with the *class* template.

```bash
$ boost g class FileName
```

This will generate a new Class in *src/FileName/FileName.ts* using the *class* template

Once the Class generated you can use it in *app.ts*.

```ts
import { inject } from './injector';
import { FileName } from './FileName/FileName.ts'

const class = inject.inject(FileName);

/** You Can now interact with the class */
```

For more information you can view the documentation for @booster-ts/core
