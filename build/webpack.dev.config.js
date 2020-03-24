const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = webpackMerge(baseWebpackConfig, {
    // 指定构建环境  
    mode: "development",
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: utils.resolve("./../dist/index.html"), // html模板的生成路径
            template: "index.html", //html模板
            inject: true, // script标签位于html文件的 body 底部
        })
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
        hot: true,
        open: true, // dev-server打开浏览器
        contentBase: [path.join(__dirname, "../dist"), path.join(__dirname, "../public")], //告诉服务器哪里提供静态文件
        compress: true, // 一切服务都启用gzip 压缩：
        host: "0.0.0.0",
        port: "8888", // 指定端口号
        publicPath: "/", // 访问资源加前缀
        disableHostCheck: true,  //dev-server默认是开发模式，默认无法通过远程服务访问，设置这个后就可以远程访问了
        // historyApiFallback: {    // 重写路径
        //     rewrites: [
        //         { from: /!^\/api/g, to: "/" }
        //     ]
        // },

        // proxy: {  // 接口请求代理
        //     "/bridgeApi": {
        // 		"target": "http://10.58.12.196:8091/",
        // 		"changeOrigin": true,
        // 		"pathRewrite": {
        // 			"^/bridgeApi": "/api"
        // 		},
        // 	},
        // }
    }
});
