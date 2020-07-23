#!/bin/bash

npm version patch

echo "building..."
yarn build

cd dist

echo "packing..." 
npm pack

echo "publishing..."
npm publish