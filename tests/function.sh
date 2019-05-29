#!/usr/bin/env bash

chown -R $(stat -c "%u:%g" /home/node/) /home/node
npm ci
npm run build
npm i -g --only=production
boost --help
chown -R $(stat -c "%u:%g" /home/node/) /home/node
npm run test-func
