<template>
<div id="newpost" class="card border-primary mx-1 my-1 bg-dark bg-gradient">
  <div class="row g-1">
    <div class="col-sm-12 col-md-1 profile-picture">
      <a href="http://localhost:8080/?#/post">
        <img  class="img-fluid rounded-circle bg-primary mt-4 " v-bind:src="profilePic" alt="Avatar de l'utilisateur">
      </a>
    </div>
    <form  class="panel-panel-default text-left col-sm-12 col-md-9" @submit.prevent="sendpost" enctype="multipart/form-data"> 
      <div class="text-white my-2 mx-1 panel-body">
        <div class="form-floating">
          <textarea v-model="postContent" class="form-control text-white rounded-pill bg-secondary bg-gradient mb-1" placeholder="Partagez avec la communauté" id="postContent" style="height: 100px; resize:none"></textarea>
          <label for="postContent">Qu'avez vous à partager?</label>
        </div>
        <div class="input-group">
          <label class="btn-sm rounded-pill bg-transparent bg-gradient text-white" for="uploadFiles-btn">Ajoutez une photo <i class="fa-solid fa-image"></i></label>
          <input id="uploadFiles-btn" @change="uploadFiles" aria-label="Ajoutez une photo " type="file" style="display:none;">
        </div>
        
      </div>
        <div class="col-md-2 col-sm-12 mt-2 mb-3 mx-auto send-post">
        <button class="btn-lg rounded-pill bg-danger bg-gradient text-white" type="submit">Publiez</button>
        </div>
    </form>
  </div>
</div>
    
</template>
<script>
import axios from'axios';
export default ({
    name:"NewPost",

   components:{ 

   },
   data() {
     return {
       profilePic:localStorage.getItem('profilePic'),
       postContent:"",
       files:"",
       user_id:localStorage.getItem("userId"),

       
     }
   },
  
   methods: {
   uploadFiles(event){
     this.files = event.target.files[0];
   },
   sendpost(e){
     const user_id=localStorage.getItem("userId");
     const token =localStorage.getItem("token");
     const formData = new FormData();
          for (const i of Object.keys(this.files)) {
            formData.append('files', this.files[i])
          }
     
     if(this.postContent!=''){
       formData.append("post",this.postContent)
     }
     formData.append("user_id",user_id);
     if(this.files){
       formData.append("image",this.files)
     }
     if(this.files||this.postContent){
       axios.post("http://localhost:3000/api/posts/",formData,{
        
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },

       })
       .then(function(response){
       console.log(response)
       location.reload();
        } )
        .catch(error=>{console.log(error)});


     }
     else{
       e.preventDefault();
     }


   }
   },
   
});
</script>
<style>
</style>