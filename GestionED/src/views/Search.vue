<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Fonction de recherche</a>
        
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
          <li v-for="(result, index) in searchResults" :key="index" class="list-group-item">{{ result.name }}</li>
        </ul>
      </div>
      <div v-else class="mt-4">
        <p>Aucun résultat trouvé pour la recherche "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '', // Contiendra la recherche de l'utilisateur
      searchResults: [] // Contiendra les résultats de la recherche
    };
  },
  methods: {
    async rechercher() {
      try {
        const response = await axios.get('http://localhost:5000/api/documents/search', {
          params: { name: this.searchQuery }
        });
        this.searchResults = response.data;
      } catch (error) {
        console.error('Error searching for documents:', error);
      }
    }
  }
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
</style>
