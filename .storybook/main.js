const path = require('path');

module.exports = {
  addons: ['@storybook/addon-storysource/register'],
  stories: ['../src/examples/**/*.stories.tsx'],
  webpackFinal: async (config, { configType }) => {
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