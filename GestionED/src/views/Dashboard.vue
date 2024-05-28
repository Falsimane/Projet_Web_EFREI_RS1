<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand font-weight-bold" href="/dashboard">
          <img
            src="../assets/images/lettre-v.png"
            alt="Logo"
            width="30"
            height="30"
            class="d-inline-block align-top"
          />
          Gestion des documents
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
              <router-link to="/stats" class="nav-link btn btn-link">
                <i class="fas fa-home"></i> Statistiques</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/users" class="nav-link btn btn-link">
                <i class="fas fa-home"></i>Gestion des utilisateurs</router-link
              >
            </li>
          </ul>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <button @click="logout" class="nav-link btn btn-link text-white">
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenu de la page -->
    <div class="container mt-5 pt-5">
      <div class="card shadow-sm rounded mb-4">
        <div class="card-body">
          <h2 class="mb-4">Télécharger un Fichier</h2>
          <div class="input-group mb-3">
            <input type="file" class="form-control" @change="handleFileUpload" />
          </div>
          <div class="input-group mb-3">
            <input
              v-model="fileInfo.type"
              class="form-control"
              placeholder="Type"
            />
          </div>
          <div class="input-group mb-3">
            <input
              v-model="fileInfo.description"
              class="form-control"
              placeholder="Description"
            />
          </div>
          <button class="btn btn-primary rounded mb-4" @click="uploadFile">
            Ajouter à la base de données
          </button>
        </div>
      </div>

      <!-- Liste des Fichiers -->
      <div class="card shadow-sm rounded">
        <div class="card-body">
          <h2>Liste des Fichiers</h2>
          
          <!-- Formulaire de recherche intégré -->
          <form @submit.prevent="rechercher" class="mb-4">
            <div class="form-group">
              <label for="searchInput">Entrez votre recherche :</label>
              <div class="input-group">
                <input type="text" v-model="searchQuery" class="form-control" id="searchInput" placeholder="Recherche..." />
                <div class="input-group-append">
                  <button type="submit" class="btn btn-primary">Rechercher</button>
                </div>
              </div>
            </div>
          </form>

          <!-- Résultats de la recherche -->
          <div v-if="searchResults.length > 0" class="mt-4">
            <h3>Résultats de la recherche :</h3>
            <ul class="list-group">
              <li v-for="(result, index) in searchResults" :key="index" class="list-group-item">{{ result.name }}</li>
            </ul>
          </div>
          <div v-else class="mt-4">
            <p v-if="searchQuery">Aucun résultat trouvé pour la recherche "{{ searchQuery }}"</p>
          </div>

          <!-- Liste des Fichiers -->
          <ul class="list-group">
            <li
              class="list-group-item d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3 rounded shadow-sm"
              v-for="file in filesList"
              :key="file.name"
            >
              <div class="w-100 w-md-25 p-2 font-weight-bold">{{ file.name }}</div>
              <div class="w-100 w-md-25 p-2">{{ file.size }} bytes</div>
              <div class="w-100 w-md-25 p-2">{{ file.date }}</div>
              <div class="w-100 w-md-25 p-2">{{ file.path }}</div>
              <div class="w-100 w-md-25 p-2">
                <input v-model="file.type" class="form-control mb-2" placeholder="Type" />
                <input
                  v-model="file.description"
                  class="form-control mb-2"
                  placeholder="Description"
                />
              </div>
              <div class="d-flex justify-content-between w-100 w-md-75 mt-2 mt-md-0">
                <button
                  class="btn btn-secondary rounded me-2"
                  @click="downloadFile(file.name)"
                >
                  Télécharger
                </button>
                <button class="btn btn-danger rounded" @click="deleteFile(file.name)">
                  Supprimer
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filesList: [],
      file: null,
      fileInfo: {
        name: "",
        type: "",
        description: "",
      },
      searchQuery: '', // Contiendra la recherche de l'utilisateur
      searchResults: [] // Contiendra les résultats de la recherche
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/");
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.fileInfo.name = this.file.name;
    },
    async uploadFile() {
      if (!this.file) {
        alert("Veuillez sélectionner un fichier avant de l'ajouter.");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("type", this.fileInfo.type);
      formData.append("description", this.fileInfo.description);

      try {
        await axios.post("http://localhost:5000/api/documents", formData);
        const metadata = {
          type: this.fileInfo.type || "Unknown", // Capture the type or default to 'Unknown'
          name: this.file.name,
          description: this.fileInfo.description || "",
          size: this.file.size,
          filePath: `C:/Users/arnau/Documents/Stockage/${this.file.name}`,
        };
        await axios.post("http://localhost:5000/api/documents/add", metadata);
        alert(`Fichier ${this.file.name} ajouté avec succès à la base de données`);

        this.fileInfo = { name: "", type: "", description: "" };
        this.file = null;
        this.fetchFiles();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    async fetchFiles() {
      try {
        const response = await axios.get("http://localhost:5000/api/documents");
        this.filesList = response.data;
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    },
    async downloadFile(fileName) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/documents/download/${fileName}`,
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },
    confirmDeleteFile(fileName) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) {
        this.deleteFile(fileName);
      }
    },
    async deleteFile(fileName) {
      try {
        console.log(`Deleting file: ${fileName}`);
        await axios.delete(`http://localhost:5000/api/documents/delete/${fileName}`);
        this.fetchFiles();
      } catch (error) {
        this.fetchFiles();
      }
    },
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
  },
  created() {
    this.fetchFiles();
  },
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
.navbar {
  background-color: #007bff !important;
}

.navbar-brand,
.nav-link {
  color: #fff !important;
}

.navbar-toggler-icon {
  background-color: #fff !important;
}

.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border-radius: 10px;
}

.card-body {
  background-color: #f8f9fa;
}

.file-details > div {
  margin-bottom: 5px;
}

.file-actions > * {
  margin-right: 5px;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.list-group-item {
  border: 1px solid rgba(0, 0, 0, 0.125) !important;
  border-radius: 10px;
}

.list-group-item .btn {
  border-radius: 20px;
}

input[type="file"] {
  border-radius: 20px;
}
</style>
