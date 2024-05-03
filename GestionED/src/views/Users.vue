<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <!-- Bouton de retour au dashboard -->
        <button @click="retourDashboard" class="btn btn-link mr-3">
          <i class="fas fa-arrow-left"></i> Retour au dashboard
        </button>
        
        <a class="navbar-brand" href="#">Gestion des utilisateurs</a>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Menu déroulant avec les autres options du dashboard principal -->
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Options
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <button @click="afficherStatistiques" class="dropdown-item">Statistiques</button>
                <button @click="fonctionRecherche" class="dropdown-item">Fonction de recherche</button>
                <button @click="impression" class="dropdown-item">Impression</button>
              </div>
            </li>
          </ul>
          
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
