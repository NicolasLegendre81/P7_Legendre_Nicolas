<template>
  <section id="header" class="container-fluid">
    <div v-if="isLogged" class="container-logo ms-auto me-2">
      <img id="logo" src="../assets/icon-left-font-monochrome-white.png" alt="logo de la société Groupomania">
    </div>
    <div v-if="!isLogged">
      <img id="logo" src="../assets/icon-left-font-monochrome-white.png" alt="logo de la société Groupomania">
    </div>
    <div class="Container-navbar ms-auto me-2" v-if="isLogged">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarHeader" aria-controls="navbarHeader"
        aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div class="collapse" id="navbarHeader">
      <nav class="navbar text-left ">
        <ul class="navbar-nav">
          <li class="nav-item me-2 mt-1">
            <button @click="logOut()" class="btn btn-transparent custom-nav" >Deconnection</button>
          </li>
          <li class="nav-item me-2 mb-1">
            <router-link v-if="onProfil==true" to="/post"  class="nav-link custom-nav">Fil d'actualité</router-link>
            <router-link v-else :to="`/profil/${user_id}`" class="nav-link custom-nav">Votre Profil</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>
<script scoped>
export default {
  name: 'HeaderVue',
  props: ["onProfil"],
  data() {
    return {
      isLogged:localStorage.getItem('islogged'),
      user_id: localStorage.getItem("userId"),
    }
  },
  methods: {
    logOut:function(){
      const self = this
      localStorage.clear();
      self.$router.push('/');
    },
  },     
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
    background:#FD2D01;
  }
  .navbar-toggler{
    color:white;
    font-size:1rem;
  }
  .btn{
    color:white;
  }
  .btn-transparent:focus{
    box-shadow:0 .04rem 0 0 #353031;
  }
  .navbar-toggler:focus{
    box-shadow: 0 0 0 .02rem;;
  }
  .nav-link{
    color:white;
    transition:all 0.2s ease-in-out;
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


