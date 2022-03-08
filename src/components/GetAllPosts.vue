<template>
    <div class="posts_container">
        <div class="getallpost" v-for="post in posts" :key="post.id_post">
            <div class="getallpost_author">
                <div><img class ="post_author_pic" v-bind:src="post.imageUrl"></div>
                <span class ="post_author_description">
                    <h3 class = "post_author_name">{{post.nom}} {{post.prenom}}</h3>
                    <h4 class = "post_author_job">{{post.position_in_company}}</h4>
                </span>
                <button class="modify-suppr" v-if="userId==post.author_id||isAdmin == 1"><i class="fa-solid fa-ellipsis-stroke"></i></button>
                <span class="date"> Publié le {{ datePost(post.post_date) }} </span>
            </div>
            <div class="container_post_content">
                <div class="post_content">
                    <span v-if="post.post != null">{{post.post}}</span>
                    <a v-bind:href="post.post_imageUrl"><img v-if="post.post_imageUrl != null" v-bind:src="post.post_imageUrl"></a>
                </div>
            </div>
            

        </div>


    </div>
</template>
<script>
import axios from 'axios'
export default ({
    name:"GetAllPosts",

   components:{ 
      
   },
   data(){
       return{
           userId : localStorage.getItem('userId'),
           token : localStorage.getItem('token'),
           isAdmin :localStorage.getItem('isAdmin'),
           posts:"",
           showModify:false,
           

       }
   },
   created(){
       this.getallpost();
   },
   methods:{
       getallpost(){
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
       datePost(date) {
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
.posts_container{
    display:grid;
    grid-row: 2/3;
    grid-column:2/5;
   grid-template-columns: 1fr 4fr 1fr; 
   height: 80%;
   margin-bottom:2em;
   background: center no-repeat #322D2D;
   background-size:80%;
   padding:1em;
   background-image: url('~@/assets/Background-2.png');
   background-attachment: scroll;
   overflow-y: scroll;
    
 
   
}
.getallpost{
    display: grid;
    text-align:left;
    grid-column: 2/3;
    background: #44525e;
    border:2px solid rgb(187, 186, 185);
    margin:0.5em;
}
.getallpost_author{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.date{
    margin-top: -0.8em;
    margin-right: 0.5em;
    margin-left: auto;
    font-size: 0.8em;
    color: rgba(159, 142, 142, 0.98);
}
.modify-suppr{
    width:2em;
    background: none;
}
.post_author_pic{
    display: flex;
    margin: 0.2em;
    width:4em;
    height: 4em;
    border:solid 1.5px rgb(8, 8, 8);
    border-radius: 1em;
    align-items: center;
}
.post_author_description{
    margin-left:0.3em
}
.container_post_content{
    margin: 1em 4.5em;
}
.post_content{
    grid-column:2/3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    font: 1.5 arial;
    color: rgb(230, 221, 221);
}
h3{
    font: 1em arial;
    color: rgb(241, 233, 233);
    margin:0.2em;
}
h4{
    font:0.8em arial;
    color: rgb(241, 233, 233);
    margin:0.2em
}
</style>