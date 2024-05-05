<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">Statistiques</a>
          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <!-- Boutons de statistiques -->
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <button @click="documentsParType" class="nav-link btn btn-link">Documents par type</button>
              </li>
              <li class="nav-item">
                <button @click="autresStatistiques" class="nav-link btn btn-link">Autres statistiques</button>
              </li>
              <li class="nav-item">
                <router-link to="/users" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i>Profils</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/search" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i>Fonction de recherche</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/print" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i>Impression</router-link>
              </li>
              <li class="nav-item">
                <!-- Bouton de retour au dashboard -->
                <router-link to="/dashboard" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i> Retour au Menu Principal </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <!-- Contenu de la page -->
      <div class="container">
        <!-- Ici vous pouvez ajouter le contenu des statistiques -->
        <p>Contenu de la page des statistiques...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      retourDashboard() {
        // Redirection vers le dashboard
        this.$router.push({ name: 'Dashboard' });
      },
      afficherProfils() {
        // Redirection vers la page de gestion des utilisateurs
        this.$router.push({ name: 'Profils' });
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
      documentsParType() {
        // Redirection vers la page affichant les documents par type
        this.$router.push({ name: 'DocumentsParType' });
      },
      autresStatistiques() {
        // Redirection vers d'autres statistiques
        this.$router.push({ name: 'AutresStatistiques' });
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar-brand {
    font-weight: bold;
  }
  </style>
  