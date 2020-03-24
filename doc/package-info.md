### html-webpack-plugin

- 为html文件中引入的外部资源添加每次编译后的hash，防止引用缓存的外部文件问题；
- 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口

### webpack-dev-server

- hot replace
- 原始文件作出改动后，webpack-dev-server会实时的编译

> * 注意：启动webpack-dev-server后，在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中