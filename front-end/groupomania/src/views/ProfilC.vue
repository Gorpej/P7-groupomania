<template>
  <div>
    <NavbarC />
    <section>
      <div class="card text-center card-form-cont">
        <div class="card-body">
          <img
            :src="user.user_avatar"
            alt="Avatar"
            class="avatar"
          />
          <div class="input-group mb-3">
            <span class="input-group-text" id="form-lastName">Nom :</span>
            <input 
              type="text"
              class="form-control"
              :placeholder="user.user_lastName"
              aria-label="Username"
              v-model="lastName"
              ref="string"
            />
            
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="form-firstName">Prénom :</span>
            <input
              type="text"
              class="form-control"
              :placeholder="user.user_firstName"
              aria-label="Username"
              v-model="firstName"
              ref="string"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="form-firstName">Avatar :</span>
            <input
              type="file"
              class="form-control"
              id="inputUploadImg"
              :placeholder="user.user_avatar"
              aria-label="Upload"
              ref="file"
              v-on:change="selectImg"
            />
          </div>

          <div class="btn-profil">
            <button type="submit" @click="modifyUser()" 
            class="btn btn-warning">
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
import { mapState } from "vuex";

export default {
  name: "ProfilC",
  components: {
    NavbarC,
  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
       console.log(this.$store.state.user)
      this.$router.push("/auth");
      return;
    }
    this.$store.dispatch("getUserInfos");
   
  },
  computed:{
    ...mapState({
      user:'userInfos'
    }),

  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/auth");
    },
    selectImg(event) {
      this.selectedFile = event.target.files[0];
    },
    modifyUser: function () {
      const self = this;
      const fd = new FormData();
      fd.append("user_lastName", this.lastName);
      fd.append("user_firstName", this.firstName);
      fd.append("image", this.selectedFile, this.selectedFile.name);
      this.$store.dispatch("modifyUser", fd).then(
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