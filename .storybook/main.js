const path = require('path');

module.exports = {
  stories: ['../src/examples/**/*.stories.tsx'],
  webpackFinal: async (config, { configType }) => {
    // add typescript support
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
      ],
      exclude: /node_modules/
    });
    config.resolve.extensions.push('.ts', '.tsx');

    // add scss support
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
      exclude: /node_modules/
    });

    config.externals = {
      'react': {
        root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        }
    }

    return config;
  },
};
