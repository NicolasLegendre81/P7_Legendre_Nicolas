<template>
   <Header :onProfil="true"/>
   <UserInfos :getUserUpdated="(user) => getUser (user)"/>
      <div v-if="user.user_id==userId">
         <NewPost :profilePic="userImg"
                  :getRefresh="() => getUserPosts()"/>
      </div>
   <section class="feed container-fluid  py-2 my-1">
      <div class="get-posts container col-12 col-md-8 g-2 pt-2 my-2">
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
                  :profilPic="userImg"
                  :refreshPost="() => getUserPosts()"/>
      </div>
   </section>          
</template>
<script>
import NewPost from '../components/NewPost.vue'
import Header from'../components/Header.vue'
import UserInfos from "../components/UserInfos.vue"
import axios from 'axios'
import OnePost from'./OnePost.vue'
export default({
    name:"GetProfile",
    components:{ 
      Header,UserInfos,OnePost,NewPost,
   },
   created(){
       this.getUserPosts();
   },
   data(){
      return{
         user:[],
         posts:[],
         userId:localStorage.getItem("userId"),
         userImg:localStorage.getItem("profilePic"),
         token : localStorage.getItem('token'),
         isAdmin:localStorage.getItem('isAdmin'),
      }
   },
   methods: {
      getUser:function(user){
         this.user = user
         if(user.user_id == this.userId){
            localStorage.removeItem("profilePic")
            localStorage.setItem("profilePic",this.user.imageUrl)
            this.userImg = localStorage.getItem("profilePic")         
         }
      },
      getUserPosts:function(){
         const self = this
         axios.get(`http://localhost:3000/api/posts/user/${self.$route.params.id}`,{
               headers:{ 
                    Authorization: `Bearer ${self.token}` 
               }
            })
            .then( response => {
               this.posts = response.data;
            })
            .catch(error => {
               console.log (error)
               self.$router.push("/")
            })
      },
      datePost:function(date){
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
   },
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

