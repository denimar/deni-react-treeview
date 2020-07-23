#!/bin/bash

npm version patch

echo "building..."
yarn build

cd dist

echo "packing..." 
npm pack

pwd
sleep 10

echo "publishing..."
npm publish