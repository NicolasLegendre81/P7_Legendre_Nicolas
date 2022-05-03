<template>
<section id="newpost" class="card border-primary mx-3 my-2 bg-dark bg-gradient">
  <div class="row g-1">
    <div class="col-sm-12 col-md-1 profile-picture">
      <img  class="rounded-circle my-3 bg-primary " v-bind:src="profilePic" alt="Avatar de l'utilisateur">
    </div>
    <form  class="panel-panel-default text-left col-sm-12 col-md-9" @submit.prevent="sendpost" enctype="multipart/form-data"> 
      <div class="text-white my-3 panel-body">
        <p class="rounded-pill bg-secondary bg-gradient mb-1" contenteditable="true">Que souhaitez-vous partager?</p>
        <div class="input-group col-md-4 col-sm-12 ">
          <label class="btn-sm rounded-pill bg-transparent bg-gradient text-white" for="pickfiles-btn">Ajoutez une photo <i class="fa-solid fa-image"></i></label>
          <input id="pickfiles-btn"  aria-label="Ajoutez une photo " type="file" style="display:none;">
        </div>
      </div>
    </form>
    <div class="col-md-2 col-sm-12 my-3 send-post">
      <button class="btn-md rounded-pill bg-danger bg-gradient text-white" type="submit">Publiez</button>
    </div>
  </div>
</section>
    
</template>
<script>
export default ({
    name:"NewPost",

   components:{ 

   },
   data() {
     return {
       profilePic:localStorage.getItem('profilePic')
       
     }
   },
  
   methods: {
   
   },
   
});
</script>
<style>
/* .profile-picture{
  
} */
</style>