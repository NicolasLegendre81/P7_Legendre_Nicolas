<template>
  <div class="container-fluid">
      <HeaderVue/>
    <router-view/> 
  </div>
</template>
<script>
import HeaderVue from "@/components/Header.vue"
export default {
 name:'App',
 components:{
   HeaderVue
 }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column; 
  margin: 0;
  box-sizing: border-box;
}
html{
  box-sizing: border-box;
  
}
.container-fluid{
  padding-right: 0;
  padding-left:0;
}
a{
  text-decoration: none;
  color:black;
}
</style>
