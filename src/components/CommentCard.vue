<template>
    <div class="get-comments container-fluid col-8 g-2 my-2 py-2">
        <div class="card text center comments-card" v-for="(comment,comment_id) in comments" :key="comment_id">
            <div class="card-header row">
                <div class="row col-9">
                    <div class="col-2 m-1 author-pic">
                         <img class="img-thumbnail m-2 post_author_pic" :src="comment.imageUrl" alt="Photo de l'auteur de la publication">
                    </div>
                </div>


            </div>

        
        
        </div>
    </div>  
</template>
<script>
export default {
    name:"CommentCard",
    props:{
        comments:{
            comment_id:Number,
            imageUrl:"",
            comment_content:"",
            post_id:Number,
            comment_date:Number,
            comment_Author_id:Number,
            user_id:Number,
            nom:"",
            prenom:"",
            position_in_company:""


        }
        },
   methods: {
       
   },
}

</script>
<style>
</style>