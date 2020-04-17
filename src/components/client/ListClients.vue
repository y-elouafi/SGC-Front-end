<template lang="html">

  <section class="list-clients">
    <h2 class="alert alert-success">La List Des Clients</h2>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
      <div class="form-inline  " >
        <!-- <input class="form-control mr-sm-4" type="text"  placeholder="Search client"> -->
        <button class="ml-1 btn btn-success mr-sm-4 col align-self-center " @click="getAllClientsActive" ><strong>Tous les clients active</strong></button>
        <button class="ml-1 btn btn-danger mr-sm-4 col align-self-end " @click="getAllClientsDesactive"><strong>Tous les clients desactive</strong></button>
        <button class="ml-1 btn btn-primary mr-sm-4 col align-self-start text-center" style="height: 62px;" @click="getAllClients"><strong>Tous les clients</strong></button>
      </div>
    </nav>
    <div>
      <v-client-table :data="clients" :columns="columns" :options="options">
        <!-- <input type="checkbox" slot="checkable" slot-scope="props" class="text-center"> -->
        
        <p slot="is_active" slot-scope="props" :class="props.row.is_active?'text-success' : 'text-danger'">
          <strong>{{props.row.is_active?'Active' : 'Desactive'}}</strong>
        </p>
        <p slot="num_patente" slot-scope="props" class="btn btn-dark">
            <strong>{{props.row.num_patente}}</strong>
        </p>
       <router-link :to="{ name: 'detail_client', params: { id: props.row.id }}" slot="nom_soc" slot-scope="props" class="" >
         <strong>{{props.row.nom_soc | upper}}</strong>
       </router-link>
        <router-link :to="{ name: 'update_client', params: { id: props.row.id }}" slot="modifier" slot-scope="props" class="btn btn-success text-center text-light">
          <i class="fa fa-edit"></i>
        </router-link>
        <button type="button" slot="changeEtat" slot-scope="props"  
        :class="!props.row.is_active? 'btn btn-success text-center text-light' : 
        'btn btn-danger text-center text-light'" @click="changeEtatClient(props.row.id)">
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
    name: 'ListClients',
    props: [],
    mounted() {
      this.getAllClientsActive();
    },
    data() {
      return {
        clients: [],
        columns: ['id', 'nom_soc', 'is_active', 'num_patente', 'plafond', 'credit', 'modifier', 'changeEtat'],
        options: {
          headings: {
            id: 'Code',
            nom_soc: 'Entreprise',
            is_active: 'Etat Client',
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
      getAllClients(){
        axios.get('/client/all_clients').then(response => {
            this.clients = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getAllClientsActive(){
        axios.get('/client/all_clients_active').then(response => {
            this.clients = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getAllClientsDesactive(){
        axios.get('/client/all_clients_desactive').then(response => {
            this.clients = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      changeEtatClient(val){
        axios.put('/client/change_etat_client', {id: val}).then(response => {
            this.getAllClients();
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
  .list-clients {

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
