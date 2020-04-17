<template lang="html">

  <section class="update-client">
    <h4 class="alert alert-success ">Update Client <em class="text-primary">{{client.nom_soc|upper}}</em></h4>


   <Form @submit.prevent="" class="">
      <div class="form-group row">
        <div class="form-group col-md-4">
          <label for="nom_soc"><span class="text-danger" v-show="errors.nom_soc">* </span><strong>Nom Entreprise</strong></label>
          <input type="text" class="form-control" id="nom_soc"  v-model="client.nom_soc"  @input="errors.nom_soc_exist=false">
          <div v-show="errors.nom_soc_exist" class="text-danger">Ce nom exist deja!</div>
          <div v-show="errors.nom_soc" class="text-danger">Champs ne peut etre vide</div>
        </div>
        <div class="form-group col-md-4">
          <label for="email"><span class="text-danger" v-show="errors.email">* </span><strong>Email Address</strong></label>
          <input type="email" class="form-control" id="email" v-model="client.email" >
          <div v-show="errors.email" class="text-danger">Entre une format valide</div>
        </div>
        <div class="form-group col-md-4">
            <label for="localisation_id"><span class="text-danger" v-show="errors.localisation_id">* </span><strong>Villes</strong></label>
            <select class="form-control" id="localisation_id" v-model="client.localisation_id" >
              <!-- <option disabled value="0" >Choisissez</option> -->
              <option v-for="ville in villes" :key="ville.id" v-bind:value="ville.id" :selected="ville.id == client.localisation_id">{{ville.nom_ville}}</option>
            </select>
            <div v-show="errors.localisation_id" class="text-danger">Vous devez choisir une ville</div>
        </div>
      </div>
      <div class="form-group row">
          <div class="form-group col-md-4">
            <label for="gsm"><span class="text-danger" v-show="errors.gsm">* </span><strong>Telephone</strong></label>
            <input type="tel" class="form-control" id="gsm" v-model="client.gsm" >
            <div v-show="errors.gsm" class="text-danger">Numero avec format obligatoir</div>
          </div>
          <div class="form-group col-md-4">
              <label for="fax"><strong>Fax</strong></label>
              <input type="tel" class="form-control" id="fax" v-model="client.fax">
          </div>
          <div class="form-group col-md-4">
            <label for="site_web"><strong>Site Web</strong></label>
            <input type="text" class="form-control" id="site_web" v-model="client.site_web">
          </div>
      </div>
      <div class="form-group row">
        <div class="form-group col-md-4">
            <label for="num_patente"><span class="text-danger" v-show="errors.num_patente">* </span><strong>ICE</strong></label>
            <input type="text" class="form-control" id="num_patente" v-model="client.num_patente" >
            <div v-show="errors.num_patente" class="text-danger">Champs ne peut etre vide</div>
          </div>
          <div class="form-group col-md-4">
            <label for="plafond"><span class="text-danger" v-show="errors.plafond">* </span><strong>Plafond (DH)</strong></label>
            <input type="text" class="form-control" id="plafond" v-model="client.plafond" >
            <div v-show="errors.plafond" class="text-danger">Champs ne peut etre vide</div>
          </div>
          <div class="form-group col-md-4">
            <label for="credit"><strong>Credit (DH)</strong></label>
            <input type="text" class="form-control" id="credit" v-model="client.credit" >
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center  ">
          <div class="form-group col-md-4">
            <label for="typesociete_id"><span class="text-danger" v-show="errors.typesociete_id">* </span><strong>Type Societe</strong></label>
            <select class="form-control" id="typesociete_id" v-model="client.typesociete_id" >
              <!-- <option disabled value="0" >Choisissez</option> -->
              <option v-for="type in types" :key="type.id" v-bind:value="type.id" :selected="type.id == client.typesociete_id">{{type.valeur}}</option>
            </select>
             <div v-show="errors.typesociete_id" class="text-danger">Vous devez choisir une type</div>
        </div>
      </div>
      <div class="form-group row h-100 justify-content-center  ">
          <div class="form-group col-md-4">
            <label for="adresse"><span class="text-danger" v-show="errors.adresse">* </span><strong>Adresse</strong></label>
            <textarea class="form-control" v-model="client.adresse" id="adresse" ></textarea>
            <div v-show="errors.adresse" class="text-danger">Champs ne peut etre vide</div>
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center ">
          <div class="form-group col-md-4">
            <button class="btn btn-success" v-show="dataTouched" @click="updateClient">Modifier <i class="fa fa-check"></i></button>
          </div>
          <div class="form-group col-md-4">
            <button class="btn btn-danger" v-show="dataTouched" @click="cancelUpdateClient">Annuler <i class="fa fa-times"></i></button>
          </div>
      </div>
      

    </Form>
  </section>

</template>

<script lang="js">

    import axios from 'axios'
    import store from './Store.js'

  export default  {
    
    name: 'UpdateClient',
    props: [],
    store: store,
    created(){
      // this.initialClient();
    },
    mounted() {
      // setTimeout(() => {
        // this.findClient();
        this.initialClient();
      // }, 1000);
      
    },
    updated(){
      this.updateTouchedFunction();
    },
    data() {
      return {
        dataTouched: false,
        clientRemember:{},
        client:{},
        villes: [],
        types: [],
        errors:{
          nom_soc: false,
          email: false,
          gsm: false ,
          localisation_id: false ,
          typesociete_id: false ,
          num_patente: false ,
          plafond: false,
          adresse: false,
          nom_soc_exist:false
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
      initialClient()
      {
          // this.$store.dispatch('initialVilles');
          // this.$store.dispatch('initialTypesSoc');
          // this.$store.dispatch('findClient', {id: this.$route.params.id}); // id de client
          // setTimeout(() => {
          //   this.client = Object.assign({}, this.$store.getters.getClient);
          //   this.clientRemember = Object.assign({}, this.$store.getters.getClient);
          //   this.villes = this.$store.getters.getVilles.slice(0);
          //   this.types = this.$store.getters.getTypesSoc.slice(0);
          //   this.dataTouched = false;
          // }, 4500);
          
          this.findClient();
          this.getVilles();
          this.getTypesSoc();
          this.dataTouched = false;
      },
      updateTouchedFunction(){
          if(JSON.stringify(this.client) != JSON.stringify(this.clientRemember))
            this.dataTouched = true;
          else
            this.dataTouched = false;
      },
      cancelUpdateClient(){
        this.client = Object.assign({}, this.clientRemember);
      },
      validateForm()
      {
          if(this.client.nom_soc != '')
          {
            this.errors.nom_soc = false;
          }
          else
            this.errors.nom_soc = true;

          if(this.client.email != '')
            this.errors.email = false;
          else
            this.errors.email = true;

          if(this.client.gsm != '' && !isNaN(this.client.gsm))
          {
            this.errors.gsm = false;
          }
          else
          {
              this.errors.gsm = true;
          }
          if((this.client.localisation_id != '' || this.client.localisation_id != 0) && !isNaN(this.client.localisation_id))
          {
            this.errors.localisation_id = false;
          } 
          else
          {
            this.errors.localisation_id = true; 
          }
          if(this.client.num_patente != '')
            this.errors.num_patente = false;
          else
            this.errors.num_patente = true;  

          if(this.client.plafond >= 0)
            this.errors.plafond = false;
          else
          {
            this.errors.plafond = true;
          }
          if(this.client.adresse != '')
            this.errors.adresse = false;
          else
            this.errors.adresse = true; 
              
          if(!this.errors.nom_soc && !this.errors.email && !this.errors.gsm && !this.errors.localisation_id &&
           !this.errors.num_patente && !this.errors.plafond && !this.errors.adresse) 
           {
             return true;
           }   
          else
          {
            return false;
          }   
      },
      findClient(){
            axios.get('client/find_client/'+this.$route.params.id).then(response => {
                     this.client = response.data.client;
                     this.clientRemember = Object.assign({}, response.data.client);
                  
                }, () => {
                  alert('Error sorry we have any data');
                });
        },
      getVilles(){
          axios.get('/villes').then(response => {
                    this.villes = response.data
              }, () => {
                alert('Error sorry we have any data');
              });
      },
      getTypesSoc(){
          axios.get('/types_soc').then(response => {
                    this.types = response.data
              }, () => {
                alert('Error sorry we have any data');
              });
      },
      updateClient()
      {
        if(this.validateForm()){
          axios.put('/client/update_client',  {client: this.client}).then(response => {
            var nomExist = response.data;
            if(nomExist == 1)
            {
              this.errors.nom_soc_exist = true;
            }
            else
            {
              this.client = response.data.client;
              this.clientRemember = Object.assign({}, response.data.client);
              this.dataTouched = false;
              alert('Le client: '+ this.client.nom_soc + ' a ete bien modifier!');
            }
          }, () => {
            alert('Error sorry we have any data');
          });
        }
      }
    },
    watch: {

    },
    computed: {

    }
}
</script>

<style>
  .update-client {

  }
  label{
    color:darkgoldenrod;
  }
</style>
