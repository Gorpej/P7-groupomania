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
                id="inputLastName"
                placeholder="nom"
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
                id="inputFirstName"
                placeholder="prenom"
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
              id="inputEmail"
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
              id="inputPassword"
              required
              autocomplete="on"
            />
          </div>
          <div
            class="form-row error-message"
            v-if="mode == 'login' && status == 'error_login'"
          >
            Adresse mail et/ou mot de passe invalide
          </div>
          <div
            class="form-row error-message"
            v-if="mode == 'create' && status == 'error_create'"
          >
            Adresse mail déja utilisée ou incorrect
          </div>
          <div class="d-grid gap-2 boutons_connexion">
            <button
              v-on:click="login()"
              class="btn btn-secondary"
              v-bind:class="{ disabled: !validatedFields }"
              v-if="mode == 'login'"
              type="button"
            >
              <span v-if="status == 'loading'">Connexion en cours...</span>
              <span v-else>Connexion</span>
            </button>
            <button
              v-on:click="createAccount()"
              class="btn btn-secondary"
              v-bind:class="{ disabled: !validatedFields }"
              v-else
              type="button"
            >
              <span v-if="status == 'loading'">Connexion en cours...</span>
              <span v-else>Créer un compte</span>
            </button>
          </div>
          <p class="card__subtitle" v-if="mode == 'login'">
            Tu n'as pas encore de compte ? <br /><span
              class="card__action"
              v-on:click="switchToCreateAccount()"
              >Créer un compte</span
            >
          </p>
          <p class="card__subtitle" v-else>
            Tu as déja un compte ? <br /><span
              class="card__action"
              v-on:click="switchToLogin()"
              >Se connecter à mon compte</span
            >
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

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
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/");
      return;
    }
  },
  computed: {
    validatedFields: function () {
      let emailRegExp = new RegExp(
        "^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$",
        "g"
      );
      if (this.mode == "create") {
        if (
          this.firstName != "" &&
          this.lastName != "" &&
          this.email != "" &&
          this.password != ""&&
          emailRegExp.test(this.email)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          user_email: this.email,
          user_password: this.password,
        })
        .then(
          function () {
            self.$router.push("/");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    createAccount: function () {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          user_lastName: this.lastName,
          user_firstName: this.firstName,
          user_email: this.email,
          user_password: this.password,
        })
        .then(
          function () {
            self.login();
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>


<style scoped>
.section1 {
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  height: 100vh;
}
.card {
  margin: auto;
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
  color: #07599C;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}

::placeholder {
  font-size: 0.9rem;
}

.error-message {
  color: red;
}

@media (max-width: 768px) {
  .section1 {
    width: 100%;
  }
  .card {
    height: 75%;
  }
  .col-form-label {
    width: 100%;
  }
}
</style>