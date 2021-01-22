module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import '@/scss/_variables.scss';
          @import '@/scss/_mixins.scss';
          @import '@/scss/_common.scss';
        `
      }
    }
  }
}
