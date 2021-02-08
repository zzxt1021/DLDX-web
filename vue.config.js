module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                //target:'http://47.114.112.229:80',
                target:'http://47.114.112.229:90',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}