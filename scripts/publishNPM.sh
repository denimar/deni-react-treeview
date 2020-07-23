#!/bin/bash

npm version patch

echo "building..."
yarn build

cd dist

echo "packing..." 
npm pack

#npm login

echo "publishing..."
npm publish