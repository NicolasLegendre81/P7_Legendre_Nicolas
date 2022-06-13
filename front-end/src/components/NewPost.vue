<template>
  <div id="newpost" class="card border-danger mx-1 my-1 bg-gradient">
    <div class="row g-1">
      <div class="col-3 col-md-1 profile-picture">
        <router-link :to="`/profil/${user_id}`" aria-label="Lien vers le profil utilisateur">
          <img  class="col-2 rounded-circle mt-3 ms-2 " v-bind:src="profilePic" 
            alt="Avatar de l'utilisateur et lien vers la page de profil">
        </router-link>
      </div>
      <form  class="panel-panel-default text-left col-9" @submit.prevent="false" enctype="multipart/form-data"> 
        <div class="text-white my-2 mx-1 panel-body">
          <div class="form-floating">
            <textarea v-model="postContent" class="form-control text-white rounded-pill bg-secondary bg-gradient mt-3 mb-1" 
              placeholder="Partagez avec la communauté" id="postContent" >
            </textarea>
            <label for="postContent">Qu'avez vous à partager?</label>
          </div>
          <div class="input-group">
            <label class="btn-sm rounded-pill bg-transparent bg-gradient text-white" for="uploadFiles-btn">Ajoutez une photo 
              <i class="fa-solid fa-image"></i>
            </label>
            <input id="uploadFiles-btn" @change="uploadFiles" aria-label="Ajoutez une photo " type="file" style="display:none;">
            <span class="file-name">{{filename}}</span>
          </div>       
        </div>
          <div class="mt-2 mb-3 mx-auto send-post">
          <button class="btn-sm col-3 col-md-2 rounded-pill bg-gradient text-white border-white custom-btn" @click="sendpost()" type="submit">Publiez</button>
          </div>
      </form>
    </div>
  </div>   
</template>
<script>
import axios from'axios';
export default ({
  props:["profilePic","getRefresh"],
  name:"NewPost",
  data() {
    return {
      postContent: "",
      files: "",
      filename: "",
      user_id: localStorage.getItem("userId"),   
    }
  },
  methods: {
    uploadFiles:function(event){
     this.files = event.target.files[0];
     this.filename = event.target.files[0].name
    },
    sendpost:function(e){
      const user_id = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const formData = new FormData();
      const self = this;
      for (const i of Object.keys(this.files)) {
        formData.append('files', this.files[i]);
      }
      if(this.postContent!=''){
       formData.append("post",this.postContent);
      }
      formData.append("user_id",user_id);
      if(this.files){
       formData.append("image",this.files);
      }
      if(this.files||this.postContent){
        axios.post("http://localhost:3000/api/posts/",formData,{ 
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function(response){
          console.log(response.data.message);
          self.getRefresh();
        } )
        .catch(error => {console.log(error)});
      }
      else{
       e.preventDefault();
      }
    }
  },   
});
</script>
<style>
textarea{
  overflow: hidden;
  height:70px;
  resize:none;
}
.file-name{
  color: rgba(72, 158, 198, 0.744);
  overflow: hidden;  
}
#newpost{
  height:10rem;
  background: #4E5166;
}
.profile-picture img{
  height:3.5rem;
  width:3.5rem;
  object-fit: cover;
}
</style>