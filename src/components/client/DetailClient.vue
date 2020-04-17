<template lang="html">

  <section class="detail-client">
    <h3 class="alert alert-success">Detail Client: <span class="text-primary">{{client.nom_soc | upper}}</span></h3>
<div class="col">
    <div class="row text-dark">
        <div class="col">
            <h5>Nom Client</h5>
            <p class="text-info"> {{client.nom_soc|capitalize}}</p>
        </div>
        <div class="col">
            <h5>Telephone Client</h5>
            <p class="text-info"> {{client.gsm}}</p>
        </div>
        <div class="col">
            <h5>Fax Client</h5>
            <p class="text-info"> {{client.fax != ''? (client.fax) : '---'}}</p>
        </div>
    </div>
    <hr>
    <div class="row text-dark">
        <div class="col">
            <h5>Email Client</h5>
            <p class="text-info"> {{client.email}}</p>
        </div>
        <div class="col">
            <h5>Site Web Client</h5>
            <p class="text-info"> {{client.site_web != ''? client.site_web : '---'}}</p>
        </div>
        <div class="col">
            <h5>Adresse Client</h5>
            <p class="text-info"> {{client.adresse|capitalize}}</p>
        </div>
    </div>
    <hr>
    <div class="row text-dark">
      <div class="col">
            <h5>Etat Client</h5>
            <p :class="client.is_active?'btn btn-success':'btn btn-danger'"> {{client.is_active? 'Active': 'Desactive'}}</p>
        </div>
        <div class="col">
            <h5>Credit Client</h5>
            <p class="text-info"> {{client.credit}} DH</p>
        </div>
        <div class="col">
            <h5>Plafond Client</h5>
            <p class="text-info"> {{client.plafond}} DH</p>
        </div>
    </div>
    <hr>
    <div class="row text-dark">
        <div class="col">
            <h5>Patente Client</h5>
            <p class="btn btn-dark text-light"> <strong>{{client.num_patente}}</strong></p>
        </div>
        <div class="col">
            <h5>Type Societe</h5>
            <p class="text-info"> {{type_soc}} </p>
        </div>
        <div class="col">
            <h5>Ville Client</h5>
            <p class="text-info"> {{ville}} </p>
        </div>
    </div>
    <hr>
    <div class="row form-group justify-content-center btn btn-dark w-100">
      <label class="text-warning">Choisir Detail List</label>
      <select class="form-control text-center" v-model="activeList.id">
        <option class="text-center" v-bind:value="'1'"><strong>Representants</strong></option>
        <option class="text-center" v-bind:value="'2'"><strong>Commandes</strong></option>
        <option class="text-center" v-bind:value="'3'"><strong>Bons</strong></option>
        <option class="text-center" v-bind:value="'4'"><strong>Factures</strong></option>
        <option class="text-center" v-bind:value="'5'"><strong>Avoirs</strong></option>
      </select>

    </div>
    <hr>
    <ListRepresentants :id="client.id" :representants="representants" v-if="activeList.representant" @representants-changed="updateRepresentantsList($event)"></ListRepresentants>
    <br/>
  </div>

  </section>

</template>

<script lang="js">

import axios from 'axios'
import ListRepresentants from './../representant/ListRepresentantsC.vue'
  export default  {
    name: 'detail-client',
    props: [],
    components: {
      ListRepresentants
    },
    mounted() {
      this.getClient();
      this.detailList(1);
    },
    data() {
      return {
          client:{},
          ville: '',
          type_soc: '',
          representants: [],

          activeList: {
            id: 1,
            representant: false,
            commande: false,
            bons: false,
            facture: false,
            avoir: false
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
      detailList(val){
        if(val == 2)
          {
            this.activeList.id = val;
            this.activeList.representant = false;
            this.activeList.commande = true;
            this.activeList.bons = false;
            this.activeList.facture = false;
            this.activeList.avoir = false;
          }
          else if(val == 3)
          {
            this.activeList.id = val;
            this.activeList.representant = false;
            this.activeList.commande = false;
            this.activeList.bons = true;
            this.activeList.facture = false;
            this.activeList.avoir = false;
          }
          else if(val == 4)
          {
            this.activeList.id = val;
            this.activeList.representant = false;
            this.activeList.commande = false;
            this.activeList.bons = false;
            this.activeList.facture = true;
            this.activeList.avoir = false;
          }
          else if(val == 5)
          {
            this.activeList.id = val;
            this.activeList.representant = false;
            this.activeList.commande = false;
            this.activeList.bons = false;
            this.activeList.facture = false;
            this.activeList.avoir = true;
          }
          else
          {
            this.activeList.id = 1;
            this.activeList.representant = true;
            this.activeList.commande = false;
            this.activeList.bons = false;
            this.activeList.facture = false;
            this.activeList.avoir = false;
          }
      },
      updateRepresentantsList(event){
        this.representants = event;
      },
      getClient(){
        axios.get('client/find_client/'+this.$route.params.id).then(response => {
            this.client = response.data.client;
            this.ville = response.data.ville;
            this.type_soc = response.data.type_soc;
            var json_data = response.data.representants;
            for(var i of json_data)
                this.representants.push(i);
          }, () => {
            alert('Error sorry we have any data');
          });
      }

    },
    watch: {
      'activeList.id': function(val){
        this.detailList(val);
      }
    },
    computed: {

    }
}
</script>

<style>
  .detail-client {

  }
  .btn-width{

  }

</style>
