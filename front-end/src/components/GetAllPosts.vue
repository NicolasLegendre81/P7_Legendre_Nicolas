<template>
    <section class="newPost-container">
        <NewPost :profilePic="profilPic"
                :getRefresh="()=>getAllPosts()"/>
    </section>
    <section class="feed container-fluid  py-2">
        <div class="get-posts container col-sm-12 col-md-8 g-2 pt-2 my-2">
            <OnePost v-for="post in posts" :key="post.id_post"
                    :authorImg="post.imageUrl"
                    :nom="post.nom"
                    :prenom="post.prenom"
                    :job="post.position_in_company"
                    :postContent="post.post"
                    :postImg="post.post_imageUrl"
                    :date="datePost(post.post_date)"
                    :editionDropdown="userId==post.author_id||isAdmin==1"
                    :postId="post.id_post"
                    :author_id="post.author_id"
                    :profilPic="profilPic"   
                    :refreshPost="() =>getAllPosts()"
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
           profilPic :localStorage.getItem("profilePic"),
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
           const self = this
           axios.get('http://localhost:3000/api/posts/',{
               headers:{ 
                    Authorization: `Bearer ${this.token}` 
               }
            })
            .then( response => {
                this.posts = response.data;
                this.profilPic=localStorage.getItem("profilePic")
            })
            .catch(error => {
               console.log (error)
               self.$router.push("/")
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
   background: center no-repeat #4E5166;
   background-size:75%;
   background-image: url('~@/assets/icon-left-font.png');
   background-attachment: scroll;
   overflow-y: scroll;  
   height: 50rem; 
}
</style>