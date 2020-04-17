 export const articleStore = new Vuex.Store({ 
 state:{
  // Current state of the application lies here.
 },
 getters:{
  // Compute derived state based on the current state. More like computed property.
 },
 mutations:{
  // Mutate the current state
 },
 actions:{
  // Get data from server and send that to mutations to mutate the current state
 }
})
// You can assign a store to variable and export 
//  export const store = new Vuex.Store({})
// // Import the store
// import { store } from '/path/to/file'