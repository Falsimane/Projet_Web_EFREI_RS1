<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-primary text-white shadow-sm fixed-top"
  >
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
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/users" class="nav-link text-white">Profils</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/stats" class="nav-link text-white"
              >Statistiques</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/search" class="nav-link text-white">Recherche</router-link>
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
  <div class="container mt-5 pt-5">
    <div class="card">
      <div class="card-body">
        <h2 class="mb-4">Télécharger un Fichier</h2>
        <div class="input-group mb-3">
          <input type="file" class="form-control" @change="handleFileUpload" />
        </div>

        <h2>Liste des Fichiers</h2>
        <ul class="list-group">
          <li class="list-group-item d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3" v-for="file in filesList" :key="file.name">
            <div class="w-100 w-md-25 p-2">{{ file.name }}</div>
            <div class="w-100 w-md-25 p-2">{{ file.size }} bytes</div>
            <div class="w-100 w-md-25 p-2">{{ file.date }}</div>
            <div class="w-100 w-md-25 p-2">{{ file.path }}</div>
            <div class="w-100 w-md-25 p-2">
              <input v-model="file.type" class="form-control mb-2" placeholder="Type">
              <input v-model="file.description" class="form-control mb-2" placeholder="Description">
            </div>
            <div class="d-flex justify-content-between w-100 w-md-75 mt-2 mt-md-0">
              <button class="btn btn-primary me-2" @click="addFileToDB(file)">Ajouter à la base de Données</button>
              <button class="btn btn-secondary me-2" @click="downloadFile(file.name)">Télécharger</button>
              <button class="btn btn-danger" @click="deleteFile(file.name)">Supprimer</button>
            </div>
          </li>
        </ul>

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
        type: "",
        description: "",
      },
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
      this.uploadFile();
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("type", this.fileInfo.type);
      formData.append("description", this.fileInfo.description);

      try {
        await axios.post("http://localhost:5000/api/documents", formData);
        this.fileInfo = { type: "", description: "" };
        this.file = null;
        this.fetchFiles();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    async addFileToDB(file) {
      const metadata = {
        type: file.type || 'Unknown', // Capture the type or default to 'Unknown'
        name: file.name,
        description: file.description || '',
        size: file.size,
        filePath: `C:/Users/arnau/Documents/Stockage/${file.name}`
      };

      try {
        await axios.post('http://localhost:5000/api/documents/add', metadata);
        alert("Fichier ajouté avec succès à la base de données");
      } catch (error) {
        console.error('Error adding file metadata to database:', error);
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
  },
  created() {
    this.fetchFiles();
  },
};
</script>

<style scoped>
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
</style>
