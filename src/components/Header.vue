<template>
  <section id="header" class="container-fluid">
      <div class="col-4 container-logo">
        <img src="../assets/icon-left-font-monochrome-white.png" alt="logo">

      </div>
  </section>

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
    #header{
       display: flex;
       justify-content: center;
        align-items: center;
        width:100%;
        height: 68px;
        position: relative;
        background:#dc3545;
    }
    .container-logo{
      display:flex;
      justify-content: center;
      }
    #logo{   
        width:100%;
        height:100%;    
    }
</style>


