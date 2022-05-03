<template>
<section id="connection" class="container-sm mt-5">
        <div class="card text-center connection-card">
            <div class="card-header bs-danger">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link text-white active bg-danger" aria-current="true">Connection</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white bg-dark"><router-link to="/signup">Inscription</router-link></a>
                    </li>
                </ul>
            </div>
            <form class="col g-2 mt-3 mb-3" @submit="login">
                <p v-if="errors.length">
                <b>Il y a un problème avec les éléments renseignés dans les champs suivants:</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                 </ul>
                </p>
                <div class="col-lg-5 mx-auto mb-3">
                    <label for="Email" class="col-form-label" required>Email</label>
                    <input  v-model="email" type="text" class="form-control" id="Email" placeholder="robert-dupont@gmail.com">

                </div>
                <div class="col-lg-5 mx-auto mb-3 row">
                    <label for="password" class="col-form-label" required >Mot de passe</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Mot de passe">

                </div>
               <div class="col-auto">
                   <button id="btn" type="submit" class="btn btn-secondary bg-danger">Connectez-vous</button>
               </div>

            </form>

        </div>

    </section>

</template>


<script scoped>
import axios from'axios';
export default {
     name: "LoGin",
        data(){return{
      errors:[],
      email:'',
      password:""
  }},
 methods: {
     
     login(e){
         this.errors=[]
            const emailRe = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
            const passwordRe = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
            const self = this;
              if(!this.email || !emailRe.test(this.email)){
            this.errors.push("Email invalide ");
            }
            if(!this.password || !passwordRe.test(this.password)){
                this.errors.push("Votre Mot de passe doit comporter au Moins 8 caractéres dont : 1 chiffre entre 0 et 9, 1 lettre majuscule et une lettre minuscule.")

            }
             if(!this.errors.length)
            {

                
                  axios.post("http://localhost:3000/api/auth/login",{
                    email:this.email,
                    password:this.password,
                })
                .then(function(response){
                    console.log(response)
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem("isAdmin",response.data.user.Admin);
                    localStorage.setItem('userId',response.data.user.user_id);
                    localStorage.setItem('profilePic',response.data.user.imageUrl);
                    localStorage.setItem('nom',response.data.user.nom);
                    localStorage.setItem('prenom',response.data.user.prenom);
                    self.$router.push('/post');

                })
                .catch(error =>{
                    this.errors.push(error.response.data.message)
                })
                
            }else{ 
                        
                        e.preventDefault();
                         
                        }

     }
     
 },   
}
</script>

<style scoped>
.connection-card {
    border-radius: 1em;
    background-color: #9f8a8a15;
    box-shadow: 0 0 1em rgb(145, 142, 142);
    border:solid 1px #323b3f;
    transition: all 0.3s ease-in
}
.connection-card:hover{
    filter: brightness(105%);
    transform: scale(105%);
    box-shadow: 0 0 1em rgba(213, 48, 48, 0.588);
    
}
li{
    color:red;
    list-style: none;

}
</style>