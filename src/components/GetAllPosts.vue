<template>
        <section class="newPost-container">
            <NewPost/>
        </section>
        <section class="feed container-fluid bg-danger py-2 my-1">
            <div class="get-posts container col-sm-12 col-md-8 g-2 pt-2 my-2 bg-light">
                    <OnePost v-for="(post,id_post) in posts" :key="id_post"
                    :authorImg="post.imageUrl"
                    :nom="post.nom"
                    :prenom="post.prenom"
                    :job="post.position_in_company"
                    :postContent="post.post"
                    :postImg="post.post_imageUrl"
                    :date="datePost(post.post_date)"
                    :editionDropdown="userId==post.author_id||isAdmin==1"
                    :postId="post.id_post"                    
                    />
                </div>
        </section>      
</template>
<script>
import axios from 'axios'
import NewPost from '../components/NewPost.vue'
import OnePost from'./OnePost.vue'
export default ({
    name:"GetAllPosts",

   components:{ 
      NewPost,OnePost,
   },
   data: function(){
       return{
           userId : localStorage.getItem('userId'),
           token : localStorage.getItem('token'),
           isAdmin :localStorage.getItem('isAdmin'),
           posts:[
           ],
            showEdit:false,    
       }
   },
   created(){
       this.getAllPosts();
   },
   methods: {
       getAllPosts: function() {
           const token=localStorage.getItem('token');
           axios.get('http://localhost:3000/api/posts/',{
               headers:{ 
                    Authorization: `Bearer ${token}` 
               }
           })
           .then( response=>{
           this.posts=response.data[0];
           console.log(this.posts)


           })
           .catch(error=>{
               console.log (error)
           })
       },     
       datePost: function(date) {
            const event = new Date(date);
            const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },
   }
   
});



</script>
<style scoped>
.get-posts{  
   background: center no-repeat #c5c2c2;
   background-size:75%;
   background-image: url('~@/assets/icon-left-font.png');
   background-attachment: scroll;
   overflow-y: scroll;  
   height: 50rem; 
}


</style>