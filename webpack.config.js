const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const PATHS = {
  SRC: path.resolve(__dirname, 'src'),
  BUILD: path.resolve(__dirname, 'dist')
};

module.exports = env => {
  const environment = establishEnvironment(env);
  const mode = environment.toLowerCase().includes('prod') ? 'production' : 'development';
  const isProd = mode === 'production';
  console.info(`Webpack build for environment "${environment}" with mode "${mode}"`);

  const envPlugin = createEnvVariablesPlugin(environment);

  return {
    target: 'web',
    mode,
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    entry: path.resolve(PATHS.SRC, 'main', 'index.js'),
    output: {
      publicPath: '/',
      path: PATHS.BUILD,
      filename: `[name]${isProd ? '.[contenthash]' : ''}.bundle.js`
    },
    devServer: {
      contentBase: PATHS.BUILD,
      historyApiFallback: true,
      hot: true,
      port: 8181
    },
    optimization: {
      // https://webpack.js.org/configuration/optimization/#optimizationmoduleids
      // deterministic option is useful for long term caching...
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    module: {

      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env'],
              envName: mode,
              ...!isProd && { plugins: [require.resolve('react-refresh/babel')] }
            }
          }
        },
        {
          test: [/\.css$/],
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      envPlugin,
      new ESLintPlugin({ extensions: ['js', 'jsx'], fix: true }),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        allowAsyncCycles: false,
        cwd: process.cwd()
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(PATHS.SRC, 'app', 'images'),
            to: path.resolve(PATHS.BUILD, 'public'),
            toType: 'dir'
          }
        ]
      }),
      new HtmlWebpackPlugin({ template: path.resolve(PATHS.SRC, 'main', 'index.html') }),
      ...isProd ? [] : [new ReactRefreshWebpackPlugin()]
    ]
  };
};

function establishEnvironment (envArgs) {
  if (envArgs.localProd) return 'prodLocal';
  if (envArgs.prodCi) return 'prodCi';
  return 'devLocal';
}

function createEnvVariablesPlugin (environment) {
  switch (environment) {
    case 'devLocal': return createPluginToLoadFromEnvDevFile();
    // case 'prodLocal': return createPluginReducingFromEnvDevFile();
    // case 'prodCi': return createPluginFromEnvInMemory();
    default: throw new Error(`unsupported environment "${environment}" for env var loading`);
  }
};

function createPluginToLoadFromEnvDevFile () {
  const envDevFile = path.resolve(process.cwd(), 'env-dev.env');
  const dotEnvPlugin = new Dotenv({ path: envDevFile });

  console.info(`attempting to inject env vars from "${envDevFile}" file using webpack plugin`);

  return dotEnvPlugin;
}

// function createPluginReducingFromEnvDevFile () {
//   console.info(`attempting to inject env vars reducing from "${envDevFile}" file using webpack plugin`);
//   const dotEnvPlugin = new Dotenv({ path: envDevFile });

//   // the removal of emulator env variable is relevant to the productions app
//   // since firebase node sdk automatically attempts connection to emulator host
//   // if variable is set
//   delete dotEnvPlugin.definitions['process.env.FIRESTORE_EMULATOR_HOST'];

//   return dotEnvPlugin;
// }

// function createPluginFromEnvInMemory () {
//   console.info('attempting to inject env vars from memory using webpack plugin');
//   const dotEnvPlugin = new webpack.DefinePlugin({
//     'process.env.SCALE_SERP_KEY': JSON.stringify(process.env.SCALE_SERP_KEY),
//     'process.env.SEND_GRID_KEY': JSON.stringify(process.env.SEND_GRID_KEY),
//     'process.env.DEFAULT_FROM_EMAIL': JSON.stringify(process.env.DEFAULT_FROM_EMAIL)
//   });
//   return dotEnvPlugin;
// }
