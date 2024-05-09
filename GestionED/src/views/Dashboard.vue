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
</template>

<script>
export default {
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
    }
  }
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
</style>
