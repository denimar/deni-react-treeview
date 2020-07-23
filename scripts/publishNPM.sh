#!/bin/bash

npm version patch

echo "building..."
yarn build

cd dist

echo "packing..." 
npm pack

npm login

pwd
sleep 10

echo "publishing..."
npm publish