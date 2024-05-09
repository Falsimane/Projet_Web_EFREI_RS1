<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Gestion des utilisateurs</a>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Boutons de gestion des utilisateurs -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/stats" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i>Statistiques</router-link>
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
            <li class="nav-item">
              <button @click="logout" class="nav-link btn btn-link">Déconnexion</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenu de la page -->
    <div class="container">
      <!-- Ici vous pouvez ajouter le contenu de la page de gestion des utilisateurs -->
      <p>Contenu de la page de gestion des utilisateurs</p>
      <h1>Gestion des Utilisateurs</h1>
      <div>
        <input v-model="newUser.name" placeholder="Nom">
        <input v-model="newUser.firstname" placeholder="Prénom">
        <input v-model="newUser.email" placeholder="Email" @blur="validateEmail">
        <span>{{ emailError }}</span>
        <input v-model="newUser.password" type="password" @blur="validatePassword">
        <span>{{ passwordError }}</span>
        <button @click="addUser" :disabled="!formIsValid">Ajouter Utilisateur</button>
      </div>    
      <!-- Liste des utilisateurs avec options pour modifier et supprimer -->
      <ul class="list-group">
        <li class="list-group-item" v-for="user in users" :key="user._id">
          {{ user.name }} {{ user.firstname }} - {{ user.email }}
          <button class="btn btn-primary" @click="editUser(user)">Modifier</button>
          <button class="btn btn-danger" @click="deleteUser(user._id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      newUser: { name: "", firstname: "", email: "", password: "" },
      currentUser: { name: "", firstname: "", email: "", password: "" },
      emailError: "",
      passwordError: "",
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
    fetchUsers() {
      axios.get('/api/users')
        .then(response => {
          console.log("Utilisateurs chargés:", response.data); // Ajoutez ceci pour voir les données reçues
          this.users = response.data;
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des utilisateurs:", error);
        });
    },
    addUser() {
      if (!this.formIsValid) return;
      axios.post('http://localhost:5000/api/users/register', this.newUser)
        .then(() => {
          this.fetchUsers();
          this.newUser = { name: "", firstname: "", email: "", password: "" };
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            this.emailError = "Un compte avec cet email existe déjà.";
          } else {
            this.emailError = "Une erreur est survenue lors de l'inscription.";
          }
        });
    },
    validateEmail(userType) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = userType === 'new' ? this.newUser.email : this.currentUser.email;
      this.emailError = pattern.test(email) ? "" : "L'adresse email ne respecte pas le format requis.";
    },
    validatePassword(userType) {
      const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{12,}$/;
      const password = userType === 'new' ? this.newUser.password : this.currentUser.password;
      this.passwordError = pattern.test(password) ? "" : "Le mot de passe doit contenir au moins 12 caractères, un chiffre, une majuscule et un caractère spécial.";
    },
    editUser(user) {
      this.currentUser = { ...user };
      this.isEditing = true;
    },
    updateUser() {
      if (!this.ChangeformIsValid) return;
      axios.put(`http://localhost:5000/api/users/${this.currentUser._id}`, this.currentUser)
        .then(() => {
          this.fetchUsers();
          this.isEditing = false;
          this.currentUser = { name: "", firstname: "", email: "", password: "" };  // Réinitialise les données après la mise à jour
        })
        .catch(error => {
          console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        });
    },

    cancelEdit() {
      this.currentUser = { name: "", firstname: "", email: "", password: "" };
      this.isEditing = false;
    },
    deleteUser(userId) {
      axios.delete(`http://localhost:5000/api/users/${userId}`)
        .then(() => {
          this.fetchUsers();  // Rafraîchit la liste après suppression
        })
        .catch(error => {
          console.error("Erreur lors de la suppression de l'utilisateur:", error);
        });
    },
    logout() {
      // Supprimez le token d'authentification ou toute autre donnée de session
      localStorage.removeItem('authToken');

      // Redirigez l'utilisateur vers Home.vue
      this.$router.push('/');
    }
  },
  computed: {
      formIsValid() {
        return (
          this.newUser.name &&
          this.newUser.firstname &&
          this.newUser.email &&
          this.newUser.password &&
          !this.emailError &&
          !this.passwordError
        );
      },
      ChangeformIsValid() {
        return (
          this.currentUser.name &&
          this.currentUser.firstname &&
          this.currentUser.email &&
          this.currentUser.password &&
          !this.emailError &&
          !this.passwordError
        );
      }
  },
  created() {
      this.fetchUsers();
  },
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  margin-left: 10px;
}
</style>
