<template>
<div class="container col-11 ">
    <div  class=" new-comment-card  row col-12 mt-2 mx-auto border-primary bg-light">
        <div class="user-pic col-sm-3 col-2 m-1">
            <img  class="img-fluid my-auto mx-auto rounded-circle bg-primary  " v-bind:src="profilePic" alt="Avatar de l'utilisateur">
        </div>
      <form @submit.prevent="sendCom" class="container-fluid row col-8 text-start form-comment"> 
        <textarea  v-model="commentContent" 
        class="content form-control col-7 my-1 p-1" aria-label="Commentez cette publication" 
        placeholder="Commentez cette publication."></textarea>
        <button class="btn-xs rounded-pill  col-7 mb-1 bg-danger bg-gradient text-white" type="submit">Commentez</button>
      </form> 
    </div>

</div>   
</template>
<script>
import axios from 'axios';
export default {
    name:"CreateComment",
    props: ['postId', 'onRefresh'],
    data() {
     return {
       profilePic:localStorage.getItem('profilePic'),
       commentContent:"",
       user_id:localStorage.getItem("userId"),
       comment:"",
       token: localStorage.getItem('token')
     }
   },
   methods: {
       sendCom: function() {
           const self =this;
           console.log(this.token)
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
                console.log(response)
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
</style>
