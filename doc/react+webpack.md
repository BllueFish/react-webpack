# react+webpack4搭建前端项目

## 初始化项目

1. 创建package.json，执行npm init一路按enter键就搞定了
2. 安装webpack基本包： npm install --D webpack webpack-dev-server webpack-cli
3. 新建src/index.js，随便写几行代码吧
4. 在package.json执行脚本(scripts)添加"build":"webpack"。
   在终端执行npm run build，可以看到在根目录生成了dist/main.js的打包文件，这是webpack4.x打包默认找src/index.js打包入口
   > 其他具体用法查看：[webpack官方文档](https://www.webpackjs.com/configuration/output/#output-publicpath)


## 配置webpack

1. 项目根目录创建build目录，创建webpack.config.js，基本配置如下：
const path = require("path");

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    // 指定构建环境  
    mode:"development",
    // 入口
    entry: {
        app: "./src/index" 
    },
    // 出口
    output: {
        path : resolve("../dist"),
        filename: "js/[name].[hash].js",
        publicPath: "/" // 打包后的资源的访问路径前缀
    },
    // 模块
    module:{

    },
    // 插件
    plugins:[

    ],
    // 开发环境本地启动的服务配置
    devServer: {

    }
}

2. 编写，配置html模板，实现html模板的打包，安装插件：npm install -D html-webpack-plugin
3. 在根目录创建index.html模板，代码如下：
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>mydemo</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

4. 在webpack.config.js的plugins添加
new HtmlWebpackPlugin({
    filename: resolve('./../dist/index.html'), // html模板的生成路径
    template: 'index.html',//html模板
    inject: true, // true：默认值，script标签位于html文件的 body 底部
    hash: true, // 在打包的资源插入html会加上hash
    //  html 文件进行压缩
    minify: {
        removeComments: true,               //去注释
        collapseWhitespace: true,           //压缩空格
        removeAttributeQuotes: true         //去除属性引用
    }
})

5.修改package.json的build命令为指定配置文件构建打包"build": "webpack --config build/webpack.config.js"，然后再次执行npm run build，这时候已经可以把html模板和打包后的资源插入到html模板，最后打包进dist目录



## 区分开发环境和生产环境

1. 安装插件:npm install -D webpack-merge。这个插件用来合并webpack配置，可以对不同文件的webpack配置合并成一个完整的webpack配置
2. utils.js是webpack配置用的工具方法
3. webpack.base.config.js是webpack在不同环境的公共配置 
4. webpack.dev.config.js是项目开发环境的配置
5. webpack.prod.config.js是项目生产环境环境的配置


## 配置开发环境webpack.dev.config.js

1. 添加package.json命令，用webpack-dev-server启动服务。
    执行npm run dev启动服务，默认端口8080，服务的根目录是项目的根目录。
    但是这种方式没有指定配置文件启动，所以改为： "start": "webpack-dev-server --inline --progress --config build/webpack.dev.config.js"，浏览器打开 http://localhost:8080 即可看到我们的demo

2. 丰富webpack-dev-server配置，在devServer属性下添加开发环境启动服务的配置
    devServer: {
        historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
        hot: true,
        contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        compress: true, // 一切服务都启用gzip 压缩：
        port: "8081", // 指定段靠谱
        publicPath: "/", // 访问资源加前缀
        proxy: {
            // 接口请求代理
        },

    }
    这时仔修改src/index.js，浏览器会热更新


    ## 引入react框架

    1. 安装：npm install -S react react-dom
    2. 支持react打包编译
        - 安装、配置babel
        npm install -D @babel/core @babel/preset-env @babel/preset-react 
        npm install -D @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2
        
        > * @babel/core babelbabel的核心库
        > * @babel/preset-env 把es6,es7语法转换成es5。bebel7以上的版本只用这一个预设包就可以实现语法的转换
        > * @babel/preset-react 把react语法转换为es5
        > * @babel/plugin-transform-runtime 支持一些es6，es7的新语法

        - 添加babel配置，在根目录创建.babelrc，配置内容如下：
        {
            "presets": [
                ["@babel/preset-env", {
                "modules": false,
                "targets": {
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                }
                }],
                "@babel/preset-react"
            ],
            "plugins": [
                ["@babel/plugin-transform-runtime",{
                "corejs": 2, // polyfill 需要使用@babel/runtime-corejs2
                "useBuildIns":"usage", //按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
                }]
                
            ]
        }

        - webpack4.x配置编译打包规则
            > * 安装loaders：babel-loader使用babel进行编译项目、style-loader，css-loader编译css文件、url-loader file-loader引入文件路径（图片，字体）、less-loader less 识别less文件
            > * 在webpacl.base.config.js添加打包编译构建规则，在module下添加rules属性：
            rules:[
                {
                    test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                    exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                    loader: 'babel-loader',//loader的名称（必须）
                },
                {
                    test: /\.css$/,
                    use:[
                        {
                            loader: 'style-loader', // 创建 <style></style>
                        },
                        { 
                            loader: 'css-loader',  // 转换css
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                        loader: 'style-loader', 
                        },
                        {
                        loader: 'css-loader',
                        },
                        {
                        loader: 'less-loader', // 编译 Less -> CSS
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                        name: 'static/img/[name].[hash:7].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                        name: 'static/fonts/[name].[hash:7].[ext]'
                    }
                }
            ]
            > * 继续在webpack.base.config.js添加
            resolve: {
                extensions: ['.js', '.json'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
                alias: {
                    '@': path.join(__dirname, '..', "src") // 在项目中使用@符号代替src路径，导入文件路径更方便
                }
            }
        
        - 编写页面运行项目，测试打包



