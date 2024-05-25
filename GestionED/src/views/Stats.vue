<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand font-weight-bold" href="/stats">
          <img
            src="../assets/images/lettre-v.png"
            alt="Logo"
            width="30"
            height="30"
            class="d-inline-block align-top"
          />
          Statistiques
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link btn btn-link">
                <i class="fas fa-home"></i> Menu Principal</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <h1 class="mb-4 text-center">Statistiques</h1>

      <div v-if="documents.length > 0">
        <h2 class="text-primary">Documents par Type</h2>
        <ul class="list-group mb-4">
          <li
            v-for="document in documents"
            :key="document._id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{{ document.type }}</span>
            <span>{{ document.name }}</span>
            <span>{{ document.size }} bytes</span>
          </li>
        </ul>

        <h2 class="text-primary">Statistiques</h2>
        <table class="table table-striped table-bordered mt-4">
          <thead class="thead-dark">
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

        <div class="mt-4">
          <h3 class="text-primary">Total</h3>
          <p><strong>Nombre total de fichiers :</strong> {{ totalFiles }}</p>
          <p><strong>Taille totale des fichiers :</strong> {{ totalSize }} bytes</p>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Aucun document trouvé.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      documents: [],
      stats: {},
      totalFiles: 0,
      totalSize: 0,
    };
  },
  methods: {
    async fetchDocumentsParType() {
      try {
        const response = await axios.get("http://localhost:5000/api/documents/stats");
        this.documents = response.data;
        this.calculateStats();
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    calculateStats() {
      const stats = {};
      let totalFiles = 0;
      let totalSize = 0;

      this.documents.forEach((doc) => {
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
    },
  },
  created() {
    this.fetchDocumentsParType();
  },
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
.container {
  max-width: 900px;
}
.text-primary {
  color: #007bff;
}
.table {
  margin-top: 20px;
}
.table thead th {
  border-bottom: 2px solid #dee2e6;
}
.table tbody tr {
  border-top: 1px solid #dee2e6;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>