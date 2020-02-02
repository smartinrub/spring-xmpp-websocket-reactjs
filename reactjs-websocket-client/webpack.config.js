const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopmentMode = env.ENV === 'local' || 'staging';

  const devtool = isDevelopmentMode
    ? 'eval-source-map'
    : 'nosources-source-map';

  const moduleIdentifierPlugin = isDevelopmentMode
    ? new webpack.NamedModulesPlugin()
    : new webpack.HashedModuleIdsPlugin();

  // TODO: find a fix
  const publicPath = isDevelopmentMode ? '/' : './';

  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      filename: '[name].[hash].js',
      path: __dirname + '/dist',
      publicPath
    },
    devtool,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
      // clean before each build
      new CleanWebpackPlugin(),
      // generate the main "index" file and inject Script tags for the files
      // emitted by the compilation process.
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
        favicon: 'public/favicon.ico'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          ENV: JSON.stringify(env.ENV)
        }
      }),
      moduleIdentifierPlugin
    ],
    optimization: {
      splitChunks: {
        // Apply optimizations to all chunks, even initial ones (not just the
        // ones that are lazy-loaded).
        chunks: 'all'
      },
      runtimeChunk: 'single'
    },
    devServer: {
      historyApiFallback: true,
      port: 3000,
      stats: 'errors-only',
      overlay: true
    }
  };
};
