const db = require("../models");
const Utilisateur = db.utilisateurs;

// Create and Save a new Utilisateur
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Utilisateur
    const utilisateur = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    });

    // Save Utilisateur in the database
    utilisateur
        .save(utilisateur)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Utilisateur."
            });
        });
};
