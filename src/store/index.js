//import { from } from 'core-js/fn/array'
import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './../firebase'
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allcursos: [],
    curso: {},
    carrito: {}
  },

  mutations: {
    getCursosMutation(state, payload) {
      state.allcursos = payload;
    },

    getCursoMutation(state, payload) {
      state.curso = payload;
    },

    addCarritoMutation(state, payload) {
      state.carrito[payload.id] = payload;
    }
  },

  actions: {
    async getCursosAction({commit}) {
      const info = await fetch('http://my-json-server.typicode.com/carloscastillo369/cursosjson/cursos')
      let data = await info.json();
      commit('getCursosMutation', data);
    },

    async getCursoAction({commit}, id) {
      const info = await fetch(`http://my-json-server.typicode.com/carloscastillo369/cursosjson/cursos/${id}`)
      let data = await info.json();
      commit('getCursoMutation', data);
    },

    async addCarritoAction({commit, state}, curso){
      const info = await fetch(`http://my-json-server.typicode.com/carloscastillo369/cursosjson/cursos/${curso.id}`)
      let data = await info.json();
      state.carrito.hasOwnProperty(curso.id)
        ? curso.cantidad = state.carrito[curso.id].cantidad + 1
        : curso.cantidad = 1
      commit('addCarritoMutation', data);
    },

    createFormAction({commit}, form){
      db.collection('datosformulario').add({
        form
      })

      .then(doc => {
        router.push('/register');
      })
    }



  },

  modules: {
  }
})
