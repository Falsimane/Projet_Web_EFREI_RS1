<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Tableau de bord</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <button @click="gestionUtilisateurs" class="nav-link btn btn-link">Profils</button>
            </li>
            <li class="nav-item">
              <button @click="afficherStatistiques" class="nav-link btn btn-link">Statistiques</button>
            </li>
            <li class="nav-item">
              <button @click="fonctionRecherche" class="nav-link btn btn-link">Fonction de recherche</button>
            </li>
            <li class="nav-item">
              <button @click="impression" class="nav-link btn btn-link">Impression</button>
            </li>
            <li class="nav-item">
              <button @click="deconnexion" class="nav-link btn btn-link">Déconnexion</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    methods: {
      gestionUtilisateurs() {
        // Redirection vers la page de gestion des utilisateurs
        this.$router.push({ name: 'GestionUtilisateurs' });
      },
      afficherStatistiques() {
        // Redirection vers la page des statistiques
        this.$router.push({ name: 'Statistiques' });
      },
      fonctionRecherche() {
        // Redirection vers la page de fonction de recherche
        this.$router.push({ name: 'FonctionRecherche' });
      },
      impression() {
        // Redirection vers la page d'impression
        this.$router.push({ name: 'Impression' });
      },
      deconnexion() {
        // Code pour gérer la déconnexion de l'utilisateur
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar-brand {
    font-weight: bold;
  }
  </style>
  