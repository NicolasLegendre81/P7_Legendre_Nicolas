<template>
    <div class="card card-text-center m-4 post-card" >
        <div class="post-header row ">
                            <div class="row col-9">
                                <div class="col-2 m-1 author-pic">
                                    <img class="img-thumbnail m-2 post_author_pic" :src="authorImg" alt="Photo de l'auteur de la publication">
                                </div>
                                <div class="col-8 my-auto ms-1 text-start author-description">
                                    <h3>{{nom}} {{prenom}}</h3>
                                    <h4>{{job}}</h4>
                                </div>
                            </div>
                            <div class="dropdown col-3 text-end" v-if="editionDropdown">
                                <button class="btn btn-transparent shadow-none dropdown-toggle" type="button" id="modifyPost" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="modifyPost">
                                    <li><button class="dropdown-item" type="button"  data-bs-toggle="modal" :data-bs-target="`#editPost`+postId"><i class="fa-solid fa-pen-to-square"></i>Modifier</button></li>
                                    <li><button class="dropdown-item" type="button" @click="deletePost(postId)" ><i class="fa-solid fa-trash"></i>Supprimer</button></li>
                                </ul>     
                            </div>
        </div>
        <div class="post-body row bg-light col-11 mx-auto">
                            <span class="py-3 post-content" v-if="postContent != null">{{postContent}}</span>
                            <img class="img-fluid pt-1 pb-5 px-5 post-img" v-if="postImg != null" v-bind:src="postImg">   
                        </div>
        <div class="col-12 pt-2 pe-3 text-end modify-date">
                            <span class="date text-muted"> Publié le  {{ date }} </span>
        </div>
    </div>
    <div :id="`editPost`+(postId)" class="modal" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content rounded ">
                                <div class="modal-header bg-danger bg-gradient text-white">
                                    <h5 class="modal-title">Modifier la publication</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form class="modal-body text-left col-sm-12" @submit.prevent="uploadPost()" enctype="multipart/form-data" >
                                    <div class="col-12">
                                        <label for="editedContent">Modifiez votre publication:</label>
                                        <textarea v-model="editedContent" class="col-12 m-1" ></textarea>
                                    </div>
                                    <div class="input-group col-12 m-1">
                                        <img  class="img-fluid" id="editedImg" :src="postImg">
                                        <input class="btn-primary"  @change="uploadEditedImg"   id="uploadImg" aria-label="Ajoutez une photo " type="file" >
                                    </div>
                                    <button type="submit" @click="uploadPost(postId)" class="btn btn-primary">Valider</button>
                                </form>
                                
                                </div>
                            </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:["authorImg","nom","prenom","editionDropdown","job","postId","postContent","postImg","date"],
    data: function(){
       return{
           userId: localStorage.getItem('userId'),
           editedContent:[this.postContent],
           files:[],
            showEdit:false,    
       }
   },
    methods:{
        deletePost:function(postId){
           const token = localStorage.getItem('token');
               axios.delete(`http://localhost:3000/api/posts/${postId}`,{
                   headers:{
                   Authorization: `Bearer ${token}`
               }
           })
           .then(function(response){
                console.log(response.data.message)
                location.reload();
            } )
        .   catch(error=>{console.log(error)});
       },
       uploadEditedImg:function(e){
           this.files= e.target.files[0];

       },
        uploadPost:function(postId,e){
            // const token = localStorage.getItem('token');
           const formData = new FormData();
            for (const i of Object.keys(this.files,)) {
             formData.append('files', this.files[i])
             }
            if(this.editedContent !=''){
             formData.append("post",this.editedContent)
            }
             
            if(this.files){
             formData.append("image",this.files)
            }
            if(this.files||this.editedContent){
                formData.append("user_id",this.userId)
                // axios.put(`http://localhost:3000/api/posts/${postId}`,formData,{
        
                //     headers: {
                //             "Content-Type": "multipart/form-data",
                //     Authorization: `Bearer ${token}`,
                //     },

                //  })
                console.log(formData)
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
    }
}
</script>
<style scoped>
h3{
    font: 1em arial;
    color: rgb(215, 49, 49);
    font-weight: bolder;
    margin:0.2em;
}
h4{
    font:0.8em arial;
    color: rgb(234, 32, 32);
    margin:0.2em
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
.post_author_pic{
    width:80px;

}
.post-img{
    max-height: 45rem;
    object-fit: contain;
}
</style>


