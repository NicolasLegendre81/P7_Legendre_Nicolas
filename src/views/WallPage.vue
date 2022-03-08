<template>
    <div class="WallPage_container">
        <GetallPosts/>

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
.WallPage_container{
display: grid;
grid-template-columns: 1fr 2fr 1fr 2fr 1fr;
grid-template-rows: 1fr 5fr 1fr;
box-sizing: border-box;
background:#1F1B1B ;
}
</style>
