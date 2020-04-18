const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const addProductionHash = require('./site/helpers/addProductionHash');

const rootDir = path.resolve(__dirname);

const config = (isProduction, defaultConfig) => ({
  ...defaultConfig,

  entry: {
    index: path.resolve(rootDir, 'site', 'index.js')
  },

  output: {
    path: path.resolve(rootDir, 'build'),
    filename: addProductionHash('[name].js', isProduction),
    publicPath: '/'
  },

  resolve: {
    // we have to specify absolute path to node modules
    // because we want to be able to take index entry from non-project directory
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    extensions: ['.mjs', '.js', '.svelte', '.json'],
    alias: {
      // something strange happen without thins line and with `npm link pik-arenda-landings-ui-kit`
      // webpack uses svelte from `pik-arenda-landings-ui-kit` node modules
      // do not touch this line, bro... okay????
      svelte: path.resolve(__dirname, 'node_modules', 'svelte')
    }
  },

  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules\/(?!svelte)/,
        use: [
          {
            loader: 'svelte-loader',
            options: {
              preprocess: require('svelte-preprocess')({ postcss: true }),
              emitCss: true,
              hotReload: true,
              dev: !isProduction
            }
          }
        ]
      },
      {
        test: [/\.css$/, /\.pcss$/],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
      },
      {
        loader: 'file-loader',
        test: [
          /\.svg$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.woff2$/,
          /\.woff$/,
          /\.ttf$/,
          /\.eot$/
        ],
        options: {
          name: addProductionHash('[name].[ext]', isProduction)
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: addProductionHash('[name].css')
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html'
    })
  ],

  devServer: {
    publicPath: '/',
    overlay: true,
    compress: true,
    historyApiFallback: {
      disableDotRule: true
    }
  }
});

module.exports = (_, { mode }) => {
  const isProduction = mode === 'production';
  return config(isProduction);
};
