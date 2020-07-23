#!/bin/bash

npm version patch

echo "building..."
yarn build

cd dist

sleep 5

echo "packing..." 
npm pack

sleep 5

echo "publishing..."
npm publish