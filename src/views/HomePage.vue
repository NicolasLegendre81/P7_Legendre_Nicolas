<template>
    <div class="home-container">
        <SignUp/>
        <div class="welcome-message">
            <h3>
                Bienvenue sur le réseau social de VOTRE entreprise!
            </h3>

        </div>

    </div>
        
    
</template>
<style scoped>
.welcome-message{
    font-size: 2em;
    color: rgb(99, 99, 100);
    grid-column: 2/5;
    grid-row: 4/5;
    text-shadow: rgb(209, 208, 205) 1px 0 2px;
    text-align: center;
    position:relative;

    
    
}
.home-container{
    display:grid;
    grid-template-columns: 1fr 2fr 1fr 2fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>
<script>
import SignUp  from '@/components/SignUp.vue'

export default ({
    name:"HomePage",

   components:{ SignUp}
})
</script>
