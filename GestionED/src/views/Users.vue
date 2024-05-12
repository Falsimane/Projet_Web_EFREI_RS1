<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="/users">Gestion des utilisateurs</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
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
              <router-link to="/dashboard" class="nav-link btn btn-link mr-3"> <i class="fas fa-arrow-left"></i> Retour au Menu Principal </router-link>
            </li>
            <li class="nav-item">
              <button @click="logout" class="nav-link btn btn-link">Déconnexion</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <p>Contenu de la page de gestion des utilisateurs</p>
      <h1>Gestion des Utilisateurs</h1>
      <div>
        <input class="w-25 p-0" v-model="User.name" placeholder="Nom">
        <input class="w-25 p-0" v-model="User.firstname" placeholder="Prénom">
        <input class="w-25 p-0" v-model="User.email" placeholder="Email" @blur="validateEmail">
        <span>{{ emailError }}</span>
        <input class="w-25 p-0" v-model="User.password" type="password" placeholder="Mot de passe" @blur="validatePassword">
        <span>{{ passwordError }}</span>
        
        <div class="w-25 p-1" v-if="Modifier">
          <button @click="updateUser" :disabled="!formIsValid">Modifier Utilisateur</button>                   
        </div>
        <div class="w-25 p-1" v-if="Ajouter">
          <button @click="addToAPI" :disabled="!formIsValid">Ajouter Utilisateur</button>
        </div>
      
      </div>
      <ul class="list-group">
        <br>
        <li class="list-group-item" v-for="user in usersList" :key="user._id">
          <div class="w-25 p-0">{{ user.name }}</div>
          <div class="w-25 p-0">{{ user.firstname }}</div>
          <div class="w-25 p-0">{{ user.email }}</div>
          <div class="w-25 p-0"><button class="btn btn-primary" @click="editUser(user)">Modifier</button></div>
          <div class="w-25 p-0"><button class="btn btn-danger" @click="deleteUser(user._id)">Supprimer</button></div>          
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Users",
  data() {
    return {
      usersList: [], // Liste des utilisateurs pour l'affichage
      emailError: "",
      passwordError: "",
      User: [{ name: "", firstname: "", email: "", password: "" }], // Utilisé pour l'ajout et la mise à jour
      Ajouter: true,
      Modifier: "",
    };
  },
  methods: {
    afficherProfils() {
      // Redirection vers la page de gestion des utilisateurs
      this.$router.push({ name: 'Profils' });
    },
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
      axios.get('http://localhost:5000/api/users')
        .then(response => {
          console.log("Utilisateurs chargés:", response.data); // Ajoutez ceci pour voir les données reçues
          this.usersList = response.data;
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des utilisateurs:", error);
        });
    },
    addToAPI() {
      let NewUser = { ...this.User };
      axios
        .post("http://localhost:5000/api/users/register", NewUser)
        .then(() => {
          this.fetchUsers();  // Mise à jour de la liste après ajout
          this.User = { name: "", firstname: "", email: "", password: "" }; // Réinitialisation du formulaire
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            this.emailError = "Un compte avec cet email existe déjà.";
          } else {
            this.emailError = "Une erreur est survenue lors de l'inscription.";
          }
        });
    },
    editUser(user) {
      this.Ajouter = false;      
      this.Modifier = true;      
      this.User = { ...user }; // Chargement des données de l'utilisateur pour modification
    },
    updateUser() {
      if (!this.formIsValid) return;
      axios.put(`http://localhost:5000/api/users/${this.User._id}`, this.User)
        .then(() => {
          this.fetchUsers();  // Mise à jour de la liste après modification
          this.User = { name: "", firstname: "", email: "", password: "" }; // Réinitialisation du formulaire
        })
        .catch(error => {
          console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        });
    },
    cancelEdit() {
      this.User = { name: "", firstname: "", email: "", password: "" };
      this.isEditing = false;
    },
    deleteUser(userId) {
      axios.delete(`http://localhost:5000/api/users/${userId}`)
        .then(() => {
          this.fetchUsers();  // Mise à jour de la liste après suppression
        })
        .catch(error => {
          console.error("Erreur lors de la suppression de l'utilisateur:", error);
        });
    },
    validateEmail() {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = pattern.test(this.User.email) ? "" : "L'adresse email ne respecte pas le format requis.";
    },
    validatePassword() {
      const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{12,}$/;
      this.passwordError = pattern.test(this.User.password) ? "" : "Le mot de passe doit contenir au moins 12 caractères, un chiffre, une majuscule et un caractère spécial.";
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
        this.User.name &&
        this.User.firstname &&
        this.User.email &&
        this.User.password &&
        !this.emailError &&
        !this.passwordError
      );
    },
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
