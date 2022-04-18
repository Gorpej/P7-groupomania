import { createStore } from 'vuex'
const axios = require('axios');

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
    },
    dataArticles: [],
    articleInfos: {
      message: '',
      image: '',
    },
    dataComments: [],
  },
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
    deleteArticle: function(state,dataArticles ) {
      state.dataArticles = dataArticles;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    },
    getAllArticles(state, dataArticles) {
      state.dataArticles = dataArticles;
    },
    articleInfos(state, articleInfos) {
      state.articleInfos = articleInfos;
    },
    getArticleComments(state, dataComments) {
      state.dataComments = dataComments;
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
            commit('setStatus', 'modify');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_modify');
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      instance.get('/user')
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
      instance.post('/article', articleInfos)
        .then(function () {
          commit('articleInfos');
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    deleteArticle ({commit},dataArticle) {
      commit;
      return new Promise(() => {
        instance.delete(`/article/${dataArticle.article_id}`)
      })
    },
    getComments: ({commit},dataArticle) => {
      commit('getArticleComments');
      return new Promise(() => {
      return instance.get(`/comment/${dataArticle.article_id}`)
      })
    },
  }
})

export default store;