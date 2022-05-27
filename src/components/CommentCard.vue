<template>
    <div class="get-comments container-fluid col-10 g-2 my-2 py-2">
        <div class="card text-center comments-card mb-2" v-for="comment in comments" :key="comment.comment_id">
            <div class="Commentcard-header row">
                <div class="description-part col-12">
                    <div class="col-2  author-pic">
                         <img class="img-thumbnail m-1 post_author_pic" :src="comment.imageUrl" alt="Photo de l'auteur de la publication">
                    </div>
                    <div class="col-8 ms-2 my-auto text-start author-description">  
                            <h3>{{comment.nom}} {{comment.prenom}}</h3>
                            <h4>{{comment.position_in_company}}</h4>
                    </div>
                    <div class="dropdown col-2 text-end" v-if="userId==comment.user_id||isAdmin==1">
                                <button class="btn btn-transparent shadow-none dropdown-toggle pt-1 pe-3" type="button" id="modifyComment" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="modifyCom">
                                    <li><button class="dropdown-item" type="button"  @click="isEditing(comment.comment_id)"><i class="fa-solid fa-pen-to-square"></i>Modifier</button></li>
                                    <li><button class="dropdown-item" type="button" @click="deleteCom(comment.comment_id)" ><i class="fa-solid fa-trash"></i>Supprimer</button></li>
                                </ul>     
                            </div>
                </div>
            </div>
            <div :id="`editCard`+comment.comment_id" class="card d-none">
                <div class="card rounded ">
                    <div class="card-header row m-1 bg-danger bg-gradient text-white">
                        <h5 class="card-title col-10">Modifier la publication</h5>
                        <button type="button" class="btn-close col-2 ms-3 pt-2" @click="closeEdit(comment.comment_id)" aria-label="Close"></button>
                    </div>
                    <form class="card-body text-left col-sm-12" @submit="uploadCom(comment.comment_id)" >
                        <div class="col-12">
                            <label for="editedCom"></label>
                            <textarea v-model="editedCom" class="col-12 m-1" ></textarea>
                        </div>
                        <button type="submit" class="btn-xs btn-primary">Valider</button>
                    </form>   
                </div>
            </div> 
            <div  class="comment-body bg-light col-11 mx-auto mb-1">{{comment.comment_content}}</div>
            <div class="col-12 pt-2 pe-3 text-end">
               <span class=" date text-muted"> Commentaire publié le {{dateComment(comment.comment_date) }}</span>
            </div>
        </div>
    </div> 
</template>
<script>
import axios from 'axios';
export default {
    name:"CommentCard",
    data() {
     return {
       profilePic:localStorage.getItem('profilePic'),
       commentContent:"",
       userId:localStorage.getItem("userId"),
       isAdmin:localStorage.getItem("isAdmin"),
       comment:"",
       token: localStorage.getItem('token'),
       editedCom:"",
       showEdit:false,
     }
    },
    props:[
        "comments","refreshComs"],
        
   methods: {
         dateComment: function(dateComment) {
            const event = new Date(dateComment);
            const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            };
            return event.toLocaleDateString("fr-Fr", options);
        },
        deleteCom:function(comment_id) {
            const self = this;
               axios.delete(`http://localhost:3000/api/comments/${comment_id}`,{
                   headers:{
                   Authorization: `Bearer ${self.token}`
               }
           })
           .then(function(response){
               console.log(response)
                self.refreshComs()
            } )
        .   catch(error=>{console.log(error)});
       },  
       isEditing:function(comment_id) {
           document.getElementById(`editCard${comment_id}`).className="card"

       },
       closeEdit:function(comment_id){
           document.getElementById(`editCard${comment_id}`).className="card d-none"
       },
       uploadCom:function(comment_id){
            const self = this;
           axios.put(`http://localhost:3000/api/comments/${comment_id}`,{
               comment_content: this.editedCom,
                user_id: this.userId},{
                 headers:{
                   Authorization: `Bearer ${self.token}`
               },

           })
           .then(function(response){
               console.log(response)
                self.refreshComs()
                self.closeEdit(comment_id)
            } )
            .catch(error=>{console.log(error)});
        },
   },
}
</script>
<style scoped>
h3{
    font: 0.8em arial;
    color: rgb(215, 49, 49);
    font-weight: bolder;
    margin:0.1em;
}
h4{
    font:0.6em arial;
    color: rgb(234, 32, 32);
    margin:0.1em;
    padding-top: 0.3em;
}

.btn{
    padding: 0;
}
.description-part{
  display:flex;
  flex-direction: row;
}
.date{
    font-size: 0.7em ;
}
.card-title{
    font-size:1em
}
.comments-card{
    box-shadow: 0 0 0.5em hsla(0, 6%, 16.3%, 0.96);
}
#modifyComment:hover{
    color: red;
}
.dropdown-item{
    color: red;
}
</style>