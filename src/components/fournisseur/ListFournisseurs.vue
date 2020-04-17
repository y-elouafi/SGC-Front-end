<template lang="html">

  <section class="list-fournisseur">
    <h2 class="alert alert-success">La List Des Clients</h2>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
      <div class="form-inline  " >
        <!-- <input class="form-control mr-sm-4" type="text"  placeholder="Search client"> -->
        <button class="ml-1 btn btn-success mr-sm-4 col align-self-center " @click="getAllFournisseursActive" ><strong>Tous les fournisseurs active</strong></button>
        <button class="ml-1 btn btn-danger mr-sm-4 col align-self-end " @click="getAllFournisseursDesactive"><strong>Tous les fournisseurs desactive</strong></button>
        <button class="ml-1 btn btn-primary mr-sm-4 col align-self-start text-center" style="height: 62px;" @click="getAllFournisseurs"><strong>Tous les fournisseurs</strong></button>
      </div>
    </nav>
    <div>
      <v-client-table :data="fournisseurs" :columns="columns" :options="options">
        <!-- <input type="checkbox" slot="checkable" slot-scope="props" class="text-center"> -->
        
        <p slot="is_active" slot-scope="props" :class="props.row.is_active?'text-success' : 'text-danger'">
          <strong>{{props.row.is_active?'Active' : 'Desactive'}}</strong>
        </p>
        <p slot="num_patente" slot-scope="props" class="btn btn-dark">
            <strong>{{props.row.num_patente}}</strong>
        </p>
       <router-link :to="{ name: 'detail_fournisseur', params: { id: props.row.id }}" slot="nom_soc" slot-scope="props" class="" >
         <strong>{{props.row.nom_soc | upper}}</strong>
       </router-link>
        <router-link :to="{ name: 'update_fournisseur', params: { id: props.row.id }}" slot="modifier" slot-scope="props" class="btn btn-success text-center text-light">
          <i class="fa fa-edit"></i>
        </router-link>
        <button type="button" slot="changeEtat" slot-scope="props"  
        :class="!props.row.is_active? 'btn btn-success text-center text-light' : 
        'btn btn-danger text-center text-light'" @click="changeEtatFournisseur(props.row.id)">
          <i class="fa fa-check" v-show="!props.row.is_active"></i>
          <i class="fa fa-times"  v-show="props.row.is_active"></i>
        </button>
      </v-client-table>
    </div>
    <!-- fa-times -->
  </section>

</template>

<script lang="js">
import axios from 'axios'

  export default  {
    name: 'ListFournisseur',
    props: [],
    mounted() {
      this.getAllFournisseursActive();
    },
    data() {
      return {
        fournisseurs: [],
        columns: ['id', 'nom_soc', 'is_active', 'num_patente', 'plafond', 'credit', 'modifier', 'changeEtat'],
        options: {
          headings: {
            id: 'Code',
            nom_soc: 'Entreprise',
            is_active: 'Etat Fournisseur',
            num_patente: 'ICE',
            plafond: 'Plafond',
            credit: 'Credit',
            modifier: 'Modifier',
            changeEtat: 'Change Etat'
          },
          sortable: ['id', 'nom_soc', 'plafond', 'credit'],
          filterable: ['id', 'nom_soc']
        }
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      upper: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.toUpperCase();
      }
    },
    methods: {
      getAllFournisseurs(){
        axios.get('/fournisseur/all_fournisseurs').then(response => {
            this.fournisseurs = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getAllFournisseursActive(){
        axios.get('/fournisseur/all_fournisseurs_active').then(response => {
            this.fournisseurs = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getAllFournisseursDesactive(){
        axios.get('/fournisseur/all_fournisseurs_desactive').then(response => {
            this.fournisseurs = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      changeEtatFournisseur(val){
        axios.put('/fournisseur/change_etat_fournisseur', {id: val}).then(response => {
            this.getAllFournisseurs();
          }, () => {
            alert('Error sorry we have any data');
          });
      }

    },
    computed: {

    }
}
</script>

<style >
  .list-fournisseurs {

  }
  .pos{
    text-align: center;
  }
  /* // .element-center{
  //   width: 100%;
  //   margin: auto;
  //   margin-left: 40%;
  // } */

</style>
