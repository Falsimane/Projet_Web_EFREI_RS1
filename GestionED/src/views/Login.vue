<template>
  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-7">
          <div
            class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5"
          >
            <form style="max-width: 23rem; width: 100%" @submit.prevent="login">
              <div class="row">
                <div class="col-lg-7">
                  <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                    Page de connexion
                  </h3>
                </div>

                <div class="col-lg-5">
                  <img
                    src="../assets/images/lettre-v.png"
                    class="img-fluid"
                    alt="Sample image"
                    style="width: 60px"
                  />
                </div>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="email">Adresse email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control form-control-lg"
                  v-model="email"
                  required
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  class="form-control form-control-lg"
                  v-model="password"
                  required
                />
              </div>

              <div v-if="loginError" class="alert alert-danger">
                {{ loginError }}
              </div>

              <div class="pt-1 mb-4">
                <button class="btn btn-info btn-lg btn-block" type="submit">
                  Connexion
                </button>
              </div>

              <p class="small mb-5 pb-lg-2">
                <a class="text-muted" href="/forgot">Mot de passe oublié ?</a>
              </p>
              <p>
                Vous n'avez pas de compte ?
                <a href="/register" class="link-info">Enregistrez-vous</a>
              </p>
            </form>
          </div>
        </div>
        <div class="col-lg-5 px-0 d-none d-lg-block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image"
            class="w-100 vh-100"
            style="object-fit: cover; object-position: left"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loginError: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:5000/api/utilisateurs/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("Utilisateur connecté:", response.data);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.loginError = "Email ou mot de passe invalide";
          } else {
            this.loginError = "Une erreur est survenue lors de la connexion";
          }
        });
    },
  },
};
</script>

<style scoped></style>
