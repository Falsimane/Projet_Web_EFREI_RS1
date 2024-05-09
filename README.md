# Projet_Web_EFREI_RS1

Pour lancer le node.js, utilisez la commande : node server.js.

On a besoin, avant ça, du module "express".
arnaud@Arnaud:~/C/Efrei/S6/Dev_Web/Javascript/Projet/Projet_Web_EFREI_RS1/Backend$ npm install express

Créer une base de données que vous appellez : WebUsers et une collection que vous appelez users
Ensuite, il faut lancer le backend avec node server.js
Ensuite vous pouvez lancer le front

Se connecter en ligne de commande à MongoDB : 
    root@Arnaud:/var/lib/mongodb# mongosh

Créer un context : 
    test> use WebUsers

Pour créer une collection
WebUsers> db.users.insertOne({
    name: "Manu",
    firstname: "Macron",
    email: "manu.macron@gmail.com",
    password: "era11sod2001!"}
)

Pour chercher les enregistrements se trouvant dans la collection users, faire la commande : 
    WebUsers> db.users.find()

Lister les collections : 
WebUsers> show collections
    User
    users

Supprimer une collection : 
WebUsers> db.User.drop()
true