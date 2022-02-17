const StylelintPlugin = require('stylelint-webpack-plugin');
const { LogMessage } = require('./config/proxy');

module.exports = {
    lintOnSave: 'warning',
    productionSourceMap: false,
    assetsDir: 'static',
    devServer: {
        disableHostCheck: true,
        // proxy,
        overlay: {
            errors: false,
        },
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-sass-unicode'), // eslint-disable-line
                ],
            },
        },
    },
    chainWebpack: (config) => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        config.plugins.delete('preload');

        config.plugin('define').tap((definitions) => {
            definitions[0]['process.env'].PROXY_ENV = JSON.stringify(process.env.PROXY_ENV);
            return definitions;
        });
    },
    configureWebpack: {
        plugins: [
            new LogMessage(),
            new StylelintPlugin({
                files: ['**/*.(s(c|a)ss|css|vue)'],
                fix: true, // 打开自动修复（谨慎使用！注意上面的配置不要加入js或html文件，会发生问题，js文件请手动修复）
            }),
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    // 单独将 vue 视图相关模块拆包
                    vueVendors: {
                        chunks: 'all',
                        name: 'vue-vendors',
                        priority: 20,
                        test: /[\\/]node_modules[\\/](element-plus|vue|vue-i18n|vue-router|vuex|@vue\/runtime-core)[\\/]/,
                    },
                },
            },
        },
    },
};
