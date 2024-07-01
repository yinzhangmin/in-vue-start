export default {
    install: (Vue) => {
      // 自动加载common目录组件
      const context = require.context('@/components/common/', false, /\.(vue)$/)
      context.keys().forEach((key) => {
        const name = key.substr(key.indexOf('/') + 1, key.indexOf('.vue') - 2)
        const comp = context(key).default
        Vue.component(name, comp)
      })
    }
  }
  