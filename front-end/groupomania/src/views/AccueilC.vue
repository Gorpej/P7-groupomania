<template>
<div>
         <NavbarC/>
  <section>
    <div class="card-deck">
      <div class="card card-add">
        <div class="card-body">
          <div class="mb-3">
            <label for="formPublish" class="form-label form-label_publish"
              >Message:</label
            >
            <textarea
              class="form-control"
              id="publishText"
              rows="2"
              placeholder="Ecrivez votre message ici"
            ></textarea>
          </div>
          <button type="button" class="btn btn-outline-primary">
            Ajouter une photo
          </button>
          <input
            type="submit"
            class="btn btn-outline-primary"
            value="Publier"
          />
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="pos-text">
            <div class="avatar-name">
              <img
                src="https://via.placeholder.com/50"
                alt="Avatar"
                class="avatar-accueil"
              />
              <h2 class="text-md-start fs-5 userName">Nom prenom</h2>
            </div>
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
          <div class="card-header__tools">
            <div class="card-header__tools__logo_modify">
              <i class="bi bi-pencil-fill"></i>
            </div>
            <div class="card-header__tools__logo_delete">
              <i class="bi bi-trash-fill"></i>
            </div>
          </div>
        </div>
        <img
          class="card-img-top"
          src="https://via.placeholder.com/200"
          alt="Card image cap"
        />
        <div class="card-body">
          <p class="card-text">message</p>
          <div class="pos-add">
            <a href="#">Afficher les commentaires</a>
            <button type="button" class="btn logo_add-comment">
              <i class="bi bi-plus-square-fill"></i>
            </button>
          </div>
          <div class="container_comment">
            <CommentC />
          </div>
        </div>
        <div class="card-footer">
          <div class="mb-3">
            <label
              for="FormControlComment"
              class="form-label form-label_comment"
              >Commentaire:</label
            >
            <div class="position-comment_send">
              <textarea
                class="form-control form-control_comment"
                id="commentText"
                rows="1"
              ></textarea>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--<div v-for='article in articles' class="card">
                    <div class="card-header">
                        <div class="pos-text">
                            <div class="avatar-name">
                                <img :src="article.avatar" alt="Avatar" class="avatar-accueil">
                                <h2 class="text-md-start fs-5 userName">{{article.lastName}} {{article.firstName}}</h2>
                            </div>
                            <small class="text-muted">Last updated 3 mins ago</small>
                        </div>
                        <div class="card-header__tools">
                            <div class="card-header__tools__logo_modify"><i class="bi bi-pencil-fill"></i></div>
                            <div class="card-header__tools__logo_delete"><i class="bi bi-trash-fill"></i></div>
                        </div>
                    </div>
                    <img class="card-img-top" src="./images/background.png" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">{{article.message}}</p>
                        <div class="pos-add">
                            <a href="#">Afficher les commentaires</a>
                            <button type="button" @click="showMe" class="btn btn-primary logo_add-comment"><i class="bi bi-plus-square-fill"></i></button>
                        </div>
                        <div class="container_comment">
                            <ul class="list-group list-group">
                                <li class="list-group-item fst-italic list-group-item-action">commentaire</li>
                                <li class="list-group-item fst-italic list-group-item-action">commentaire</li>
                            </ul>
                        </div>
                    </div>
                        <div class="card-footer">
                            <div class="mb-3">
                                <label for="FormControlComment" class="form-label form-label_comment ">Commentaire:</label>
                                <div class="position-comment_send">
                                    <textarea class="form-control form-control_comment" id="commentText"
                                        rows="1"></textarea>
                                    <button type="submit" class="btn btn-primary"><i class="bi bi-send-fill"></i></button>
                                </div>
                            </div>
                        </div>
                </div>-->
    </div>
  </section>
  </div>
</template>

<script>
import NavbarC from "@/components/NavbarC.vue";
import CommentC from "@/components/CommentC.vue";

export default {
  name: "AccueilC",
  mounted: function(){
    console.log(this.$store.state.user)
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/auth');
      return;
    } 
    this.$store.dispatch('getUserInfos');
  },
  components: {
    NavbarC,
    CommentC,
  },
};
</script>

<style scoped>
section {
  margin-top: 68px;
}

.card-deck {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 2rem;
  width: 800px;
  height: 100%;
  margin: auto;
  background-color: #94a7ae;
  box-shadow: 2px 2px 20px 5px rgba(0, 0, 0, 0.1);
  padding-bottom: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
}

.card-header__tools {
  display: flex;
  justify-content: end;
}

.avatar-accueil {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  margin-right: 1rem;
  margin-top: -0.2rem;
}

.avatar-name {
  display: flex;
}

.card-header__tools__logo_modify {
  margin-right: 1rem;
}

.card-header__tools__logo_modify:hover {
  color: orange;
  cursor: pointer;
}

.card-header__tools__logo_delete:hover {
  color: red;
  cursor: pointer;
}

.card {
  margin: auto;
  width: 500px;
  box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.1);
}

.card.card-add {
  margin-top: 2rem;
}

.card-body__comment {
  display: flex;
  justify-content: space-between;
}

.form-control_comment {
  margin-right: 1rem;
}

.position-comment_send {
  display: flex;
  justify-content: row;
}

.pos-add {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  height: 3rem;
}

.logo_add-comment {
  color: blue;
}

.list-group-item {
  font-size: 0.9rem;
}
</style>