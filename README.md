# deni-react-treeview

A modern, themable and configurable treeview for React

- Typescript
- Rollup
- Prettier
- ESLint
- StyleLint
- Storybook
- SCSS
- Jest
- React Testing Library

## Setup

1. Edit the `package.json` file. Set you app's name, description, version, author, homepage, bugs, and repository fields with the correct information.
1. Run `yarn` to add all the project's dependencies.

## Folder Structure

```
├── .storybook
|   ├── main.js
├── coverage
├── dist
├── mocks
|   ├── styleMock.js
├── node_modules
├── scripts
|   ├── postBuild.js
├── src
│   ├── components
|   |   ├── Example
|   |   ├── index.ts
|   ├── index.ts
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── jest.config.js
├── LICENSE
├── package.json
├── README.md
├── rollup.config.js
├── stylelint.config.js
├── tsconfig.json
```

## Add a new component

- add the new component directory in the `src/components` directory following this folder structure

```
├── MyComponent
|   ├── index.ts
|   ├── MyComponent.scss
|   ├── MyComponent.stories.tsx
|   ├── MyComponent.tsx
|   ├── __tests__
|   |   ├── MyComponent.test.tsx
```

Once you have created your new component make sure you have exported it in the `src/components/index.ts` file. Doing so allows the component to be compiled into the final bundle using rollup.

```
// src/components/index.ts
export * from './MyComponent';
export * from './SomeOtherComponent';
```

You can develope your new component using storybook as your playground. Once you have added the `.stories.tsx` file for you new component, you can run `yarn storybook` to start the service.

## Tests

```
$ yarn test
```

With coverage

```
$ yarn test:coverage
```

Watch

```
$ yarn test:watch
```

## Prettier

```
$ yarn format
```

Validate project formatting

```
$ yarn format:check
```

## Lint

```
$ yarn lint
```

## Storybook

```
$ yarn storybook
```

## Building your library

```
$ yarn build
```

The build output will go into the `dist` directory

## Publishing your Library on NPM

Once you have created an account on NPM you will be able to publish your library using these commands

```
$ yarn build
$ cd dist
$ npm pack
$ npm publish
```

[Denimar de Moraes](http://github.com/denimar) (denimar@gmail.com) is a full-stack developper at the HBSis IT Solutions, Blumenau, Santa Catarina, Brazil.

[<img src="https://raw.githubusercontent.com/denimar/denibudget/master/linkedin-profile.png">](https://www.linkedin.com/in/denimar-moraes/?locale=en_US)