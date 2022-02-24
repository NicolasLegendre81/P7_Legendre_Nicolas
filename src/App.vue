<template>
    <HeaderVue/>
  <router-view/> 
</template>
<script>
import HeaderVue from './components/Header.vue'
export default {
 name:'App',
 components:{
   HeaderVue
 }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height:100%;
  
  margin: 0;
  box-sizing: border-box;
}
html{
  box-sizing: border-box;
}
body{margin: 0;
background:no-repeat center url("../src/assets/Background.png"),#1D1A1A;
background-attachment:fixed;
}

</style>
