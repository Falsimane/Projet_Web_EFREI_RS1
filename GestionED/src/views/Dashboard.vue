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
            <!-- Redirection vers la page "Profils" -->
            <router-link to="/users" class="nav-link btn btn-link">Profils</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/stats" class="nav-link btn btn-link">Statistiques</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/search" class="nav-link btn btn-link">Fonction de recherche</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/print" class="nav-link btn btn-link">Impression</router-link>
          </li>
          <li class="nav-item">
            <button @click="logout" class="nav-link btn btn-link">Déconnexion</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>

  <h2>Télécharger un Fichier</h2>
  <input type="file" @change="handleFileUpload">
  
  <h2>Liste des Fichiers</h2>
  <ul class="list-group">
    <li class="list-group-item" v-for="file in filesList" :key="file.name">
      <div class="w-25 p-0">{{ file.name }}</div>
      <div class="w-25 p-0">{{ file.size }} bytes</div>
      <div class="w-25 p-0">{{ file.date }}</div>
      <div class="w-25 p-0">{{ file.path }}</div>
      <input v-model="file.type" placeholder="Type">
      <input v-model="file.description" placeholder="Description">
      <div class="w-25 p-0">
        <button class="btn btn-primary" @click="addFileToDB(file)">Ajouter à la base de Données</button>
      </div>
      <div class="w-25 p-0">
        <button class="btn btn-primary" @click="downloadFile(file.name)">Télécharger</button>
      </div>
      <div class="w-25 p-0">
        <button class="btn btn-danger" @click="deleteFile(file.name)">Supprimer</button>
      </div>
    </li>
  </ul>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filesList: [],
      file: null,
      fileInfo: {
        type: '',
        description: ''
      }
    };
  },
  methods: {
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
    logout() {
      // Supprimez le token d'authentification ou toute autre donnée de session
      localStorage.removeItem('authToken');

      // Redirigez l'utilisateur vers Home.vue
      this.$router.push('/');
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.fileInfo.name = this.file.name; // Auto-fill the name based on the selected file
      this.uploadFile();
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('type', this.fileInfo.type);
      formData.append('description', this.fileInfo.description);

      try {
        await axios.post('http://localhost:5000/api/documents', formData);
        this.fileInfo = { type: '', description: '' }; // Reset the form fields
        this.file = null;
        this.fetchFiles();
      } catch (error) {
        console.error('Error uploading file:', error);
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
        const response = await axios.get('http://localhost:5000/api/documents');
        this.filesList = response.data;
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    },
    async downloadFile(fileName) {
      try {
        const response = await axios.get(`http://localhost:5000/api/documents/download/${fileName}`, {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    },
    async deleteFile(fileName) {
      try {
        await axios.delete(`http://localhost:5000/api/documents/delete/${fileName}`);
        this.fetchFiles();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  },
  created() {
    this.fetchFiles();
  }
}
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
</style>
