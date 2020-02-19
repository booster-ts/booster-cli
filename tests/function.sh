#!/bin/sh

docker image build -t boost-tests:1.0 . --no-cache
docker run -ti boost-tests:1.0 /bin/sh -c "npm run test:func -- --runInBand --testTimeout=10000"