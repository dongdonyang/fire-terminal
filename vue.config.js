// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊
module.exports = {
  // todo: 基本路径
  baseUrl: "./",
  outputDir: "dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: "static", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  // launch_path: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  configureWebpack: {},
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
  },
  // todo: webpack-dev-server 相关配置
  devServer: {
    port: 8084, // 端口号
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    // proxy: "http://localhost:4000" // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "http://fd.sctsjkj.com:5080", //线上环境
        // target: "http://192.168.0.67:5080", //调试环境、陈龙
        // target: "http://192.168.0.179:5000", //调试环境、陈昊文
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  // todo: 多页面配置
  // https://cli.vuejs.org/zh/config/#pages
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      entry: "src/main.js", // page 的入口 除了 entry 之外都是可选的
      template: "public/index.html", // 模板来源
      filename: "index.html", // 在 dist/index.html 的输出
      // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "西南军民融合",
      // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
      minify: {
        removeAttributeQuotes: false
      }
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    //subpage: "src/subpage/main.js"
  },
  lintOnSave: false, //是否在保存的时候检查
  runtimeCompiler: true, //包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  parallel: undefined,
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
