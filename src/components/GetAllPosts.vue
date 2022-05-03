<template>
        <div class="newPost-container">
            <NewPost/>
        </div>
        <div class="posts_container">
                <div class="getallpost" v-for="(post,id_post) in posts" :key="id_post">
                    <div class="getallpost_author">
                        <div><img class ="post_author_pic" v-bind:src="post.imageUrl"></div>
                        <span class ="post_author_description">
                            <h3 class = "post_author_name">{{post.nom}} {{post.prenom}}</h3>
                            <h4 class = "post_author_job">{{post.position_in_company}}</h4>
                        </span>
                        <div class="dropdown" v-if="userId==post.author_id||isAdmin == 1">
                            <button class="btn btn-transparent dropdown-toggle" type="button" id="modifyPost" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="modifyPost">
                                <li><button class="dropdown-item" type="button"><i class="fa-solid fa-pen-to-square"></i>Modifier</button></li>
                                <li><button class="dropdown-item" type="button"><i class="fa-solid fa-trash"></i>Supprimer</button></li>
                            </ul>
                        </div>
                        <div class="modify-date">
                        <span class="date"> Publié le  {{ datePost(post.post_date) }} </span>
                        </div>
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
import NewPost from '../components/NewPost.vue'
export default ({
    name:"GetAllPosts",

   components:{ 
      NewPost,
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
.posts_container{
    display:grid;
    grid-row: 2/3;
    grid-column:2/5;
   grid-template-columns: 1fr 4fr 1fr; 
   height: 80%;
   width: 100%;
   margin-bottom:2em;
   background: center no-repeat #c5c2c2;
   background-size:75%;
   padding:1em;
   background-image: url('~@/assets/icon-left-font.png');
   background-attachment: scroll;
   overflow-y: scroll;
    
 
   
}
.getallpost-container{
    display: block;
}
.getallpost{
    display: grid;
    text-align: left;
    grid-column: 2/3;
    background: rgb(205 198 198 / 56%);
    border: 2px solid rgba(150, 145, 145, 0.708);
    border-radius: 1.5em;
    box-shadow: 0 0 0.5em hsl(5deg 88% 48% / 96%);
    margin: 0.5em;
    transition: all 0.3s ease-in-out;

}
.getallpost:hover{
filter: contrast(120%) saturate(100%);
transform:scale(1.1);
margin:0.8em;

}
.getallpost_author{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.modify-date{
    margin-top: -1.8em;
    margin-right: 0.5em;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.date{
    font-size: 0.7em;
    color: rgba(26, 23, 23, 0.98);
}
#modifyPost{
    position:absolute;
    margin-top:-1.5em;
}
.dropdown-menu{
    font-size: 0.9em;
    background-color: #f9f2f2fa;
    min-width: 8em;
}
.dropdown-item{
    color: red;
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
    color: black;
}
h3{
    font: 1em arial;
    color: rgb(215, 49, 49);
    margin:0.2em;
}
h4{
    font:0.8em arial;
    color: rgb(234, 32, 32);
    margin:0.2em
}
</style>