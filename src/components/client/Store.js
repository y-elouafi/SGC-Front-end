import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({ 
    state:{
        villes:[],
        client:{},
        ville:{},
        types_soc:[],
        type_soc:{},
        representants: []
    },
    getters:{
        getVilles: (state)=>{
            return state.villes
        },
        getClient: (state)=>{
            return state.client;
        },
        getVille: (state)=>{
            return state.ville;
        },
        getTypesSoc: (state)=>{
            return state.types_soc;
        },
        getTypeSoc: (state)=>{
            return state.type_soc;
        },
        getRepresentants: (state)=>{
            return state.representants;
        }
    },
    mutations:{
        setVilles:(state, object)=>{
             state.villes = object.villes;
        },
        setClient:(state, object)=>{
            state.client = object.client;
        },
        setVille: (state, object)=>{
            state.ville = object.ville;
        },
        setTypesSoc: (state, object)=>{
            state.types_soc = object.types_soc;
        },
        setTypeSoc: (state, object)=>{
            state.vtype_socille = object.type_soc;
        },
        setRepresentants: (state, object)=>{
            for(var i of object.representants)
                state.representants.push(i);
        }
    },
    actions:{
        initialVilles: (store)=>{
            axios.get('/villes').then(response => {
                store.commit('setVilles', {
                    villes: response.data
                  });
              }, () => {
                alert('Error sorry we have any data');
              });
        },
        initialTypesSoc: (store)=>{
            axios.get('/types_soc').then(response => {
                store.commit('setTypesSoc', {
                    types_soc: response.data
                  });
              }, () => {
                alert('Error sorry we have any data');
              });
        },
        findClient: (store, object)=>{
            axios.get('client/find_client/'+object.id).then(response => {
                store.commit('setClient', {
                    client: response.data.client
                });
                store.commit('setVille', {
                    ville: response.data.ville
                });
                store.commit('setTypeSoc', {
                    type_soc: response.data.type_soc
                });
                store.commit('setRepresentants', {
                    representants : response.data.representants
                });

                }, () => {
                  alert('Error sorry we have any data');
                });
        }
    },
    plugins: [createPersistedState({
        storage: {
          getItem: key => Cookies.get(key),
          // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
          setItem: (key, value) =>
            Cookies.set(key, value, { expires: 3, secure: true }),
          removeItem: key => Cookies.remove(key),
        },
      }),
    ],
    strict: true
})

// global.Store = store

export default store