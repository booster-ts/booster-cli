# Templates

We will now see how to create templates, template make it easier to create different kinds of class.
For example you might own class to handle HTTP routes on the endpoint /User and the a class that handles handling data.

## Creating a new template

Templates should be stored in the .booster folder at the the root of the booster project. The name of the template will be the name the file which contains the template.

```ts
import { booster } from '@booster-ts/core';
import inject from '__SOURCE__/injector';

@booster()
export default class __NAME__ {

    constructor() { }
}
```

Here the template for template class.

When creating a new class from the cli, the cli will automatically fill the \_\_Variables\_\_.
The \_\_SOURCE\_\_ variable will be changes the path of the injector file.
the \_\_NAME\_\_ will change to the name give as argument to the cli.

Notes:
 - template names are case insensitive, which means
 ```sh
 $ boost template ClassA
 ```
 is the same as
 ```sh
 $ boost Template ClassA
 ```


## Templates Options

You may want to set options to a template. For example specify the default location of a template. For this you will need to change (or create if missing) the config.json file in the .booster folder.

For example if you created the template Service and you want the default location for creation to be `/src/Services`
you will need to have a config file similar to.
```json
{
    "root": "/src", //The Root Folder of the booster source files
    "Service": "Services/"
}
```