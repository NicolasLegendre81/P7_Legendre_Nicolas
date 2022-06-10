<template>
    <div class="container-fluid">
        <div class="home-container">
            <Header/>
            <Login/>
            <div class="welcome-message">
                <h3>
                Bienvenue sur le réseau social de VOTRE entreprise!
                </h3>
            </div>
        </div>
    </div>        
</template>
<style scoped>
.welcome-message{
    font-size: 2em;
    color: rgb(99, 99, 100);
    text-shadow: rgb(209, 208, 205) 1px 0 2px;
    text-align: center;
    margin-top: 3em;
    position:sticky;       
}
img{
    margin:0;
    padding:0;
}
</style>
<script>
import Login from'../components/Login.vue';
import Header from'../components/Header.vue';
export default ({
    name:"HomePage",
    components:{ 
       Login,Header,
     },   
});
</script>
