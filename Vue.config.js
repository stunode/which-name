module.exports = {
    // 基本路径
    baseUrl: process.env.NODE_ENV === 'production'?'/which-name':'/',
    outputDir: 'docs',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 服务器端口号
    devServer: {
        port: 1234  ,
    },
}
