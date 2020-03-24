# react全家桶

## react-router-dom 管理路由

1. 安装：npm install -S react-router-dom
2. 编写路由代码
3. 在项目根目录新建static/css/reset.min.css(清除默认样式)，在index.html中引入文件。为了运行可以找到static/css/reset.min.css，需要把static目录的内容通过webpack插架 编译构建到包里，这需要安装copy-webpack-plugin。在webpack.base.config.js中添加公用的插件plugins，如下：
    plugins:[
        new CopyWebpackPlugin([
            {
                from: utils.resolve('../static'),  // 从哪个目录copy
                to: "static", // copy到那个目录
                ignore: ['.*']
            }
        ])
    ]


## 引入antd: npm install antd --save

## 使用mobx管理数据

1. 安装包： npm install mobx mobx-react
2. 在项目配置对装饰器的支持，安装包：npm install @babel/plugin-proposal-decorators，在.babelrc文件的pulgins中添加：
    ["@babel/plugin-proposal-decorators",{"legacy": true}], // 配置对装饰器的支持




