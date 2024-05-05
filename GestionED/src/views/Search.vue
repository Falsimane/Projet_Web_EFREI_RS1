<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <!-- Bouton de retour au dashboard -->
          <router-link to="/dashboard" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i> Retour au Menu Principal </router-link>
          
          <a class="navbar-brand" href="#">Fonction de recherche</a>
          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <!-- Menu déroulant avec les autres options du dashboard principal -->
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Options du dashboard
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <button @click="afficherProfils" class="dropdown-item">Profils</button>
                  <button @click="afficherStatistiques" class="dropdown-item">Statistiques</button>
                  <button @click="fonctionRecherche" class="dropdown-item">Fonction de recherche</button>
                  <button @click="impression" class="dropdown-item">Impression</button>
                </div>
              </li>
              <ul class="navbar-nav ml-auto">
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
        <!-- Ici vous pouvez ajouter le contenu de la page de fonction de recherche -->
        <h1>Fonction de recherche</h1>
        
        <!-- Formulaire de recherche -->
        <form @submit.prevent="rechercher" class="mt-4">
          <div class="form-group">
            <label for="searchInput">Entrez votre recherche :</label>
            <input type="text" v-model="searchQuery" class="form-control" id="searchInput" placeholder="Recherche...">
          </div>
          <button type="submit" class="btn btn-primary">Rechercher</button>
        </form>
        
        <!-- Résultats de la recherche -->
        <div v-if="searchResults.length > 0" class="mt-4">
          <h3>Résultats de la recherche :</h3>
          <ul class="list-group">
            <li v-for="(result, index) in searchResults" :key="index" class="list-group-item">{{ result }}</li>
          </ul>
        </div>
        <div v-else class="mt-4">
          <p>Aucun résultat trouvé pour la recherche "{{ searchQuery }}"</p>
        </div>

        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '', // Contiendra la recherche de l'utilisateur
        searchResults: [] // Contiendra les résultats de la recherche
      };
    },
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
      rechercher() {
        // Simuler une recherche (à remplacer par votre logique de recherche réelle)
        // Ici, nous stockons simplement la requête de recherche dans les résultats
        this.searchResults.push(this.searchQuery);
        
        // Réinitialiser la requête de recherche après la recherche
        this.searchQuery = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar-brand {
    font-weight: bold;
  }
  </style>
  