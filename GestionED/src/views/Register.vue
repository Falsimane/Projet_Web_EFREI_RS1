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
                                        Page d'enregistrement
                                    </h3>
                                </div>

                                <div class="col-lg-5">
                                    <img src="../assets/images/lettre-v.png" class="img-fluid" alt="Sample image"
                                        style="width: 60px" />
                                </div>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form2ExampleName" class="form-control form-control-lg"
                                    v-model="name" />
                                <label class="form-label" for="form2ExampleName">Nom</label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="email" id="form2ExampleEmail" class="form-control form-control-lg"
                                    v-model="email" />
                                <label class="form-label" for="form2ExampleEmail">Adresse email</label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="password" id="form2ExamplePassword" class="form-control form-control-lg"
                                    v-model="password" />
                                <label class="form-label" for="form2ExamplePassword">Mot de passe</label>
                            </div>

                            <div class="pt-1 mb-4">
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-lg btn-block"
                                    type="submit">
                                    S'inscrire
                                </button>
                            </div>

                            <p class="small mb-5 pb-lg-2">
                                <a class="text-muted" href="/">J'ai déjà un compte</a>
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
            email: "",
            password: ""
        };
    },
    methods: {
        register() {
            // Logic for registration goes here
            console.log("Name:", this.name);
            console.log("Email:", this.email);
            console.log("Password:", this.password);
        }
    }
};
</script>

<style scoped>
@media (max-width: 600px) {
    .bg-image-vertical {
        position: relative;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: right center;
        background-size: auto 100%;
    }

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

@media (min-width: 601px) {
    .container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>