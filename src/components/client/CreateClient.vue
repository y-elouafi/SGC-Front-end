<template lang="html">

  <section class="create-client bg-gray pl-2 pr-2 pt-2 ">
    <h1 class="alert alert-success br">Ajouter Un Nouveau Client</h1>


   <Form @submit.prevent="" class="">
      <div class="form-group row">
        <div class="form-group col-md-4">
          <label for="nom_soc"><span class="text-danger" v-show="errors.nom_soc">* </span><strong>Nom Entreprise</strong></label>
          <input type="text" class="form-control" id="nom_soc"  v-model="client.nom_soc"  @input="errors.nom_soc_exist=false">
          <div v-show="errors.nom_soc_exist" class="text-danger">Ce nom exist deja!</div>
        </div>
        <div class="form-group col-md-4">
          <label for="email"><span class="text-danger" v-show="errors.email">* </span><strong>Email Address</strong></label>
          <input type="email" class="form-control" id="email" v-model="client.email" >
        </div>
        <div class="form-group col-md-4">
            <label for="localisation_id"><span class="text-danger" v-show="errors.localisation_id">* </span><strong>Villes</strong></label>
            <select class="form-control" id="localisation_id" v-model="client.localisation_id" >
              <option disabled value="0">Choisissez</option>
              <option v-for="(ville,index) in villes" v-bind:value="ville.id">{{ville.nom_ville}}</option>
            </select>
        </div>
      </div>
      <div class="form-group row">
          <div class="form-group col-md-4">
            <label for="gsm"><span class="text-danger" v-show="errors.gsm">* </span><strong>Telephone</strong></label>
            <input type="tel" class="form-control" id="gsm" v-model="client.gsm" >
          </div>
          <div class="form-group col-md-4">
              <label for="fax"><strong>Fax</strong></label>
              <input type="tel" class="form-control" id="fax" v-model="client.fax">
          </div>
          <div class="form-group col-md-4">
            <label for="typesociete_id"><span class="text-danger" v-show="errors.typesociete_id">* </span><strong>Type Societe</strong></label>
            <select class="form-control" id="typesociete_id" v-model="client.typesociete_id" >
              <option disabled value="0">Choisissez</option>
              <option v-for="(type,index) in types" v-bind:value="type.id">{{type.valeur}}</option>
            </select>
          </div>
      </div>
      <div class="form-group row">
        <div class="form-group col-md-4">
            <label for="num_patente"><span class="text-danger" v-show="errors.num_patente">* </span><strong>Numero Patente</strong></label>
            <input type="text" class="form-control" id="num_patente" v-model="client.num_patente" >
          </div>
          <div class="form-group col-md-4">
            <label for="plafond"><span class="text-danger" v-show="errors.plafond">* </span><strong>Plafond (DH)</strong></label>
            <input type="text" class="form-control" id="plafond" v-model="client.plafond" >
          </div>
          <div class="form-group col-md-4">
            <label for="credit"><strong>Credit (DH)</strong></label>
            <input type="text" class="form-control" id="credit" v-model="client.credit" >
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center  ">
        <div class="form-group col-md-4">
            <label for="site_web"><strong>Site Web</strong></label>
            <input type="text" class="form-control" id="site_web" v-model="client.site_web">
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center  ">
          <div class="form-group col-md-4">
            <label for="adresse"><span class="text-danger" v-show="errors.adresse">* </span><strong>Adresse</strong></label>
            <textarea class="form-control" v-model="client.adresse" id="adresse" ></textarea>
          </div>
      </div>


      <hr class="">
      <div>
        <p class="text-light">Ajouter Representant <strong class="text-warning"> (Optionel)</strong></p>
      </div>
      <div class="form-group row">
        <div class="form-group col-md-3">
            <label for="prenom_r"><strong>Prenom</strong></label>
            <input type="text" class="form-control" id="prenom_r" v-model="representant.prenom" >
          </div>
          <div class="form-group col-md-3">
            <label for="nom_r"><strong>Nom</strong></label>
            <input type="text" class="form-control" id="nom_r" v-model="representant.nom" >
          </div>
          <div class="form-group col-md-3">
            <label for="gsm_r"><strong>Telephone</strong></label>
            <input type="tel" class="form-control" id="gsm_r" v-model="representant.gsm" >
          </div>
          <div class="form-group col-md-3">
            <label for="email_r"><strong>Email</strong></label>
            <input type="email" class="form-control" id="email_r" v-model="representant.email" >
          </div>
      </div>
      <div class="form-group row text-center justify-content-center" v-show="this.errors.representant">
        <p class="text-warning col-md-10 text-center"><strong>Remplire les 3 premier champs representant au moin pour l'ajouter</strong></p>
      </div>

      <div class="form-group row h-100 justify-content-center ">
          <div class="form-group col-md-4">
            <button class="btn btn-primary" v-if="this.errors.buttonValid" @click="createNewClient">Enregistre <i style='font-size:20px;color:white' class="fa fa-address-card"></i></button>
          </div>
      </div>
      

    </Form>
  </section>

</template>

<script lang="js">

import axios from 'axios'
import Vuex from 'vuex'
import store from './Store.js'

  export default  {
    name: 'CreateClient',
    props: [],
    store,
    mounted() {
      // this.$store.dispatch('initialVilles');
      // this.$store.dispatch('initialTypesSoc');
      // setTimeout(() => {
      //   this.villes = this.$store.getters.getVilles;
      //   this.types = this.$store.getters.getTypesSoc;
      //   // console.log(this.$store.getters.getTypesSoc);
      //   // console.log(this.types);
      // }, 2500);

      this.getVilles();
      this.getTypesSoc();
      
    },
    updated(){
      this.validateForm();
    },
    data() {
      return {
        client:{
          nom_soc: '',
          email: '',
          gsm: '',
          fax: '',
          localisation_id: 0,
          typesociete_id: 0,
          site_web: '',
          num_patente: '',
          plafond: 100,
          adresse: '',
          credit: 0
        },
        representant:{
          prenom: '',
          nom: '',
          gsm: '',
          email: ''
        },
        villes: [],
        types:[],
        errors:{
          nom_soc: true,
          email: true,
          gsm: true ,
          localisation_id: true ,
          type_soc: true,
          num_patente: true ,
          plafond: true,
          adresse: true,
          buttonValid: false,
          nom_soc_exist:false,
          representant:false
        }
      }
    },
    methods: {
      validateForm()
      {
          if(this.client.nom_soc != '')
          {
            // this.errors.nom_soc_exist = false;
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
            if(this.client.gsm != '')
              alert('Entre un numero de telephone valide');
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
          if((this.client.typesociete_id != '' || this.client.typesociete_id != 0) && !isNaN(this.client.typesociete_id))
          {
            this.errors.typesociete_id = false;
          } 
          else
          {
            this.errors.typesociete_id = true; 
          }
          if(this.client.num_patente != '')
            this.errors.num_patente = false;
          else
            this.errors.num_patente = true;  

          if(this.client.plafond >= 100)
            this.errors.plafond = false;
          else
          {
            alert('Le plafond ne peut etre inferiuer a 100, ou un caractere!');
            this.errors.plafond = true;
          }
          if(this.client.adresse != '')
            this.errors.adresse = false;
          else
            this.errors.adresse = true; 
              
          if(!this.errors.nom_soc && !this.errors.email && !this.errors.gsm && !this.errors.localisation_id &&
           !this.errors.num_patente && !this.errors.plafond && !this.errors.adresse && !this.errors.typesociete_id)    
            this.errors.buttonValid = true;
          else
            this.errors.buttonValid = false;    
      },
      emptyForm()
      {
        this.client.nom_soc = '';
        this.client.email = '';
        this.client.gsm = '';
        this.client.fax = '';
        this.client.site_web = '';
        this.client.num_patente = '';
        this.client.plafond = 100;
        this.client.adresse = '';
        this.client.credit = 0;
      },
      emptyFormRepresentant()
      {
        this.representant.prenom = '';
        this.representant.nom = '';
        this.representant.gsm = '';
        this.representant.email = '';
      },
      createNewClient()
      {
        if(this.representant.prenom != '' || this.representant.nom != '')
        {
          if(this.representant.prenom == '' || this.representant.nom == '' || this.representant.gsm == '')
          {
            this.errors.representant = true;
          }
          else
            this.errors.representant = false;
        }
        else
        {
          this.errors.representant = false;
        }
        if(!this.errors.representant && this.representant.prenom == '' && this.representant.nom == '')
        {
            axios.post('/client/create_new_client',  {client: this.client}).then(response => {
              var nom = response.data;
              if(nom.nom_soc == null)
              {
                this.errors.nom_soc_exist = true;
              }
              else
              {
                alert('Le client: '+ nom.nom_soc + ' a ete bien ajouter a votre liste clients!');
                this.emptyForm();
                this.emptyFormRepresentant();
              }
            }, () => {
              alert('Error sorry we have any data');
            });
        }
        else if(!this.errors.representant && this.representant.prenom != '' && this.representant.nom != '' && this.representant.gsm != '')
        {
          axios.post('/client/create_new_client',  {client: this.client, representant: this.representant}).then(response => {
            var nom = response.data;
            if(nom.nom_soc == null)
            {
              this.errors.nom_soc_exist = true;
            }
            else
            {
              alert('Le client: '+ nom.nom_soc + ' a ete bien ajouter a votre liste client!');
              this.emptyForm();
              this.emptyFormRepresentant();
            }
          }, () => {
            alert('Error sorry we have any data');
          });
        }
        else
        {
          // this.errors.representant = false;
          this.emptyFormRepresentant();
        }
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
      }
    },
    computed: {

    }
}
</script>

<style >
  .create-client {

  }
  label{
    color:white;
  }
  .bg-gray{
    text-align: center;
    background-color: rgb(90, 88, 88);
    border: 2px solid rgb(126, 117, 247);
    border-radius: 40px ;
  }
  .br{
    border: 2px solid rgb(1, 129, 33);
    border-radius: 40px ;
  }
</style>
