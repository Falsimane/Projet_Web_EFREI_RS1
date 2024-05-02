<template>
    <section class="vh-100">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-7">
                    <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                        <form style="max-width: 23rem; width: 100%" @submit.prevent="register">
                            <div class="row">
                                <div class="col-lg-7">
                                    <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                                        Page de création de compte
                                    </h3>
                                </div>

                                <div class="col-lg-5">
                                    <img src="../assets/images/lettre-v.png" class="img-fluid" alt="Sample image"
                                        style="width: 60px" />
                                </div>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="name">Nom</label>
                                <input type="text" id="name" class="form-control form-control-lg" v-model="name"
                                    pattern="^[a-zA-Z0-9\s]+$" required />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="firstname">Prénom</label>
                                <input type="text" id="firstname" class="form-control form-control-lg"
                                    v-model="firstname" required />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="email">Adresse email</label>
                                <input type="email" id="email" class="form-control form-control-lg" v-model="email"
                                    @blur="validateEmail" required />
                                <div v-if="emailError" class="alert alert-danger mt-2">
                                    L'adresse email ne respecte pas le format requis.
                                </div>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="password">Mot de passe</label>
                                <input type="password" id="password" class="form-control form-control-lg"
                                    v-model="password" @blur="validatePassword" required />
                                <div v-if="passwordError" class="alert alert-danger mt-2">
                                    Le mot de passe doit contenir au moins 12 caractères, un chiffre, une majuscule et
                                    un caractère spécial.
                                </div>
                            </div>

                            <div class="pt-1 mb-4">
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-lg btn-block"
                                    type="submit" :disabled="!formIsValid">
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
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                        alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: "Register",
    data() {
        return {
            name: "",
            firstname: "",
            email: "",
            password: "",
            emailError: false,
            passwordError: false
        };
    },
    computed: {
        formIsValid() {
            return this.name && this.firstname && this.email && this.password && !this.emailError && !this.passwordError;
        }
    },
    methods: {
        validateEmail() {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.emailError = !pattern.test(this.email);
        },
        validatePassword() {
            const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{12,}$/;
            this.passwordError = !pattern.test(this.password);
        }
    }
};
</script>

<style scoped></style>
