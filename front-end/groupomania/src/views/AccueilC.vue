<template>
  <div>
    <NavbarC />
  </div>
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
              v-model="message"
            ></textarea>
          </div>
          <div class="input-group mb-3">
            <button
              class="btn btn-secondary"
              v-on:click="createArticle(),reloadPage()"
              type="button"
              id="btn_publier"
            >
              Publier
            </button>
            <input
              type="file"
              class="form-control"
              id="inputUploadImg"
              aria-label="Upload"
              v-on:change="selectImg"
            />
          </div>
        </div>
      </div>
      <div
        class="card articles"
        v-for="(article, index) in articles"
        :key="index"
      >
        <div class="card_article">
          <div class="card-header">
            <div class="pos-text">
              <div class="avatar-name">
                <img
                  :src="article.user_avatar"
                  alt="Avatar"
                  class="avatar-accueil"
                />
                <h2 class="text-md-start fs-5 userName">
                  {{ article.user_firstName }} {{ article.user_lastName }}
                </h2>
              </div>
              <small class="text-muted"
                >Posté le:
                {{
                  article.article_modifyDate
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                }}</small
              >
            </div>
            <div class="card-header__tools">
              <div class="card-header__tools__logo_modify">
                <i class="bi bi-pencil-fill"></i>
              </div>
              <div
                v-on:click="deleteArticle(article, index), reloadPage()"
                class="card-header__tools__logo_delete"
              >
                <i class="bi bi-trash-fill"></i>
              </div>
            </div>
          </div>
          <img
            class="card-img-top"
            :src="article.article_img"
            alt="Image de l'article"
          />
          <div class="card-body">
            <p class="card-text">{{ article.article_message }}</p>
            <div class="pos-add">
              <button
                @click="getArticleComments(article)"
                type="button"
                class="btn btn-link btn-sm"
              >
                Afficher les commentaires
              </button>
            </div>
            <!-- <div v-show="article.comments" class="container_comment"> -->
            <div class="container_comment">
              <ul class="list-group list-group comments">
                <li
                  class="
                    list-group-item
                    fst-italic
                    list-group-item-action
                    comment
                  "
                >
                  
                </li>
              </ul>
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
                  ref="string"
                  v-model="comment_message"
                ></textarea>
                <button
                  type="submit"
                  @click="createComment(article)"
                  class="btn btn-primary"
                >
                  <i class="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavbarC from "@/components/NavbarC.vue";

export default {
  name: "AccueilC",
  components: {
    NavbarC,
  },
  data: function () {
    return {
      message: null,
      selectedFile: null,
      articles: [],
      comments: null,
    };
  },
  // moment ou la vue est afficher
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/auth");
      return;
    } else {
      this.$store
        .dispatch("getAllArticles")
        .then((res) => (this.articles = res.data));
    }
    
  },
  computed: {},
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/auth");
    },
    selectImg(event) {
      this.selectedFile = event.target.files[0];
    },
    createArticle() {
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      fd.append("article_message", this.message);
      this.$store.dispatch("createArticle", fd);
    },
    deleteArticle(article, index) {
      this.$store.dispatch("deleteArticle", article).then((res) => {
        if (res.status == 200) {
          this.articles.splice(index, 1);
        }
      });
    },
    createComment(article) {
      // const objetComment = {comment_message: this.comment_message}
      // this.$store.dispatch("createComment",article,objet);
      this.store.dispatch('createComment',article)

    },
    getArticleComments(article) {
      this.$store.dispatch("getArticleComments",article)
      .then((res) => { 
        article.comments = res.data
        console.log(res.data);
      });
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style scoped >
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