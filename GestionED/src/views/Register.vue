<template>
  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-7">
          <div
            class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5"
          >
            <form style="max-width: 23rem; width: 100%" @submit.prevent="addToAPI">
              <div class="row">
                <div class="col-lg-7">
                  <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                    Page de création de compte
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
                <label class="form-label" for="name">Nom</label>
                <input
                  type="text"
                  id="name"
                  class="form-control form-control-lg"
                  v-model="User.name"
                  required
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="firstname">Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  class="form-control form-control-lg"
                  v-model="User.firstname"
                  required
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="email">Adresse email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control form-control-lg"
                  v-model="User.email"
                  @input="validateEmail"
                  required
                />
                <div v-if="emailError" class="alert alert-danger mt-2">
                  {{ emailError }}
                </div>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  class="form-control form-control-lg"
                  v-model="User.password"
                  @input="validatePassword"
                  required
                />
                <div v-if="passwordError" class="alert alert-danger mt-2">
                  {{ passwordError }}
                </div>
              </div>

              <div class="pt-1 mb-4">
                <button
                  class="btn btn-info btn-lg btn-block"
                  type="submit"
                  :disabled="!formIsValid"
                >
                  S'inscrire
                </button>
              </div>

              <p class="small mb-5 pb-lg-2">
                <a class="text-muted" href="/login">J'ai déjà un compte</a>
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
  name: "Register",
  data() {
    return {
      User: { name: "", firstname: "", email: "", password: "" },
      emailError: "",
      passwordError: "",
    };
  },
  methods: {
    addToAPI() {
      let NewUser = {
        name: this.User.name,
        firstname: this.User.firstname,
        email: this.User.email,
        password: this.User.password,
      };
      axios
        .post("http://localhost:5000/api/users/register", NewUser)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            this.emailError = "Un compte avec cet email existe déjà.";
          } else {
            this.emailError = "Une erreur est survenue lors de l'inscription.";
          }
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
};
</script>

<style scoped></style>
