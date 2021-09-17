module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://47.114.112.229:80',
                //target:'http://47.114.112.229:90',
                //target:'http://127.0.0.1:80',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}