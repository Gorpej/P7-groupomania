<template>
  <section class="section1">
    <div class="card card-connect">
      <img
        src="../../public/images/groupomania_logo.webp"
        class="card-img-top"
        alt="logo de l'entreprise Groupomania, une sphere representant une planéte avec des connexions"
      />
      <div class="card-body">
        <form>
          <div class="showSignIn" v-if="mode == 'create'">
            <div class="mb-3">
              <label for="inputLastName" class="col-3 col-md-6 col-form-label"
                >Nom</label
              >
              <input
                v-model="lastName"
                type="text"
                class="form-control"
                id="FormControlLastName"
                placeholder="Nom"
                required
              />
            </div>
            <div class="mb-3">
              <label for="inputFirstName" class="col-3 col-md-6 col-form-label"
                >Prénom</label
              >
              <input
                v-model="firstName"
                type="text"
                class="form-control"
                id="FormControlFirstName"
                placeholder="Prénom"
                required
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="col-3 col-md-6 col-form-label"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="FormControlEmail"
              placeholder="name@example.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="col-3 col-md-6 col-form-label"
              >Mot de passe</label
            >
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="FormControlPassword"
              required
              autocomplete="on"
            />
          </div>
          <div class="d-grid gap-2 boutons_connexion">
            <button
              class="btn btn-secondary"
              v-if="mode == 'login'"
              type="button"
            >
              Connexion
            </button>
            <button
              @click="createAccount()"
              class="btn btn-secondary"
              v-else
              type="button"
            >
              Créer un compte
            </button>
          </div>
          <p class="card__subtitle" v-if="mode == 'login'">
            Tu n'as pas encore de compte ? <br /><span
              class="card__action"
              @click="switchToCreateAccount()"
              >Créer un compte</span
            >
          </p>
          <p class="card__subtitle" v-else>
            Tu as déja un compte ? <br /><span
              class="card__action"
              @click="switchToLogin()"
              >Se connecter à mon compte</span
            >
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AuthC",
  data: function () {
    return {
      mode: "login",
      lastName: "",
      firstName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    createAccount: function () {
      this.$store.dispatch('createAccount',{
        user_lastName: this.lastName,
        user_firstName: this.firstName,
        user_email: this.email,
        user_password: this.password,
      })
    },
  },
};
</script>


<style scoped>
.section1 {
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
}

.card-body {
  padding: 0 1rem;
}

.card.card-connect {
  width: 20rem;
  box-shadow: 0px 1px 10px 5px rgba(0, 0, 0, 0.1);
}

section,
.card-connect > img {
  margin: auto;
  width: 40%;
}

.boutons_connexion {
  padding-top: 10px;
  padding-bottom: 10px;
}

.card__action {
  color: #2196f3;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
</style>