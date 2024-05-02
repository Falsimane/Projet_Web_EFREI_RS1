const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const utilisateursRoutes = require('./routes/utilisateurs.routes.js');

const app = express();

// Parse JSON bodies
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Connexion à MongoDB
const dbConfig = require('./config/db.config');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connexion à la base de données réussie !");
}).catch(err => {
    console.error("Erreur lors de la connexion à la base de données :", err);
    process.exit();
});

// Routes
app.use('/api/utilisateurs', utilisateursRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});