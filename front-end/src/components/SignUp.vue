<template>
    <Header/>
    <section id="inscription" class="container-sm mt-5">
        <div class="card text-center signup-card">
            <div class="card-header bs-danger">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link text-white bg-dark" ><router-link to="/">Connection </router-link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white active bg-danger" aria-current="true">Inscription</a>
                    </li>
                </ul>
            </div>
            <form class="col g-2 mt-3 mb-3" @submit.prevent="false">
                <p v-if="errors.length">
                    <b>Il y a un problème avec les éléments renseignés dans les champs suivants:</b>
                    <ul>
                        <li  v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p> 
                 <div class="col-11 col-lg-5 mx-auto mb-3">
                    <label  for="email" class="col-form-label" required>Email</label>
                    <input  v-model="email" type="text" class="form-control" id="Email" placeholder="robert-dupont@gmail.com">
                </div>
                <div class="col-11 col-lg-5 mx-auto mb-3 row">
                    <label for="password" class="col-form-label" required >Mot de passe</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Mot de passe">
                </div>
                <div class="name-form">
                    <div class="form-group col-md-4 mb-3 ">
                        <label for="nom" class="col-form-label" required>Nom</label>
                        <input  v-model="nom" type="text" class="form-control" id="Nom" placeholder="Ex:Dupont">
                    </div>
                    <div class="form-group col-md-4 mb-3 ">
                        <label for="prenom" class="col-form-label" required>Prénom</label>
                        <input  v-model="prenom" type="text" class="form-control" id="prenom" placeholder="Ex:Robert">
                    </div>
                </div>
                <div class="col-11 col-lg-5 mx-auto mb-3 row">
                    <label for="poste" class="col-form-label" required >Fonction dans la société</label>
                    <input v-model="poste" type="text" class="form-control" id="poste" placeholder="Ex:Technicien informatique">
                </div>
                <div id="submit-btn" class="col-auto">
                   <button id="btn" type="submit" @click="signup()" class="btn btn-secondary bg-danger">Inscrivez-vous</button>
                </div>
            </form>
        </div>
    </section>
</template>
<script scoped>
import axios from'axios';
import Header from '../components/Header.vue'
export default {
    name: "SignUp",
    components:{Header,},
    data(){return{
      errors:[],
      email:'',
      password:"",
      nom:"",
      prenom: "",
      poste:"" ,
      validate:false,
    }},
    methods :{      
        signup(response){
            this.validate=false;
            const emailRe = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
            const passwordRe = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
            const nomRE = new RegExp ("^[a-zA-ZÀ-ÿ]+(\\s?\\.?,?'?-?[a-zA-ZÀ-ÿ])+$");
            const posteRe = new RegExp ("^[a-zA-ZÀ-ÿ]+(\\s?\\.?,?'?-?[a-zA-ZÀ-ÿ])+$");
            const self = this;
            this.errors = []

            const user = {
                email: this.email != '' && emailRe.test(this.email),
                password: this.password != '' && passwordRe.test(this.password),
                nom: this.nom != '' && nomRE.test(this.nom),
                prenom: this.prenom != '' && nomRE.test(this.prenom),
                poste: this.poste != '' && posteRe.test(this.poste)
            }

            if(!user.email){            
                this.errors.push("Email invalide ");            
            }
            if(!user.password){
                this.errors.push("Votre Mot de passe doit comporter au Moins 8 caractéres dont : 1 chiffre entre 0 et 9, 1 lettre majuscule et une lettre minuscule.");
            }
            if(!user.nom){
                this.errors.push('Veuillez renseigner votre nom de famille.');
            }
            if(!user.prenom){
                this.errors.push('Veuillez renseigner votre prénom.');
            }
            if(!user.poste){
                this.errors.push('Veuillez renseigner votre fonction dans la société.');
            }
            if(user.email && user.password && user.nom && user.prenom && user.poste){  
                axios.post("http://localhost:3000/api/auth/signup",{
                    email: this.email,
                    password: this.password,
                    nom: this.nom,
                    prenom: this.prenom,
                    position_in_company: this.poste,    
                })
                .then(function(response){
                   let successMsg = document.createElement("p");
                   successMsg.style.color = ("green");
                   successMsg.classList = ("alert alert-success mt-1");
                   successMsg.role = ("alert");
                   successMsg.innerHTML = response.data.message ;
                   document.querySelector("#submit-btn").appendChild(successMsg);
                   let login = document.createElement("a");
                   login.classList = ("login-link");
                   login.href = ("http://localhost:8080/?#/login");
                   login.innerHTML = ("Connectez-vous");
                   successMsg.appendChild(login);
                   self.errors = []
                })
                .catch(function(error) {
                    console.log(error.response.data);
                    self.errors.push(error.response.data.message);
                })                
            }else{ console.log(response);}
        },
    }
}
</script>
<style scoped>
.signup-card {
    border-radius: 1em;
    background-color: #9f8a8a15;
    box-shadow: 0 0 1em rgb(145, 142, 142);
    border:solid 1px #323b3f;
    transition: all 0.3s ease-in
}
.signup-card:hover{
    filter: brightness(105%);
    transform: scale(105%);
    box-shadow: 0 0 1em rgba(213, 48, 48, 0.588);    
}
.name-form{
    display:flex;
    flex-direction: row;
    justify-content:space-evenly;   
}
li{
    color:red;
    list-style: none;
}
</style>