const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function expressMiddleware(router) {
  router.use(
    '/imgExcel',
    createProxyMiddleware({
      target: `https://tiebapic.baidu.com`, // 服务器 api地址
      changeOrigin: true,
      pathRewrite: { "^/imgExcel": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    })
  ),
  router.use(
    '/upload',
    createProxyMiddleware({
      target: `https://jsonplaceholder.typicode.com`, // 服务器 api地址
      changeOrigin: true,
      pathRewrite: { "^/upload": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    })
  )
}