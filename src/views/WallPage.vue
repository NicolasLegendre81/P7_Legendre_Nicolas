<template>
    <div class=container-fluid>
        <div class="WallPage_container">
            <GetallPosts/>

        </div>
    </div>
</template>
<script>
import GetallPosts from '../components/GetAllPosts.vue';
export default ({
    name:"WallPage",

   components:{ 
       GetallPosts,
      
   },
   
});



</script>
<style scoped>

</style>
