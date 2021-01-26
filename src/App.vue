<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'App',
  created() {
    this.initProjects()
  },
  methods: {
    ...mapActions(['initProjects'])
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background: url('./assets/bg.jpeg');
  background-size: cover;
  padding: 0 15px;
  text-align: center;
  color: $base-text-color;
  overflow: auto;
}
</style>
