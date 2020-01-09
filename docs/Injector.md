# Injector

When a new Project is created an *Injector* file is created.

## Inject

The *Injector* file exports *inject* which is variable which contains @booster-ts/core Container.

You can import *inject* anywhere to access to the container and use it.

## LoadFiles

> ⚠️ Can be unstable

The *Injector* file also exports *loadFiles*, this function will require all files in a directory. This can be usefull to register Classes whithout having to import them all.
