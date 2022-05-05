import { createStore } from 'vuex'
const axios = require('axios');
import createPersistedState from "vuex-persistedstate";

const instance = axios.create({
  baseURL: 'http://localhost:3300/api/'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = 'bearer ' + user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      nom: '',
      prenom: '',
      email: '',
      image: '',
    },
    dataArticles: [],
    dataComments: [],
    articleInfos: {
      message: '',
      image: '',
    },
    comments: [],
  },
    plugins: [createPersistedState()],
  // objet qui contient toute les propriétes responsable de modification du state
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = 'bearer ' + user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    },
    dataArticles(state, dataArticles) {
      state.dataArticles = dataArticles;
    },
    articleInfos(state, articleInfos) {
      state.articleInfos = articleInfos;
    },
    comments(state,comments) {
      state.comments = comments;
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(function (response) {
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login');
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
          .then(function (response) {
            commit('setStatus', 'created');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
          });
      });
    },
    modifyUser: ({ commit }, userInfos) => {
      commit('setStatus');
      return new Promise((resolve, reject) => {
        instance.put(`/user/${user.userId}`, userInfos)
          .then(function (response) {
            commit('setStatus');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus');
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit },userInfos) => {
      instance.get(`/user/${user.userId}`,userInfos)
        .then(function (response) {
          commit('userInfos', response.data);
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    deleteAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.delete(`/user/${user.userId}`, userInfos)
          .then(function (response) {
            commit('setStatus');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus');
            reject(error);
          });
      });
    },
    getAllArticles() {
      return instance.get('/article')
    },
    createArticle: ({ commit }, articleInfos) => {
      commit;
     return instance.post('/article', articleInfos)
    },
    // createArticle: ({ commit }, articleInfos) => {
    //   instance.post('/article', articleInfos)
    //   .then(function () {
    //     commit('articleInfos');
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   });
    // },
    deleteArticle({ commit }, dataArticles) {
      commit;
       return instance.delete(`/article/${dataArticles.article_id}`)
       
    },
    // deleteArticle({ commit }, dataArticles) {
    //   commit;
    //   return new Promise(() => {
    //     instance.delete(`/article/${dataArticles.article_id}`)
    //     .then(function (res) {
    //       console.log(res)
    //     })
    //     .catch(function () {  
    //     });
    //   })
    // },
    createComment: ({ commit }, comments) => {
      commit;
     return instance.post('/comment/',comments)
     
    },
    // createComment: ({ commit }, comments) => {
    //   commit;
    //   instance.post('/comment/',comments)
    //   .then(function (response) {
    //     commit('setStatus', 'comments');
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     commit('setStatus', );
    //     console.log(error)
    //   })
    // },
    deleteComment({ commit }, comments) {
      commit;
      return instance.delete(`/comment/${comments.comment_id}`)
    },
    // deleteComment({ commit }, comments) {
    //   commit;
    //   return new Promise(() => {
    //     instance.delete(`/comment/${comments.comment_id}`)
    //     .then(function (res) {
    //       console.log(res)
    //     })
    //     .catch(function () {  
    //     });
    //   })
    // },
    getArticleComments: ({ commit }, dataArticles) => {
      commit;
      return instance.get(`/comment/${dataArticles.article_id}`)
    },
  }
})

export default store;