<template>
    <div class="login-container">
        <div class="login-title">
            Connectez-vous

        </div>
        <form class="login-form" @submit="login">
             <p v-if="errors.length">
                <b>Il y a un problème avec les éléments renseignés dans les champs suivants:</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                 </ul>
            </p>
            <p><label for="email">Email: </label>
            <input v-model="email" placeholder="ex:nom.prenom@gmail.com" /></p>
            <p><label for="password" required>Mot de passe: </label>
            <input v-model="password" placeholder="Saisissez ici votre mot de passe" /></p>
            <p><input label for ="Se connecter" class="submit-button" type="submit" value="Se connecter"></p>
            
        </form>

    </div>
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
                    localStorage.setItem("isAdmin",response.data.isAdmin);
                    localStorage.setItem('userId',response.data.user_id);
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
.login-container{
    grid-column: 2/3;
    grid-row:2/3;
    background: rgba(180, 174, 174, 0.938); 
    border-radius: 1em;
    box-shadow: 0 0 1em rgb(145, 142, 142);
    border:solid 1px #323b3f;
}
.login-title{
    color:white;
    background:#23767C;
    border-radius: 1em 1em 0 0;
    border:solid 1px rgb(61, 59, 59);
}
.login-form{
    display: flex;
    flex-direction: column;   
}
.login-form p{
    display:flex;
    
    flex-direction: column;
    text-align: start;
    margin:1em;
}
.submit-button{
    width:80%;
    height:2.5em;
    color:white;
    background: #23767C;
    border: solid 1px black;
    margin: auto;
    box-shadow:0 0 1em #323b3f;
    border-radius:1em;
}
.submit-button:hover{
    transform: scale(1.1);
    transition:0.3s;
    filter:brightness(1.2) drop-shadow(0px 0px grey);
}
li{
    color:red;

}
</style>