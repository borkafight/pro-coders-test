<template>
  <div id="app">
    <h1 class="title">Projects manager</h1>
    <!-- <div id="nav">
      <router-link to="/">Projects</router-link> |
      <router-link to="/project">Project</router-link>
    </div> -->
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
  color: #2c3e50;
  overflow: auto;
}

.title {
  color: $white;
  text-transform: uppercase;
}
</style>
