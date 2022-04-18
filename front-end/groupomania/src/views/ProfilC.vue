<template>
  <div>
    <NavbarC />
    <section>
      <div class="card text-center card-form-cont">
        <div class="card-body">
          <img
            src="https://via.placeholder.com/50"
            alt="Avatar"
            class="avatar"
          />
          <div class="input-group mb-3">
            <span class="input-group-text" id="form-lastName">LastName</span>
            <input
              type="text"
              class="form-control"
              placeholder="LastName"
              aria-label="Username"
              v-model="lastName"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="form-firstName">FirstName</span>
            <input
              type="text"
              class="form-control"
              placeholder="FirstName"
              aria-label="Username"
              v-model="firstName"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="form-password"
              >Mot de passe</span
            >
            <input
              v-model="password"
              type="text"
              class="form-control"
              placeholder="password"
              aria-label="password"
            />
          </div>
          <div class="btn-profil">
            <button type="submit" @click="modifyUser()" class="btn btn-warning">
              Sauvegarder les changements
            </button>
            <button
              type="submit"
              class="btn btn-danger"
              @click="deleteAccount(), logout()"
            >
              Supprimer votre compte
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarC from "@/components/NavbarC.vue";

export default {
  name: "ProfilC",
  lastName: "",
  firstName: "",
  password: "",

  components: {
    NavbarC,
  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/auth");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/auth");
    },
    modifyUser: function () {
      const self = this;
      this.$store
        .dispatch("modifyUser", {
          user_lastName: this.lastName,
          user_firstName: this.firstName,
          user_password: this.password,
        })
        .then(
          function (res) {
            self.$router.push("/");
            console.log(res);
          },
          function (error) {
            console.log(error);
          }
        );
    },
    deleteAccount: function () {
      this.$store.dispatch("deleteAccount").then(
        function (res) {
          console.log(res);
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
.avatar {
  vertical-align: middle;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.card {
  margin: auto;
  width: 500px;
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.1);
}

.text-center {
  width: 800px;
  margin-top: 10rem;
  background-color: #94a7ae;
}

.btn-profil {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
</style>