<template>
     <div>
         <NavbarC/>
    <section>
      <div class="card text-center card-form-cont">
        <div class="card-body">
          <img
            src="https://via.placeholder.com/50"
            alt="Avatar"
            class="avatar"
          />
          <div class="input-group mb-3">
            <!-- v-model='userlastName' -->
            <span class="input-group-text" id="form-lastName">LastName</span>
            <input
              type="text"
              class="form-control"
              placeholder="LastName"
              aria-label="Username"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="form-firstName">FirstName</span>
            <input
              type="text"
              class="form-control"
              placeholder="firstName"
              aria-label="Username"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="form-password"
              >Mot de passe</span
            >
            <input
              type="text"
              class="form-control"
              placeholder="password"
              aria-label="password"
            />
          </div>
          <button type="submit" class="btn btn-warning">
            Sauvegarder les changements
          </button>
        </div>
      </div>
    </section>
</div>
</template>

<script>
import NavbarC from "@/components/NavbarC.vue";

export default {
  name: "ProfilC",
  
  components: {
    NavbarC,
  },
  mounted: function(){
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/auth');
      return;
    } 
    this.$store.dispatch('getUserInfos');
  },
  methods: {
      logout: function () {
        this.$store.commit('logout');
        this.$router.push('/auth');
      },
  }
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
</style>