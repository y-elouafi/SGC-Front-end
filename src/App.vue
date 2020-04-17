<template>
  <div id="app">
    <!-- <home></home> -->
  <!-- <NavSideBar><router-view></router-view></NavSideBar> -->
    <router-view></router-view>
  </div>
</template>

<script>

import NavSideBar from './components/NavSideBar.vue'
import Home from './Home.vue'

export default {
  name: 'app',
  components: {
    // 'home': Home,
    // NavSideBar
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center;  */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
