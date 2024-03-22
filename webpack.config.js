const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  //mode: "production",
  mode: production ? 'production' : 'development',
  stats: production ? 'normal' : 'minimal',
  entry: {
    homepage: ["./src/app.ts"],
    //aboutpage: ['./src/about.js']
    experience: ["./src/experience.ts"]
  },
  //devtool: "nosources-source-map",
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'docs'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   type: "asset/resource",
      //   generator: {
      //     filename: "[name][ext]",
      //   },
      // },
      // {
      //   test: /\.html$/i,
      //   loader: "html-loader",
      //   options: {
      //     minimize: {
      //       removeComments: false,
      //       collapseWhitespace: false,
      //     },
      //   },
      // },
      {
        //test: /\.tsx?$/,
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          //MiniCssExtractPlugin.loader,
          'style-loader', 
          'css-loader', 
          'postcss-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          //MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|png|jp?g|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:4][ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    //filename: "[name].js",
    // filename: '[name][contenthash].js',
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, "./docs"),
    clean: true, // clean the 'dist' directory before build
    assetModuleFilename: '[name][ext]',
  },
  optimization: {
    runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all'
    // }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    //new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Trang chủ',
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['homepage'],
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Kinh nghiệm làm việc',
      filename: 'experience.html',
      template: './src/experience.html',
      chunks: ['experience']
    }),
    new HtmlWebpackPlugin({ 
      title: "Abount Hieu Ocb",
      filename: 'about.html',
      template: "src/about.html",
      //chunks: ['aboutpage']
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { 
    //       from: "src/*.png", 
    //       to({ context, absoluteFilename }) {
    //         return Promise.resolve("docs/public/img/[name][ext]");
    //       },
    //     },
    //   ],
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   // filename: "vendor.js"
    //   // (Give the chunk a different name)

    //   minChunks: Infinity,
    //   // (with more entries, this ensures that no other module
    //   //  goes into the vendor chunk)
    // }),
    new Dotenv({
      path: './src/.env', // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      defaults: true, // load '../../path/to/other.env.defaults'
    })
  ],
};