# Migration

## Migrating from 0.2.2 to 0.3.0

In 0.3.0, EJS templating was added which doesn't work with previous system
(ex: `__NAME__` becomes `<%= name %>`). However the previous Generator can still be used. To use the previous generator, you will need to set a new setting in the .booster/config.json file `"oldGenerator": "yes"`. You will then be able to use the previous system `__NAME__`.
