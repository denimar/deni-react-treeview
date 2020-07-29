const path = require('path');

module.exports = {
  addons: [
    '@storybook/addon-notes/register'
  ],
  stories: ['../src/examples/**/*.stories.tsx'],
  webpackFinal: async (config, par1, par2, par3) => {
    // add typescript support
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader')
        },
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'typescript' },
        },        
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    // add scss support
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};