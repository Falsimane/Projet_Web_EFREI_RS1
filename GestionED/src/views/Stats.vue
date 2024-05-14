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
              <button @click="fetchDocumentsParType" class="nav-link btn btn-link">Documents par type</button>
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
      <h1>Statistiques</h1>
      
      <!-- Contenu des statistiques -->
      <div v-if="documents.length > 0">
        <h2>Documents par Type</h2>
        <ul class="list-group">
          <li v-for="document in documents" :key="document._id" class="list-group-item">
            {{ document.type }} - {{ document.name }} - {{ document.size }} bytes
          </li>
        </ul>
        <h2>Statistiques</h2>
        <table class="table mt-4">
          <thead>
            <tr>
              <th>Type</th>
              <th>Nombre de fichiers</th>
              <th>Taille totale (bytes)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stat, type) in stats" :key="type">
              <td>{{ type }}</td>
              <td>{{ stat.count }}</td>
              <td>{{ stat.totalSize }}</td>
            </tr>
          </tbody>
        </table>
        <h3>Total</h3>
        <p>Nombre total de fichiers : {{ totalFiles }}</p>
        <p>Taille totale des fichiers : {{ totalSize }} bytes</p>
      </div>
      <div v-else>
        <p>Aucun document trouvé.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      documents: [],
      stats: {},
      totalFiles: 0,
      totalSize: 0
    };
  },
  methods: {
    async fetchDocumentsParType() {
      try {
        const response = await axios.get('http://localhost:5000/api/documents/stats');
        this.documents = response.data;
        this.calculateStats();
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    },
    calculateStats() {
      const stats = {};
      let totalFiles = 0;
      let totalSize = 0;

      this.documents.forEach(doc => {
        if (!stats[doc.type]) {
          stats[doc.type] = { count: 0, totalSize: 0 };
        }
        stats[doc.type].count += 1;
        stats[doc.type].totalSize += doc.size;
        totalFiles += 1;
        totalSize += doc.size;
      });

      this.stats = stats;
      this.totalFiles = totalFiles;
      this.totalSize = totalSize;
    },
    autresStatistiques() {
      // Implémentez ici la logique pour afficher d'autres statistiques
    }
  },
  created() {
    this.fetchDocumentsParType();
  }
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
</style>
