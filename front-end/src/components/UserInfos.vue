<template>
    <section class="container-fluid border py-2 edit-profil">
        <form class="profile-pic col-12 col-md-3" @submit.prevent="ChangeProfilPic">
            <img class="img-fluid rounded-circle mt-3 " v-bind:src="user.imageUrl" 
                alt="Avatar de l'utilisateur">
            <div class="editpic" v-if="userId==user.user_id||isAdmin==1">
                <FileButton 
                    :Message ="`Modifiez votre avatar`"
                    :uploadFile = "uploadImg"
                    :file_name="file_name"
                    :new_file="new_file"
                />
                <div class="mt-2 mb-3">
                    <button class="btn-sm rounded-pill bg-gradient text-white custom-btn" type="submit">Valider</button>
                </div>
            </div>
        </form>
        <div class="user-infos border container-fluid text-white col-11 col-md-8 ms-3">
            <!-- User Infos -->
            <h2 v-if="userId==user.user_id||isAdmin==1" >Votre Profil</h2>
            <h2 v-else>Profil de l'utilisateur</h2>
            <span class="user-name col-12"><h3>Nom: </h3> {{user.nom}} <h3> Prénom: </h3> {{user.prenom}}</span>
            <span class="e-mail col-12"><h3>Poste: </h3>{{user.position_in_company}}</span>
            <span class="e-mail col-12"><h3>e-mail: </h3>{{user.email}}</span>
            <!-- End User Infos -->
            <button v-if="userId==user.user_id||isAdmin==1" id="name-edit" 
                @click="isEditingInfos" class="btn text-danger button-update" alt="Modifier le profil" 
                aria-label="Modifier le profil" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
            <label v-if="userId==user.user_id||isAdmin==1" for="#name-edit"><h4>Modifier ces informations</h4></label>
            <button v-if="userId==user.user_id||isAdmin==1" @click="isDeletingProfil" id="delete-profil" 
                alt="Supprimer le profil" aria-label="Supprimer le Profil" 
                type="button" class="btn text-danger button-update"><i class="fa-solid fa-trash-can"></i>
            </button>
            <label v-if="userId==user.user_id||isAdmin==1" for="#delete-profil"><h4>Supprimer votre profil</h4></label>
            <!-- Delete account card -->
            <div id="delete-profil-card" class="card d-none">
                <div class="card-rounded">
                    <div class="card-header row m-1 bg-gradient text-white custom-header">
                        <span class="card-title col 9 col-md-10 ms-5">Modifier vos informations</span>
                        <button type="button" class="btn-close bg-secondary col-1 ms-auto pt-2"
                            @click="closeIsDeleting" aria-label="Fermer">
                        </button>
                    </div>
                    <div class="row text-danger card-body">
                        <p>Vous êtes sur le point de supprimer le compte {{user.nom}} {{user.prenom}}!</p><br>
                        <p>La suppression sera définitive</p>
                        <div class="row">
                            <button type="submit" @click="deleteProfil()" alt="Confirmer la Suppression" 
                                aria-label="Confirmer la suppression" class="btn-sm col-4 mx-auto my-1 text-white custom-btn">Confirmer</button>
                            <button type="button" class="btn-sm btn-secondary col-4 my-1 mx-auto return-btn" 
                                @click="closeIsDeleting" alt="Annuler" aria-label="Annuler">Annuler
                            </button>
                        </div>    
                    </div>
                </div>
            </div>
            <!-- End delete account card -->
            <!-- Edit Profil card -->
            <div  id="edit-infos-card" class="card d-none">
                <div class="card-rounded">
                    <div class="card-header row m-1 bg-gradient text-white custom-header">
                        <span class="card-title col 9 col-md-10 ms-5">Modifier vos informations</span>
                        <button type="button" class="btn-close bg-secondary col-1 ms-auto pt-2"
                         @click.prevent="closeIsEditingInfos(user.user_id)" aria-label="Close"></button>
                    </div>
                    <div class="row text-dark card-body">
                        <form class="form-group col-md-6 mb-2" @submit.prevent="false" >
                            <label for="nom" class="col-form-label">Nom</label>
                            <input @keyup="validName" v-model="nom" type="text" class="form-control" id="nom" aria-describedby="button-nom">
                            <button class="btn-sm text-white mt-1 custom-btn" @click="changeName()" type="submit">Editer</button>
                            <p v-if="success.nom != ''" class="alert text-success alert-success" id="nom-msg">{{success.nom}}</p>
                            <p v-if="errors.nom != ''" class="alert text-success text-danger" id="nom-msg">{{errors.nom}}</p>
                        </form>
                        <form class="form-group col-md-6 mb-2" @submit.prevent="false">
                            <label for="prenom" class="col-form-label">Prénom</label>
                            <input @keyup="validPrenom" v-model = "prenom" type="text" class="form-control" id="prenom">
                            <button class="btn-sm text-white mt-1 custom-btn" @click="changePrenom()" type = "submit">Editer</button>
                            <p v-if="success.prenom != ''" class="alert text-success alert-success" id="prenom-msg">{{success.prenom}}</p>
                            <p v-if="errors.prenom != ''" class="alert text-success text-danger" id="prenom-msg">{{errors.prenom}}</p>
                        </form>
                        <form class="form-group col-md-6 mb-2" @submit.prevent ="false">
                            <label  for = "Email" class="col-form-label">Email</label>
                            <input  @keyup="validMail" v-model="Email" type="text" class="form-control" id="Email" >
                            <button class="btn-sm text-white mt-1 custom-btn" @click="changeMail()" type = "submit">Editer</button>
                            <p v-if="success.email != ''" class = "alert text-success alert-success" id="mail-msg">{{success.email}}</p>
                            <p v-if="errors.email != ''" class = "alert text-success text-danger" id="mail-msg">{{errors.email}}</p>
                        </form>
                        <form class="form-group col-md-6 mb-3" @submit.prevent="false">
                            <label  for="job" class="col-form-label">Poste</label>
                            <input v-model="job" type = "text" class="form-control" id = "job" >
                            <button class="btn-sm text-white mt-1 custom-btn"  @click="changeJob()" type="submit">Editer</button>
                            <p v-if="success.job != ''" class="alert text-success alert-success" id="job-msg">{{success.job}}</p>
                            <p v-if="errors.job != ''" class="alert text-success text-danger" id="job-msg">{{errors.job}}</p>
                        </form>
                        <form class="form-group col-12 mb-2">
                            <label for="password" class="col-form-label">Nouveau mot de passe</label>
                            <input  @keyup="validPassword" v-model="password" type="password" class="form-control" id="password">
                            <p v-if="success.password != ''" class="alert text-success alert-success" id="password-msg">{{success.password}}</p>
                            <p v-if="errors.password != ''" class="alert text-success text-danger" id="password-msg">{{errors.password}}</p>
                        </form>
                        <form class="form-group col-12 mb-2" @submit.prevent="false">
                            <label for="passwordConfirm" class="col-form-label">Confirmer le mot de passe</label>
                            <input @keyup="passwordConfirmation" v-model="passwordConfirm" type="password" class="form-control" id="passwordConfirm">
                            <button class="btn-sm text-white mt-1 custom-btn" @click="changePassword()" type="submit">Editer</button>
                            <p v-if="success.passwordConfirm != ''" class="alert text-success alert-success" id="passwordConfirm-msg">{{success.passwordConfirm}}</p>
                            <p v-if="errors.passwordConfirm != ''" class="alert text-success text-danger" id="passwordConfirm-msg">{{errors.passwordConfirm}}</p>
                        </form>
                    </div>   
                </div>
            </div>  
            <!-- End Edit Profil card    -->
        </div>
    </section>
</template>
<script>
import axios from 'axios'
import FileButton from '../components/FileButton.vue'
export default ({
    props:["getUserUpdated"],
    name:"UserInfos",
    components:{
        FileButton,
    },
    data() {
        return {
            user:[],
            userId : localStorage.getItem('userId'),
            token : localStorage.getItem('token'),
            isAdmin :localStorage.getItem('isAdmin'),
            img :"",
            errors:{ 
                nom:"",
                prenom:"",
                email:"",
                job:"",
                password:"",
                passwordConfirm:"",
            },
            success: {
                nom:"",
                prenom:"",
                email:"",
                job:"",
                password:"",
                passwordConfirm:"",
            },
            nom:"",
            prenom:"",
            Email:"",
            job:"",
            password:"",
            passwordConfirm:"",
            validation:{ 
                nom:false,
                prenom:false,
                email:false,
                password:false,
                confirmPassword:false,
            },
            file_name: '',
            new_file: ''
        }
    },
    created(){
       this.getUserInfos();
    },
    methods: {
        getUserInfos:function (){
            const self = this;
            axios.get(`http://localhost:3000/api/auth/user/profile/${self.$route.params.id}`,{
               headers:{ 
                    Authorization: `Bearer ${self.token}` 
               }
           })
           .then( response => {
                self.user = response.data[0];
                self.getUserUpdated(self.user);
           })
           .catch(error => {
                console.log (error);
                self.$router.push("/");
           })
        },
        uploadImg:function (newfile){
            this.img = newfile;
        },
        ChangeProfilPic:function (e){
            const data = new FormData();
            const self =this;
            for (const i of Object.keys(this.img)) {
                data.append('files', this.img[i]);
            }
          if(this.img){
                data.append("image",this.img)
                axios.put(`http://localhost:3000/api/auth/user/profile/image/${this.userId}`,data,{
                 headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${this.token}`,
                 },
                })
                .then(function(response){
                    console.log(response.data.message);
                    self.file_name = ''
                    self.new_file = ''
                    self.getUserInfos();
                })
                .catch(error => {console.log(error)});
            }
            else{
                e.preventDefault();
            }
        },
        isDeletingProfil:function(){
            document.getElementById("delete-profil-card").className = "card";
        },
        closeIsDeleting:function(){
            document.getElementById("delete-profil-card").className = "card d-none";
        },
        deleteProfil:function(){
            const self = this;
            axios.delete(`http://localhost:3000/api/auth/user/profile/${this.userId}`,
                {headers:{
                    Authorization: `Bearer ${self.token}`
                }
            })
            .then (function (response){
                console.log(response);
                self.$router.push("/");
            })
            .catch(error => {console.log(error)});
        },
        isEditingInfos:function(){
            document.getElementById("edit-infos-card").className = "card";
            this.nom = this.user.nom;
            this.prenom = this.user.prenom;
            this.Email = this.user.email;
            this.job = this.user.position_in_company;
        },
        closeIsEditingInfos:function(){
            document.getElementById("edit-infos-card").className = "card d-none"
            this.getUserInfos();
        },
        changeName:function(response){
            const self = this ;
            if(self.validation.nom == true){
                axios.put(`http://localhost:3000/api/auth/user/profile/${this.userId}`,{
                    nom:self.nom,
                    prenom:"",
                    email:"",
                    position_in_company:"",},
                    {headers:{
                        Authorization: `Bearer ${self.token}`
                    }}
                )
                .then (function (response){
                    self.success.nom = response.data.message
                    self.errors.nom = ''
                })
                .catch(error => {console.log(error)});
            }else{ 
                self.success.nom = ''
                self.errors.nom = response.data.message
            }
        },
        validName:function(){
            const nomRE = new RegExp ("^[a-zA-ZÀ-ÿ]+(\\s?\\.?,?'?-?[a-zA-ZÀ-ÿ])+$");
            const self = this;
            if(!self.nom||!nomRE.test(self.nom)){
                document.getElementById("nom").className = "form-control is-invalid" ; 
                self.errors.nom = "Le nom que vous avez choisi semble particulier!";
                self.success.nom = ''
                self.validation.nom = false ;   
            }else{
                document.getElementById("nom").className = "form-control is-valid" ;
                self.errors.nom = "";
                self.validation.nom = true;
            }
        },
        changePrenom:function(response){
            const self = this;
            if(self.validation.prenom == true){
                axios.put(`http://localhost:3000/api/auth/user/profile/${this.userId}`,{
                    nom:"",
                    prenom:self.prenom,
                    email:"",
                    position_in_company:"",},
                    {headers:{
                        Authorization: `Bearer ${self.token}`
                    }}
                )
                .then (function (response){
                    self.success.prenom = response.data.message
                    self.errors.prenom = ''
                })
                .catch(error => {console.log(error)});
            }else{ 
                    self.success.prenom = ''
                    self.errors.prenom = response.data.message
                }
        },
        validPrenom:function(){
            const nomRE = new RegExp ("^[a-zA-ZÀ-ÿ]+(\\s?\\.?,?'?-?[a-zA-ZÀ-ÿ])+$");
            const self = this;
            if(!self.prenom||!nomRE.test(self.prenom)){
                document.getElementById("prenom").className = "form-control is-invalid";
                self.errors.prenom = "Le Prénom choisi n'est pas admis sur cette planéte!";
                self.success.prenom = ''
                self.validation.prenom = false;
            }else{ 
                document.getElementById("prenom").className = "form-control is-valid";
                self.errors.prenom = "";
                self.validation.prenom = true;
            }
        },
        changeMail:function(response){
            const self = this; 
            if(self.validation.email == true){
                axios.put(`http://localhost:3000/api/auth/user/profile/${this.userId}`,{
                    nom:"",
                    prenom:"",
                    email:self.Email,
                    position_in_company:"",},
                        {headers:{
                            Authorization: `Bearer ${self.token}`
                        }}
                )
                .then (function (response){
                    
                    self.success.email = response.data.message
                    self.errors.email = ''
                    
                })
                    .catch(error => {console.log(error)});
            }else{
                self.success.email = ''
                self.errors.email = response.data.message
            }
        },
        validMail:function(){
            const emailRE = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
            const self = this
            if(!self.Email||!emailRE.test(self.Email)){
                document.getElementById("Email").className = "form-control is-invalid";
                self.errors.email="Votre adresse email parait infernale!";
                self.success.email = ''
                self.validation.email = false;
            }else{
                document.getElementById("Email").className = "form-control is-valid";
                self.errors.email = "";
                self.validation.email = true;
            }               
        },
        changeJob:function(){
            if(this.job != ""){
                const self = this
                axios.put(`http://localhost:3000/api/auth/user/profile/${this.userId}`,{
                    nom:"",
                    prenom:"",
                    email:"",
                    position_in_company:self.job,},
                    {headers:{
                        Authorization: `Bearer ${self.token}`
                        }    
                })
                .then (function (response){
                        self.success.job = response.data.message
                        self.errors.job = ''
                    })
                .catch(error => {console.log(error)});
            }else{ 
                self.success.job = ''
                self.errors.job = 'Veuillez completer le champs'
            }     
        },
        changePassword:function(response){
            const self = this;
            if(self.validation.confirmPassword == true){
                const self = this
                axios.put(`http://localhost:3000/api/auth/user/profile/password/${this.userId}`,
                    {password:self.passwordConfirm,},
                    {headers:{Authorization: `Bearer ${self.token}`}}
                )
                .then (function (response){
                    self.success.passwordConfirm = response.data.message
                    self.errors.passwordConfirm = ''

                })
                .catch(error => {console.log(error)});
            }else{ 
                self.success.passwordConfirm = ''
                self.errors.passwordConfirm = response.data.message
            }     
        },
        validPassword:function(){
            const passwordRe = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
            const self = this;
            if(!self.password||!passwordRe.test(self.password)){
                document.getElementById("password").className = "form-control is-invalid";
                self.success.passwordConfirm = ''
                self.errors.password=
                "Votre Mot de passe doit comporter au Moins 8 caractéres dont : 1 chiffre entre 0 et 9, 1 lettre majuscule et une lettre minuscule.";
                self.validation.password = false;
            }else{
                document.getElementById("password").className = "form-control is-valid";
                self.errors.password = "";
                self.validation.password = true;
            }
        },
        passwordConfirmation:function(){
            const self = this;
            if(self.validation.password == true && self.passwordConfirm === self.password){
                document.getElementById("passwordConfirm").className = "form-control is-valid";
                document.getElementById("passwordConfirm-msg").className = "text-success";
                self.errors.passwordConfirm = "Vos mots de passe sont identiques";
                self.validation.confirmPassword = true;
            }else{ document.getElementById("passwordConfirm").className = "form-control is-invalid";
                self.errors.passwordConfirm = "Vos mots de passe sont différents";
                self.validation.confirmPassword = false;
            }
        },
    },       
})
</script>
<style scoped>
h2{
    color:#FD2D01;
    font-size:1.3rem;
}
h3{
    margin:0 6px 0;
    color: rgb(246 238 243 / 56%);
    font-size:1.1rem;
}
h4{
    font-size:0.8rem;
    color:#FD2D01;
}
.edit-profil{
    display: flex;
    flex-direction: row;
}
@media (max-width: 770px){
    .edit-profil{
        display:flex;
        flex-direction: column;
    }
}
.user-name{
    display:flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
}
.e-mail{
    display:flex;
    justify-content: center;
    align-items: center;
}
.input-group{
    display:block;
}
.edit-profil{
    background:rgb(68, 67, 70);
}
.profile-pic img{
    height:7rem;
    width:7rem;
    object-fit: cover;
}
</style>