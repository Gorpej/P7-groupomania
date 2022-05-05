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
              aria-label="textmessage"
              placeholder="Ecrivez votre message ici"
              v-model="message"
            ></textarea>
          </div>
          <div class="input-group mb-3">
            <button
              class="btn btn-secondary"
              v-on:click="createArticle()"
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
              <div
                v-on:click="deleteArticle(article, index)"
                class="card-header__tools__logo_delete"
              >
                <i class="bi bi-trash-fill"></i>
              </div>
            </div>
          </div>
          <img
            class="card-img-top"
            v-if="article.article_img"
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
            <div
              class="container_comment"
              v-for="(comment, indexC) in article.comments"
              :key="indexC"
            >
              <ul class="list-group list-group comments">
                <li
                  class="
                    list-group-item
                    fst-italic
                    list-group-item-action
                    comment
                  "
                >
                  <i
                    class="bi bi-x"
                    @click="deleteComment(article, comment, indexC)"
                  ></i>
                  <div class="nameComment">
                    {{ comment.user_lastName }}
                    {{ comment.user_firstName + ":" }}
                  </div>
                  {{ comment.comment_message }}
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
                  aria-label="textArea"
                  rows="1"
                  ref="string"
                  v-model="comment"
                ></textarea>
                <button
                  type="submit"
                  aria-label="boutoncomment"
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
      message: "",
      selectedFile: "",
      articles: [],
      comment: "",
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
      if (this.message == "") {
        alert("votre message est vide");
      } else {
        if (this.selectedFile) {
          fd.append("image", this.selectedFile, this.selectedFile.name);
          fd.append("article_message", this.message);
        } else {
          fd.append("article_message", this.message);
        }
        this.$store.dispatch("createArticle", fd)
        .then((res) => {
          this.articles.unshift(res.data[0])
          })
        .catch((error) => {
          console.error(error)
        })
      }
    },
    deleteArticle(article, index) {
      this.$store.dispatch("deleteArticle", article).then((res) => {
        if (res.status == 200) {
          this.articles.splice(index, 1);
        }
      });
    },
    createComment(article) {
      this.$store.dispatch("createComment", {
        comment_articleId: article.article_id,
        comment_message: this.comment,
      })
       .then((res,) => {
         if (Array.isArray(article.comments)) {
          article.comments.push(res.data[0]);
         }
          })
         .catch((error) => {
          console.error(error)
        })
    },
    deleteComment(article,comment, indexC) {
      this.$store.dispatch("deleteComment", comment).then((res) => {
        if (res.status == 200) {
           console.log(res)
          article.comments.splice(indexC, 1);
        }
      });
    },
    getArticleComments(article) {
      this.$store.dispatch("getArticleComments", article).then((res) => {
        article.comments = res.data;
      });
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
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.nameComment {
  font-weight: bold;
  font-style: normal !important;
  text-decoration: underline;
  margin-left: -20px;
  margin-right: 10px;
}

.bi-x {
  font-size: 1.2rem;
  transform: translate(428px, 2px);
  cursor: pointer;
  color: white;
}
.bi-x:hover {
  transition: 0.3s;
  color: black;
}
@media (max-width: 768px) {
  section {
    width: 300px;
    margin-top: 100px;
  }
  .card {
    width: 100vw;
  }
  .card-deck {
    width: 100vw;
  }
}
</style>