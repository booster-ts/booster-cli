# Templates

## Creating A New Template

The Booster CLI supports creating simple custom Templates.

To create a new template you will to create a new *.ts* file in the .booster folder, you might have to create it.

The name of the file should be the name of the template you want to create.

```ts
import { booster } from '@booster-ts/core';
import { inject } from '<%= source %>/injector';

@booster()
export class <%= name %> {

    constructor() { }
}
```

Here is the code for the default class template.

> ⚠️ As of CLI version 0.3, templates should use [EJS templating](https://ejs.co/) *<%= VAR_NAME %>*

Templates have access to certain Variables.

* name: Name of the file
* source: Relative path to the root of the source code (by defautlt source will be resolve to files in src/)
* ENV variables

> Run `$ boost generate` to view avaible templates

## Templates Options

At this time the only options avaible to template is specifing a default path on generation. Options need to be specified in the *config.json* file in the *.booster* folder

For example, if you have a template *Service* and you want all file using the Service template to be in the folder *Services/*, you should have a config file similar to this one.

```json
{
    "Service": "Services/"
}
```

