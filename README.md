# PROJET 7 - OPENCLASSROOMS - DEVELOPPEUR WEB

## Groupomania - Réseau social d'entreprise

###  - Les Technologies utilisées :
NodeJs - VueJs - MySQL - Bootstrap 

### INSTALLATION
Dans un premier temps il est nécessaire de cloner ce repository.

## Base de donnée
Dans le dossier backend vous trouverez le fichier bdd.sql à importer  pour créér la base de donnée,un compte administrateur est déja crée par défaut .
Dans le fichier backend/.env vous devrez changer le nom d'utilisateur et le mot de passe si nécessaire:
```
DB_USER = 'root'
DB_PASSWORD = ''
```
## Back-end
Aprés avoir démarré la base de données.
Ouvrez un terminal depuis le dossier backend et tapez les lignes de commandes:
```
npm install
npm start
```
Lorsque le serveur sera démarré vous devriez voir le message suivant:
```
[nodemon] starting `node server.js`
Listening on port 3000
La connection a été établie avec succés 
```

## Front-end
Ouvrez un nouveau terminal depuis le dossier front-end puis tapez les commandes:
```
npm install
npm run serve
```
Cliquez sur le lien renvoyé par le terminal ou bien rendez vous à l'adresse:
```
http://localhost:8080/
```
### Fonctionalités de l'application
Il est possible de :
<ul>
  <li>Partager une publication depuis le fil d'actualité et depuis son propre profil (avec ou sans photo)</li>
  <li>Modifier et supprimer  ses propres publications 
  <li>Commenter une publication</li>
  <li>Supprimer et modifier ses commentaires</li>
  <li>Personnaliser son profil (photo de profil,Nom,adresse-e-mail,changement de mot de passe etc... )</li>
  <li>Consulter, modifier et supprimer ses publications depuis son propre profil</li>
  <li>Consulter le profil des autres utilisateurs en cliquant sur l'avatar de ceux ci sur une publication ou un commentaire</li>
  <li>Supprimer son propre profil</li>
  <li>Se deconnecter</li>
</ul>


### Compte administrateur
Un compte administrateur est crée à des fins de modération ,il peut supprimer et modifier les publications,commentaires et comptes utilisateurs.
```
Email = groupoadmin@gmail.com
Mot de Passe = IaMAdmin01.
```

