<template>
    <div class="signup-container">
        <div class="sign-up-title">
            Créez votre compte

        </div>
        <form class="signup-form" @submit="signup">
             <p v-if="errors.length">
                <b>Il y a un problème avec les éléments renseignés dans les champs suivants:</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                 </ul>
            </p>
            <p><label for="email" required>Email: </label>
            <input v-model="email" placeholder="ex:nom.prenom@gmail.com" /></p>
            <p><label for="password" required>Mot de passe: </label>
            <input v-model="password" placeholder="Saisissez ici votre mot de passe" /></p>
            <p><label for="nom" required >Nom: </label>
            <input v-model="nom" placeholder="ex:Dupont" /></p>
            <p><label for="prenom" required>Prénom: </label>
            <input v-model="prenom" placeholder="ex:Jean" /></p>
            <p><label for="poste" required>Fonction dans la société: </label>
            <input v-model="poste" placeholder="ex:Technicien" /></p>
            <p><input label for ="S'inscrire" class="submit-button" type="submit" value="S'incrire"></p>
            
        </form>

    </div>
    
</template>
<script scoped>
import axios from'axios';
export default {
  name: "SignUp",
  data(){return{
      errors:[],
      email:'',
      password:"",
      nom:"",
      prenom: "",
      poste:"" ,
      validate:false,
  }
  },
  methods :{
      
      signup(e){
          
            this.errors=[]
            const emailRe = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
            const passwordRe = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
            const nomRE = new RegExp ("^[a-zA-ZÀ-ÿ]+(\\s?\\.?,?'?-?[a-zA-ZÀ-ÿ])+$");
            const posteRe = new RegExp ("^[a-zA-ZÀ-ÿ]+(\\s?\\.?,?'?-?[a-zA-ZÀ-ÿ])+$");

            if(!this.email || !emailRe.test(this.email)){
            this.errors.push("Email invalide ");
            }
            if(!this.password || !passwordRe.test(this.password)){
                this.errors.push("Votre Mot de passe doit comporter au Moins 8 caractéres dont : 1 chiffre entre 0 et 9, 1 lettre majuscule et une lettre minuscule.")

            }
            if(!this.nom || !nomRE.test(this.nom)){
                this.errors.push('Veuillez renseigner votre nom de famille.')

            }
            if(!this.nom || !nomRE.test(this.prenom)){
                this.errors.push('Veuillez renseigner votre prénom.')
            }
            if(!this.poste || !posteRe.test(this.poste)){
                this.errors.push('Veuillez renseigner votre fonction dans la société.')
            }

            if(!this.errors.length)
            {

                
                  axios.post("http://localhost:3000/api/auth/signup",{
                    email:this.email,
                    password:this.password,
                    nom:this.nom,
                    prenom:this.prenom,
                    position_in_company:this.poste

                })
                .then(function(response){
                    console.log(response)
                })
                
            }else{ 
                        
                        e.preventDefault();
                         
                        }
        
        },
        // postSignup(){
            
        //     if(this.signup){
        //         console.log('hi')
        //         // axios.post("http://localhost:3000/api/auth/signup",{
        //         //     email:this.email,
        //         //     password:this.password,
        //         //     nom:this.nom,
        //         //     prenom:this.prenom,
        //         //     position_in_company:this.poste

        //         // })
        //         // .then(function(response){
        //         //     console.log(response)
        //         // })
        //     }
        // }
    }
}
</script>
<style scoped>


.signup-container{
    grid-column: 4/5;
    grid-row:2/4;
    background: rgba(180, 174, 174, 0.938); 
    border-radius: 1em;
    box-shadow: 0 0 1em rgb(145, 142, 142);
    border:solid 1px #323b3f;
}
.sign-up-title{
    color:white;
    background:#23767C;
    border-radius: 1em 1em 0 0;
    border:solid 1px rgb(61, 59, 59);
}
.signup-form{
    display: flex;
    flex-direction: column;   
}
.signup-form p{
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