<template>
    <div class="card card-text-center m-4 post-card" >
        <div class="post-header row ">
            <div class="row col-9">
                <div class="col-2 m-2 author-pic">
                    <router-link :to="`/profil/${author_id}`" aria-label="Lien vers le profil utilisateur">
                        <img class="img-thumbnail post_author_pic" :src="authorImg" alt="Photo de l'auteur de la publication">
                    </router-link>
                </div>
                <div class="col-8 my-auto ms-1 text-start author-description">
                    <h3>{{nom}} {{prenom}}</h3>
                    <h4>{{job}}</h4>
                </div>
            </div>
            <div class="dropdown col-3 text-end" v-if="editionDropdown">
                <button class="btn btn-transparent shadow-none dropdown-toggle" type="button"
                    id="modifyPost" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="modifyPost">
                    <li><button class="dropdown-item" type="button"  data-bs-toggle="modal" :data-bs-target="`#editPost`+(postId)">
                        <i class="fa-solid fa-pen-to-square"></i>Modifier</button>
                    </li>
                    <li><button class="dropdown-item" type="button" @click="deletePost(postId)" >
                        <i class="fa-solid fa-trash"></i>Supprimer</button>
                    </li>
                </ul>     
            </div>
        </div>
        <div class="post-body row bg-light col-11 mx-auto">
            <span class="py-3 post-content" v-if="postContent != null">{{postContent}}</span>
            <img class="img-fluid p-3 post-img" v-if="postImg != null" v-bind:src="postImg">   
        </div>
        <div class="col-12 pt-2 pe-3 text-end modify-date">
            <span class="date text-muted"> Publié le  {{ date }} </span>
        </div>
        <div class="post-footer accordion row" id="showcomments">
            <div class="accordion-item">
                <CreateComment :postId="postId"  
                :onRefresh="() => getComs(postId)"
                :profilePic="profilPic"/>   
                <h4 class="accordion-header" id="heading-comments">
                    <button class="accordion-button  btn-transparent shadow-none collapsed p-1 m-1" @click="getComs(postId)" key="" 
                        type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse-comments`+postId" 
                        aria-expanded="false" aria-controls="collapse-comments">
                        Commentaires
                    </button>
                </h4>
                <div :id="`collapse-comments`+postId" class="accordion-collapse collapse" aria-labelledby="heading-comments" data-bs-parent="#showcomments">
                    <CommentCard :comments="comments" 
                    :refreshComs="() => getComs(postId)" />
                </div>
            </div>
        </div>
    </div>
    <div :id="`editPost`+(postId)" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content rounded ">
                <div class="modal-header bg-gradient text-white custom-header">
                    <h5 class="modal-title">Modifier la publication</h5>
                    <button type="button" class="btn-close bg-secondary col-1 ms-auto pt-2" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body text-left col-sm-12" @submit.prevent="false" enctype="multipart/form-data" >
                    <div class="col-12">
                        <label for="editedContent">Modifiez votre publication:</label>
                        <textarea v-model="editedContent" class="col-12 m-1" ></textarea>
                    </div>
                    <div class="input-group col-12 m-1">
                        <img  class="img-fluid width" id="editedImg" :src="postImg">
                        <input class="btn-primary"  @change="uploadEditedImg"   id="uploadImg" aria-label="Ajoutez une photo " type="file" >
                    </div>
                    <button type="submit" @click="uploadPost(postId)" class="btn-sm bg-gradient text-white border-white custom-btn ">Valider</button>
                </form>                               
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import CommentCard from '../components/CommentCard.vue';
import CreateComment from '../components/CreateComment.vue';
export default {
    props:["refreshPost","author_id","authorImg","nom","prenom","editionDropdown","job","postId","postContent","postImg","date","profilPic"],
    data: function(){
       return{
           userId: localStorage.getItem('userId'),
           editedContent:this.postContent,
           files:[],
           comments:[],
            showEdit:false,    
    }},
   components:{
       CommentCard,CreateComment,
    },
    methods:{
        deletePost:function(postId){
            const token = localStorage.getItem('token');
            const self = this;
            axios.delete(`http://localhost:3000/api/posts/${postId}`,{
                   headers:{
                   Authorization: `Bearer ${token}`}
            })
           .then(function(response){
                console.log(response.data.message);
                self.refreshPost();
            } )
            .catch(error => {console.log(error)});
        },
        uploadEditedImg:function(e){
           this.files = e.target.files[0];
        },
        uploadPost:function(postId){
            const token = localStorage.getItem('token');
            const formData = new FormData();
            const self = this;
            for (const i of Object.keys(this.files)) {
             formData.append('files', this.files[i]);
            }
            if(this.editedContent){
             formData.append("post",this.editedContent);
            }
            if(this.editedContent =="") {
              formData.append("post","");  
            }         
            if(this.files){
             formData.append("image",this.files);
            }
            if(this.files || this.editedContent){
                axios.put(`http://localhost:3000/api/posts/${postId}`,formData,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(function(response){
                    console.log(response.data.message);
                    self.refreshPost();
                })
                .catch(error=>{console.log(error)});
            }
        }, 
        getComs:function(postId) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:3000/api/comments/${postId}`,{ 
                headers:{ 
                    Authorization: `Bearer ${token}` 
                }
            })
            .then( response => {
                this.comments=response.data;          
            })
            .catch(error => {
               console.log (error);
            })
        },            
    }      
}
</script>
<style scoped>
h3{
    font: 1em arial;
    color: #FD2D01;
    font-weight: bolder;
    margin:0.2em;
}
h4{
    font:0.8em arial;
    color: #FD2D01;
    margin:0.2em;
}
#editedImg {
  max-height: 15em;
  object-fit: contain;
}
.img-thumbnail{
    padding: 0.1rem;
}
.row{
    --bs-gutter-x:0;
    --bs-gutter-y: 0;
}
.post-card{
    border: 2px solid rgba(150, 145, 145, 0.708);
    filter: opacity(95%);
    border-radius: 1.5em;
    box-shadow:0 0 0.5em hsla(0, 6%, 16.3%, 0.96);
    transition: all 0.3s ease-in-out;
}
.post-card:hover{
    filter: contrast(100%) saturate(100%);
    box-shadow: 0 0 0.5em hsl(5deg 88% 48% / 96%);
    transform:scale(101%);
    margin:0.8em;
}
.date{
    font-size: 0.7em;
}
#modifyPost:hover{
    color: red;
}
.dropdown-item{
    color: red;
}
.post_author_pic {
    width:3rem;
    height:3rem;
    object-fit: cover;
}
.post-img{
    max-height: 25rem;
    object-fit: contain;
}
.accordion-item::before{
    width:100%;
    content: "";
    background-color: #d0c5c5;
    height: 1px;
    box-shadow: 0 0 0.3em #e7dfdf;
    display: block;
}
.accordion-item{
    border:none;
}
.accordion-button{
    width: 8.5em;
}
.accordion-item:last-of-type {
 border-bottom-right-radius:1.5em;
 border-bottom-left-radius:1.5em;
}
</style>