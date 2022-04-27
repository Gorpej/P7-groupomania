<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-light fixed-top">
      <h1 class="title">
        <a class="nav-link nav-link-h1" href="./">Groupomania</a>
      </h1>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item navatar">
            <a class="nav-link profil" href="./profil">Profil</a>
          </li>
          <li @click="logout()" class="nav-item">
            <i class="bi bi-box-arrow-right"></i>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavbarC",
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/auth");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  background-color: #e7e7e7;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
}

.navatar {
  display: flex;
  align-items: center;
}

.avatar-profil {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  align-items: center;
}

#navbarSupportedContent {
  display: flex;
  justify-content: end;
}

.profil {
  margin-right: 10px;
}

h1 {
  font-size: 1.5rem;
  margin-left: 1rem;
}
.nav-link-h1 {
  color: #db4437;
}
.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 200px;
  cursor: pointer;
  margin-right: 20px;
}

@media (max-width: 768px) {
  .navbar {
    width: 100vw;
    justify-content: center;
  }
  .nav-link-h1{
    margin-left:-20px;
  }
  .navbar-collapse{
    border-top:1px solid #db4437;
  }
  .navbar-nav {
    flex-direction: row;
    justify-content: space-between;
  }
  #navbarSupportedContent {
    justify-content: space-around;
  }
}
</style>
