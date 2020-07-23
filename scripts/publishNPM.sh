#!/bin/bash
npm version patch
yarn build
pwd
cd dist
pwd
npm pack
npm publish