<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <!-- Bouton de retour au dashboard -->
          <button @click="retourDashboard" class="btn btn-link mr-3">
            <i class="fas fa-arrow-left"></i> Retour au dashboard
          </button>
          
          <a class="navbar-brand" href="#">Statistiques</a>
          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <!-- Menu déroulant avec les autres options du dashboard principal -->
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Autres options du dashboard
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <button @click="gestionUtilisateurs" class="dropdown-item">Gestion des utilisateurs</button>
                  <button @click="fonctionRecherche" class="dropdown-item">Fonction de recherche</button>
                  <button @click="impression" class="dropdown-item">Impression</button>
                </div>
              </li>
            </ul>
            
            <!-- Boutons de statistiques -->
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <button @click="documentsParType" class="nav-link btn btn-link">Documents par type</button>
              </li>
              <li class="nav-item">
                <button @click="autresStatistiques" class="nav-link btn btn-link">Autres statistiques</button>
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
      gestionUtilisateurs() {
        // Redirection vers la page de gestion des utilisateurs
        this.$router.push({ name: 'GestionUtilisateurs' });
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
  