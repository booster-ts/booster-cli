#!/usr/bin/env bash

chown -R $(stat -c "%u:%g" /home/node/) /home/node
npm ci
npm run build
npm link
if command ; then
    echo "Boost Installed"
else
    echo "Failed to insall Boost"
    exit 1
fi
chown -R $(stat -c "%u:%g" /home/node/) /home/node
npm run test-func
