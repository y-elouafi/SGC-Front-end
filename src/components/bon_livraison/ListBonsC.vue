<template lang="html">

  <section class="list-bon-livraisons">
    <h2 class="alert alert-success">List Bons Livraisons</h2>
    <!-- <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
      <div class="form-inline  " > -->
        <!-- <input class="form-control mr-sm-4" type="text"  placeholder="Search client"> -->
        <!-- <button class="ml-1 btn btn-success mr-sm-4 col align-self-center " @click="getAllClientsActive" ><strong>Tous les clients active</strong></button>
        <button class="ml-1 btn btn-danger mr-sm-4 col align-self-end " @click="getAllClientsDesactive"><strong>Tous les clients desactive</strong></button>
        <button class="ml-1 btn btn-primary mr-sm-4 col align-self-start text-center" style="height: 62px;" @click="getAllClients"><strong>Tous les clients</strong></button> -->
      <!-- </div>
    </nav> -->
    <div>
      <v-client-table :data="commandes" :columns="columns" :options="options">
          <router-link :to="{ name: 'detail_commande_client', params: { id: props.row.id }}" slot="detail" slot-scope="props" class="" >
            <p><i class="far fa-eye"></i></p>
          </router-link>
          <router-link :to="{ name: 'detail_client', params: { id: props.row.client_id }}" slot="client_id" slot-scope="props" class="text-center">
            <strong><em>{{ props.row.client_id | nomClient(clients)|upper}}</em></strong>
          </router-link>
          <button type="button" slot="completed" slot-scope="props" class="btn btn-primary text-center text-light"  @click="traiteCommandeById(props.row.id)">
            <i class="fa fa-check"></i>
          </button>
          <router-link :to="{ name: 'update_commande_client', params: { id: props.row.id }}" slot="modifier" slot-scope="props" class="btn btn-success text-center text-light">
            <i class="fa fa-edit"></i>
          </router-link>
          <button type="button" slot="supprimer" slot-scope="props" class="btn btn-danger text-center text-light" @click="deleteCommandeById(props.row.id)">
            <i class="fa fa-trash"></i>
          </button>
      </v-client-table>
    </div>
    <!-- fa-times -->
  </section>

</template>

<script lang="js">
import axios from 'axios'

  export default  {
    name: 'ListBonsC',
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
        columns: ['id', 'detail', 'client_id', 'total_HT_vent', 'total_HT_lettre', 'completed', 'created_at', 'updated_at', 'modifier', 'supprimer'],
        options: {
          headings: {
            id: 'N Commande',
            detail: 'Detail',
            client_id: 'Client',
            total_HT_vent: 'Total/DH',
            total_HT_lettre: 'Total Lettre',
            completed: 'Traite',
            created_at: 'Date Creation',
            updated_at: 'Date Modification',
            modifier: 'Modifier',
            supprimer: 'Supprimer'
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
        axios.get('/client_commande/get_all_commande_no_traite').then(response => {
            this.commandes = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      deleteCommandeById(val){
        if(confirm("Vous voulez vraiment supprime la commande N: "+val+"?"))
        {
          axios.delete('/client_commande/delete_commande_client', {data: {commande_id: val}}).then(response => {
              console.log(response.data);
              if(response.data == 1)
              {
                alert("La commande N: "+ val +" est supprimer avec success");
                this.getAllCommandes();
              }
            }, () => {
              alert('Error sorry we have any data');
            });
        }
      },
      traiteCommandeById(val){
        if(confirm("Vous voulez vraiment complete la commande N: "+val+"?"))
        {
          axios.post('/client_commande/finish_commande_client', {commande_id: val, user_id: this.auth_id}).then(response => {
              console.log(response.data);
              if(response.data != null){
                alert("commande est bien traite!");
                this.getAllCommandes();
              }
              else
              {
                alert('Commande n\'est pas traite');
              }
              
            }, () => {
              alert('Error en traitent la commande');
            });
        }
      }
    },
    computed: {

    }
}
</script>

<style >
.list-bon-livraisons {

}
</style>
