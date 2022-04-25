const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  // 1. entry 입력을 받고, 
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    compress: true,
    port: 9999,
  },
  
  // 2. entry 에서 입력받은 값으로 module 에서 필요한 처리를 하고 (Es5 로 변환해주는 트랜스 파일러)
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },

  // 3. module 에서 변환된 파일에 필요한 플러그인 추가 (console.log, 주석을 제거해주는 등)
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack & babel setting',
      template: 'index.html'
    })
  ]
}