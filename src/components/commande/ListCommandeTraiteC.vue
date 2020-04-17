<template lang="html">

  <section class="list-commande-traite">
    <h2 class="alert alert-success">List Commandes Traite</h2>
    <div>
      <v-client-table :data="commandes" :columns="columns" :options="options">
          <router-link :to="{ name: 'detail_commande_client', params: { id: props.row.id }}" slot="detail" slot-scope="props" class="" >
            <p><i class="far fa-eye"></i></p>
          </router-link>
          <router-link :to="{ name: 'detail_client', params: { id: props.row.client_id }}" slot="client_id" slot-scope="props" class="text-center">
            <strong><em>{{ props.row.client_id | nomClient(clients)|upper}}</em></strong>
          </router-link>
          <button type="button" slot="completed" class="btn btn-success text-center text-light">
            <i class="fa fa-check"></i>
          </button>
      </v-client-table>
    </div>
    <!-- fa-times -->
  </section>

</template>

<script lang="js">
import axios from 'axios'

  export default  {
    name: 'ListCommandesTraiteC',
    props: [],
    mounted() {
      this.getAllClients();
      this.getAllCommandes();
    },
    data() {
      return {
        auth_id: this.$auth.getUserId(),
        clients:[],
        commandes: [],
        columns: ['id', 'detail', 'client_id', 'total_HT_vent', 'total_HT_lettre', 'completed', 'created_at', 'updated_at'],
        options: {
          headings: {
            id: 'N Commande',
            detail: 'Detail',
            client_id: 'Client',
            total_HT_vent: 'Total/DH',
            total_HT_lettre: 'Total Lettre',
            completed: 'Traite',
            created_at: 'Date Creation',
            updated_at: 'Date Modification'
          },
          sortable: ['id', 'created_at', 'updated_at', 'total_HT_vent'],
          filterable: ['id', 'created_at', 'updated_at']
        }
      }
    },
    filters: {
      nomClient: function (value, clients) {
        for(var c of clients)
        {
          if(c.id == value)
          {
            return c.nom_soc;
          }
        }
      },
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
      getAllCommandes(){
        axios.get('/client_commande/get_all_commande_traite').then(response => {
            this.commandes = response.data;
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
  .list-commandes-traite {

  }
</style>
