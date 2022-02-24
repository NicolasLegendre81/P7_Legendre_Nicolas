<template>
  <div class="header">
    <div class="header_container_logo">
    <img id="logo" src="../assets\icon-left-font-monochrome-white.png" alt="Groupomania logo">
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'HeaderVue',
  props: {
    msg: String
  }
}
</script>
<style scoped>
    .header{
        display: grid;
        grid-template-columns:1fr 1fr 1fr;
        align-items: center;
        width:100%;
        height: 68px;
        position: relative;
        background:#23767C;
    }
    .header_container_logo{
      display:flex;
      justify-content: center;
      grid-column: 2/3;
      overflow: hidden;
      margin: auto;
      
      
      
      
    }
    #logo{
        
        width:100%;
        height:100%;
        
        
        
    }
</style>


