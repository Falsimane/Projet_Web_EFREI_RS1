<template>

    <div>
        <section class="vh-100" id="landingPage">
            <div class="container h-100">
                <div class="row h-100">
                    <div class="col-lg-7 px-0">
                        <div class="d-flex align-items-center h-100">
                            <div class="w-100">
                                <h1 class="display-1">Bienvenue sur Vaultify</h1>
                                <p class="lead">Gardez vos fichiers en sécurité</p>
                                <a href="/login" class="btn btn-info btn-lg">Connectez-vous</a>
                                <a href="/register" class="btn btn-info btn-lg m-4">Créer un compte</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 px-0 d-none d-lg-block">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                            alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left" />
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
export default {
    name: "LandingPage",
};
</script>

<style scoped>
@media (min-width: 992px) {
    .nav-item {
        line-height: 80px;
    }
}
</style>
