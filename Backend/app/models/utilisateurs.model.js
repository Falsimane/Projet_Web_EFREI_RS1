const db = require("../models");
const Utilisateur = db.utilisateurs;

exports.create = (req, res) => {
    if (!req.body.nom || !req.body.prenom || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "Veuillez remplir tous les champs!" });
        return;
    }

    const utilisateur = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    });

    utilisateur.save(utilisateur)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la création de l'utilisateur."
            });
        });
};