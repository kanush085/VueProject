module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "manual",
      rtlSupport: true
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  transpileDependencies: ["quasar"]
};
