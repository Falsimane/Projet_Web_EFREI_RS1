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
              <button @click="nouvelUtilisateur" class="nav-link btn btn-link">Nouvel utilisateur</button>
            </li>
            <li class="nav-item">
              <button @click="modifierUtilisateur" class="nav-link btn btn-link">Modifier utilisateur</button>
            </li>
            <li class="nav-item">
              <button @click="supprimerUtilisateur" class="nav-link btn btn-link">Supprimer utilisateur</button>
            </li>
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
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenu de la page -->
    <div class="container">
      <!-- Ici vous pouvez ajouter le contenu de la page de gestion des utilisateurs -->
      <p>Contenu de la page de gestion des utilisateurs...</p>
    </div>
  </div>
</template>

<script>
export default {
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
    nouvelUtilisateur() {
      // Redirection vers la page de création d'un nouvel utilisateur
      this.$router.push({ name: 'NouvelUtilisateur' });
    },
    modifierUtilisateur() {
      // Redirection vers la page de modification d'un utilisateur existant
      this.$router.push({ name: 'ModifierUtilisateur' });
    },
    supprimerUtilisateur() {
      // Redirection vers la page de suppression d'un utilisateur existant
      this.$router.push({ name: 'SupprimerUtilisateur' });
    }
  }
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
</style>
