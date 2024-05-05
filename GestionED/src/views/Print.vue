<template>
    <div>
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">Impression</a>
          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <!-- Menu déroulant avec les autres options du dashboard principal -->
            <ul class="navbar-nav mr-auto">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <router-link to="/users" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i>Profils</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/stats" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i>Statistiques</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/search" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i>Fonction de recherche</router-link>
                </li>
                <li class="nav-item">
                  <!-- Bouton de retour au dashboard -->
                  <router-link to="/dashboard" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i> Retour au Menu Principal </router-link>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </nav>
    
      <!-- Contenu de la page -->
      <div class="container">
        <!-- Ici vous pouvez ajouter le contenu de la page d'impression -->
        <h1>Impression</h1>
        <p>Sélectionnez le document que vous souhaitez imprimer :</p>
        <ul>
          <li>
            <button @click="imprimerDocument('document1.pdf')">Document 1</button>
          </li>
          <li>
            <button @click="imprimerDocument('document2.pdf')">Document 2</button>
          </li>
          <!-- Ajoutez d'autres documents ici -->
        </ul>
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
      imprimerDocument(nomDocument) {
        // Simuler l'impression du document
        console.log("Impression du document :", nomDocument);
        // Appel de la fonction native d'impression
        window.print();
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar-brand {
    font-weight: bold;
  }
  </style>
  