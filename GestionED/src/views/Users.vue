<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand font-weight-bold" href="/users">
          <img
            src="../assets/images/lettre-v.png"
            alt="Logo"
            width="30"
            height="30"
            class="d-inline-block align-top"
          />
          Gestion des utilisateurs
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
              <router-link to="/stats" class="nav-link">Statistiques</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/search" class="nav-link"
                >Fonction de recherche</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link"
                >Retour au Menu Principal</router-link
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

    <div class="container mt-5 pt-5">
      <h1 class="mb-4">Gestion des Utilisateurs</h1>
      <div class="mb-4">
        <div class="input-group mb-3">
          <input class="form-control mr-2" v-model="User.name" placeholder="Nom" />
          <input
            class="form-control mr-2"
            v-model="User.firstname"
            placeholder="Prénom"
          />
          <input
            class="form-control mr-2"
            v-model="User.email"
            placeholder="Email"
            @blur="validateEmail"
          />
        </div>
        <span class="text-danger">{{ emailError }}</span>
        <div class="input-group mb-3">
          <input
            class="form-control mr-2"
            v-model="User.password"
            type="password"
            placeholder="Mot de passe"
            @blur="validatePassword"
          />
        </div>
        <span class="text-danger">{{ passwordError }}</span>
        <div v-if="Modifier">
          <button class="btn btn-primary" @click="updateUser" :disabled="!formIsValid">
            Modifier Utilisateur
          </button>
          <button class="btn btn-secondary ml-2" @click="cancelEdit">Annuler</button>
        </div>
        <div v-if="Ajouter">
          <button class="btn btn-success" @click="addToAPI" :disabled="!formIsValid">
            Ajouter Utilisateur
          </button>
        </div>
      </div>
      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="user in usersList"
          :key="user._id"
        >
          <div>{{ user.name }}</div>
          <div>{{ user.firstname }}</div>
          <div>{{ user.email }}</div>
          <div>
            <button class="btn btn-primary btn-sm mr-2" @click="editUser(user)">
              Modifier
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteUser(user._id)">
              Supprimer
            </button>
          </div>
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
      User: { name: "", firstname: "", email: "", password: "" }, // Utilisé pour l'ajout et la mise à jour
      Ajouter: true,
      Modifier: false,
    };
  },
  methods: {
    afficherProfils() {
      this.$router.push({ name: "Profils" });
    },
    retourDashboard() {
      this.$router.push({ name: "Dashboard" });
    },
    afficherStatistiques() {
      this.$router.push({ name: "Statistiques" });
    },
    fonctionRecherche() {
      this.$router.push({ name: "FonctionRecherche" });
    },
    fetchUsers() {
      axios
        .get("http://localhost:5000/api/users")
        .then((response) => {
          console.log("Utilisateurs chargés:", response.data);
          this.usersList = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des utilisateurs:", error);
        });
    },
    addToAPI() {
      let NewUser = { ...this.User };
      axios
        .post("http://localhost:5000/api/users/register", NewUser)
        .then(() => {
          this.fetchUsers(); // Mise à jour de la liste après ajout
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
      axios
        .put(`http://localhost:5000/api/users/${this.User._id}`, this.User)
        .then(() => {
          this.fetchUsers(); // Mise à jour de la liste après modification
          this.User = { name: "", firstname: "", email: "", password: "" }; // Réinitialisation du formulaire
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        });
    },
    cancelEdit() {
      this.User = { name: "", firstname: "", email: "", password: "" };
      this.Modifier = false;
      this.Ajouter = true;
    },
    deleteUser(userId) {
      axios
        .delete(`http://localhost:5000/api/users/${userId}`)
        .then(() => {
          this.fetchUsers(); // Mise à jour de la liste après suppression
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'utilisateur:", error);
        });
    },
    validateEmail() {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = pattern.test(this.User.email)
        ? ""
        : "L'adresse email ne respecte pas le format requis.";
    },
    validatePassword() {
      const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{12,}$/;
      this.passwordError = pattern.test(this.User.password)
        ? ""
        : "Le mot de passe doit contenir au moins 12 caractères, un chiffre, une majuscule et un caractère spécial.";
    },
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/");
    },
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
  font-size: 1.5rem;
}
.nav-link {
  font-size: 1.1rem;
}
.container {
  max-width: 800px;
}
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
.input-group.mb-3 {
  margin-bottom: 1rem;
}
.text-danger {
  color: #dc3545;
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