<template>
  <div id="app">
    <router-view />
  </div>
</template>

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

.title {
  color: $white;
  text-transform: uppercase;
}
</style>
