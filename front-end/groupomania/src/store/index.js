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
      image: '',
    },
    dataArticles: [],
    dataComments: [],
    articleInfos: {
      message: '',
      image: '',
    },
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
    getComments(state, dataComments) {
      state.dataArticles.dataComments = dataComments;
      console.log(dataComments)
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
      instance.get(`/user/${user.userId}`)
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
    deleteArticle({ commit }, dataArticles) {
      commit;
      return new Promise(() => {
        instance.delete(`/article/${dataArticles.article_id}`)
      })
    },
    createComment: ({ commit }, dataArticles,comments) => {
      return new Promise(() => {
      instance.post(`/comment/${dataArticles.article_id}`,comments)
        .then(function () {
          commit('getComments');
        })
        .catch(function (error) {
          console.log(error)
        });
      })
    },
    getArticleComments: ({ commit }, dataArticles) => {
      return new Promise(() => {
        instance.get(`/comment/${dataArticles.article_id}`)
          .then(function (res) {
            commit('getComments', res.data);
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    },
  }
})

export default store;