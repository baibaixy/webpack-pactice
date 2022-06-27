const path = require('path');

// module.exports = {
//   entry: './src/main.js', // 入口
//   output: {
//     path: path.resolve(__dirname, 'dist'), // 出口路径 绝对路径
//     filename: 'bundle.js', // 出口文件名
//   },
// };
// __dirname 可以用来动态获取当前文件所属目录的绝对路径
// /Users/maohuihui/Desktop/vue-base/code/day_01/03_webpack配置_修改入口和出口

// path.resolve(__dirname, "dist"),
// /Users/maohuihui/Desktop/vue-base/code/day_01/03_webpack配置_修改入口和出口/dist
// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
  mode: 'development',
  // ...省略其他代码
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 告诉webpack使用插件时, 以我们自己的html文件作为模板去生成dist/html文件
      filename: 'index.html', // 生成文件的名称
    }),
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(), // 删除的是ouput path 里配置的那个输出文件的文件夹
    // 默认情况下dist
  ],
  devServer: {
    port: 3000, // 端口号
    open: true,
  },
  module: {
    // loader 加载器 配置在这儿
    rules: [
      // loader的规则
      {
        test: /\.css$/, // 匹配所有的css文件
        // loader 执行的顺序： use数组里从右向左运行
        // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
        // 再用 style-loader 将样式, 把css插入到dom中
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/, // 匹配执行类型的文件
        // 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
        // 执行的顺序 less-loader css-loader style-loader
        // less-loader 先把less代码转换成css
        // css-loader 再把css代码转换成webpack 可以识别的js代码
        // style-loader 在把css代码插入到 dom中
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      //   {
      //     test: /\.(png|jpg|gif)$/i, // 匹配的图片
      //     // use: ['url-loader'],
      //     // url-loader 转换based64 直接插入
      //     // 不好的地方？？？based64 太大 如何解决

      //     // 对图片的大小进行限制
      //     // 配置limit, 超过 8 * 1024, 不转, file-loader复制, 随机名, 输出文件

      //     // file-loader 直接复制图片 到dist目录下， 并且改改对应图片的src
      //     use: [
      //       {
      //         // 对当前的loader 进行配置
      //         loader: 'url-loader',
      //         options: {
      //           limit: 8192, // 限制大小
      //         },
      //       },
      //     ],
      //   },
      {
        // 图片文件的配置(仅适用于webpack5版本)
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: 'asset', // 在导出一个 data URI 和发送一个单独的文件之间自动选择
        // 如果你设置的是asset模式
        // 以8KB大小区分图片文件
        // 小于8KB的, 把图片文件转base64, 打包进js中
        // 大于8KB的, 直接把图片文件输出到dist下

        // type: 'asset/resource' // 发送一个单独的文件并导出 URL
        // type: 'asset/inline' // 导出一个资源的 data URI
      },
      {
        // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font-[name].[hash:6][ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 预设:转码规则(用bable开发环境本来预设的)
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
};
