// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊

const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
module.exports = {
  // todo: 基本路径
  publicPath: "./",
  assetsDir: "static", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  // launch_path: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  configureWebpack: {},
  // todo: webpack-dev-server 相关配置
  // devServer: {
  //   port: 8084, // 端口号
  //   host: "0.0.0.0",
  //   https: false, // https:{type:Boolean}
  //   open: false, //配置自动启动浏览器
  //   proxy: {
  //     "/api": {
  //       target: "http://fd.sctsjkj.com:5080", //线上环境
  //       // target: "http://192.168.0.67:5080", //调试环境、陈龙
  //       // target: "http://192.168.0.179:5000", //调试环境、陈昊文
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": "/api"
  //       }
  //     }
  //   }
  // },
  lintOnSave: false, //是否在保存的时候检查
  runtimeCompiler: true, //包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  parallel: undefined,
  css: {
    // modules:false,
    // extract:true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   browsers: ["Android >= 4.0", "iOS >= 7"]
          // }),
          pxtorem({
            rootValue: 16,
            propList: ["*"]
          })
        ]
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
