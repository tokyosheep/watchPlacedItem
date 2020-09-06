"use strict";
const mode = "development";
//const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const enabledSourceMap = mode === "development";
const path = require("path");

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: mode,
    devtool:"source-map",
    optimization:{
      minimizer:[
          new TerserPlugin({
              extractComments: "all",
              sourceMap: true,
              terserOptions:{
                  compress:{
                      drop_console:true,//production modeでconsole.log消えます
                  }
              }
          }),
      ],
    },
    //externals:[nodeExternals()],
    externals: {
      fsevents: "require('fsevents')"
    },
    target:"node",
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: "./src/js/main.tsx",
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/src`,
      // 出力ファイル名
      filename: "main.min.js"
    },
    context:path.join(__dirname,"src/js"),
    entry:{main:"./main"},
    module: {
      rules: [
        {
          // 拡張子 .ts もしくは .tsx の場合
          test: /\.tsx?$/,
          // TypeScript をコンパイルする
          use: "ts-loader"
        },
        {
          test:/\.scss/,
          use:[
            {
                loader:MiniCssExtractPlugin.loader,
            },
            {
                loader:"css-loader",
                options:{
                    url:false,
                    sourceMap:enabledSourceMap
                }
            },
            {
                loader:"postcss-loader",
                options:{
                  sourceMap:enabledSourceMap,
                  plugins:[
                    require("autoprefixer")({
                      grid:true
                    })
                  ]
                }
            },
            {
              loader:"sass-loader",
              options:{
                sourceMap:enabledSourceMap
              }
            }
          ]
        }
      ],
    },
    // import 文で .ts や .tsx ファイルを解決するため
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    plugins:[
      new MiniCssExtractPlugin({
        filename:"dist/styleMin.css",
      })
    ]
  };