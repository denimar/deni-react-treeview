#!/bin/bash
npm version patch
yarn build
cd dist
npm pack
npm publish