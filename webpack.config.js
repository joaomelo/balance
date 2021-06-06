const path = require('path');
const { DefinePlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const dotenv = require('dotenv');
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
  if (envArgs.prodLocal) return 'prodLocal';
  if (envArgs.prodCi) return 'prodCi';
  if (envArgs.devCi) return 'devCi';
  return 'devLocal';
}

function createEnvVariablesPlugin (environment) {
  if (environment.toLowerCase().includes('local')) {
    pushEnvVarsToMemory('.env');
  }

  const appEnvVars = pullEnvVarsFromMemory();
  const envVarsWithEmulatorsTreated = treatEmulatorsEnvVars(environment, appEnvVars);
  const envVarsStringified = stringifyEnvVars(envVarsWithEmulatorsTreated);

  return new DefinePlugin(envVarsStringified);
};

function pushEnvVarsToMemory (file) {
  const envFile = path.resolve(process.cwd(), file);
  dotenv.config({ path: envFile });
}

function pullEnvVarsFromMemory (filter) {
  return Object
    .keys(process.env)
    .reduce((acc, key) => {
      if (key.includes('APP_ENV_')) {
        acc[key] = process.env[key];
      }
      return acc;
    }, {});
}

function treatEmulatorsEnvVars (environment, envVars) {
  if (environment.toLowerCase().includes('dev')) {
    return envVars;
  }

  return Object
    .entries(envVars)
    .reduce((acc, [key, value]) => {
      acc[key] = key.includes('EMULATOR') ? null : value;
      return acc;
    }, {});
}

function stringifyEnvVars (envVars) {
  return Object.entries(envVars).reduce((acc, [key, value]) => {
    acc[`process.env.${key}`] = JSON.stringify(value);
    return acc;
  }, {});
}
