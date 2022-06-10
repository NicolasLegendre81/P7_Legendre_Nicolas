<template>
<div class="container col-11 ">
    <div  class=" new-comment-card  row col-12 mt-2 mx-auto border-primary bg-light">
        <div class="user-pic-container col-2 mb-2 me-2">
            <router-link :to="`/profil/${user_id}`">
                <img  class="rounded-circle mb-4 bg-primary user-pic " 
                v-bind:src="profilePic" alt="Avatar de l'utilisateur">
            </router-link>
        </div>
        <form @submit.prevent="sendCom" class="container-fluid row col-8 ms-1 text-start form-comment"> 
            <textarea  v-model="commentContent" 
                class="content form-control col-7 my-1 p-1" aria-label="Commentez cette publication" 
                placeholder="Commentez cette publication.">
            </textarea>
            <button class="btn-xs rounded-pill  col-7 my-1 bg-gradient text-white border-white custom-btn" type="submit">Commentez</button>
      </form> 
    </div>
</div>   
</template>
<script>
import axios from 'axios';
export default {
    name:"CreateComment",
    props: ['postId', 'onRefresh',"profilePic"],
    data() {
     return {
       commentContent:"",
       user_id:localStorage.getItem("userId"),
       comment:"",
       token: localStorage.getItem('token')
     }
   },
   methods: {
        sendCom: function() {
           const self =this;
           if(this.commentContent != '') {
               axios.post('http://localhost:3000/api/comments/',{
                    comment_content: this.commentContent,
                    post_id: this.postId,
                    user_id: this.user_id
               }, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
           })
           .then(function(response){
                console.log(response.data.message)
                self.onRefresh()
            })
            .catch(error=>{console.log(error)}); 
           }
       }
    }
}
</script>
<style scoped>
.new-comment-card{
    align-items: center;
}
.content{
    height:2em;
}
.user-pic{
    width:2.5rem;
    height: 2.5rem;
    object-fit: cover;
}
</style>
