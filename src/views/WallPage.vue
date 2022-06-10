<template>
    <div class=container-fluid>
        <div class="WallPage_container">
            <Header/>
            <GetallPosts/>
        </div>
    </div>
</template>
<script>
import GetallPosts from '../components/GetAllPosts.vue';
import Header from '../components/Header.vue'
export default ({
    name:"WallPage",
    components:{ 
       Header,GetallPosts,   
    },   
});
</script>
