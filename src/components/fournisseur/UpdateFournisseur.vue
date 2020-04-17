<template lang="html">

  <section class="update-fournisseur text-warning">
    <h4 class="alert alert-success ">Update Fournisseur <em class="text-primary">{{fournisseur.nom_soc|upper}}</em></h4>


   <Form @submit.prevent="" class="">
      <div class="form-group row">
        <div class="form-group col-md-4">
          <label for="nom_soc"><span class="text-danger" v-show="errors.nom_soc">* </span><strong>Nom Fournisseur</strong></label>
          <input type="text" class="form-control" id="nom_soc"  v-model="fournisseur.nom_soc"  @input="errors.nom_soc_exist=false">
          <div v-show="errors.nom_soc_exist" class="text-danger">Ce nom exist deja!</div>
          <div v-show="errors.nom_soc" class="text-danger">Champs ne peut etre vide</div>
        </div>
        <div class="form-group col-md-4">
          <label for="email"><span class="text-danger" v-show="errors.email">* </span><strong>Email Address</strong></label>
          <input type="email" class="form-control" id="email" v-model="fournisseur.email" >
          <div v-show="errors.email" class="text-danger">Entre une format valide</div>
        </div>
        <div class="form-group col-md-4">
            <label for="localisation_id"><span class="text-danger" v-show="errors.localisation_id">* </span><strong>Villes</strong></label>
            <select class="form-control" id="localisation_id" v-model="fournisseur.localisation_id" >
              <!-- <option disabled value="0" >Choisissez</option> -->
              <option v-for="ville in villes" :key="ville.id" v-bind:value="ville.id" :selected="ville.id == fournisseur.localisation_id">{{ville.nom_ville}}</option>
            </select>
            <div v-show="errors.localisation_id" class="text-danger">Vous devez choisir une ville</div>
        </div>
      </div>
      <div class="form-group row">
          <div class="form-group col-md-4">
            <label for="gsm"><span class="text-danger" v-show="errors.gsm">* </span><strong>Telephone</strong></label>
            <input type="tel" class="form-control" id="gsm" v-model="fournisseur.gsm" >
            <div v-show="errors.gsm" class="text-danger">Numero avec format obligatoir</div>
          </div>
          <div class="form-group col-md-4">
              <label for="fax"><strong>Fax</strong></label>
              <input type="tel" class="form-control" id="fax" v-model="fournisseur.fax">
          </div>
          <div class="form-group col-md-4">
            <label for="site_web"><strong>Site Web</strong></label>
            <input type="text" class="form-control" id="site_web" v-model="fournisseur.site_web">
          </div>
      </div>
      <div class="form-group row">
        <div class="form-group col-md-4">
            <label for="num_patente"><span class="text-danger" v-show="errors.num_patente">* </span><strong>ICE</strong></label>
            <input type="text" class="form-control" id="num_patente" v-model="fournisseur.num_patente" >
            <div v-show="errors.num_patente" class="text-danger">Champs ne peut etre vide</div>
          </div>
          <div class="form-group col-md-4">
            <label for="plafond"><span class="text-danger" v-show="errors.plafond">* </span><strong>Plafond (DH)</strong></label>
            <input type="text" class="form-control" id="plafond" v-model="fournisseur.plafond" >
            <div v-show="errors.plafond" class="text-danger">Champs ne peut etre vide</div>
          </div>
          <div class="form-group col-md-4">
            <label for="credit"><strong>Credit (DH)</strong></label>
            <input type="text" class="form-control" id="credit" v-model="fournisseur.credit" >
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center  ">
          <div class="form-group col-md-4">
            <label for="typesociete_id"><span class="text-danger" v-show="errors.typesociete_id">* </span><strong>Type Societe</strong></label>
            <select class="form-control" id="typesociete_id" v-model="fournisseur.typesociete_id" >
              <!-- <option disabled value="0" >Choisissez</option> -->
              <option v-for="type in types" :key="type.id" v-bind:value="type.id" :selected="type.id == fournisseur.typesociete_id">{{type.valeur}}</option>
            </select>
            <div v-show="errors.typesociete_id" class="text-danger">Vous devez choisir une type</div>
        </div>
      </div>
      <div class="form-group row h-100 justify-content-center  ">
          <div class="form-group col-md-4">
            <label for="adresse"><span class="text-danger" v-show="errors.adresse">* </span><strong>Adresse</strong></label>
            <textarea class="form-control" v-model="fournisseur.adresse" id="adresse"></textarea>
            <div v-show="errors.adresse" class="text-danger">Champs ne peut etre vide</div>
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center ">
          <div class="form-group col-md-4">
            <button class="btn btn-success" v-show="dataTouched" @click="updateFournisseur">Modifier <i class="fa fa-check"></i></button>
          </div>
          <div class="form-group col-md-4">
            <button class="btn btn-danger" v-show="dataTouched" @click="cancelUpdateFournisseur">Annuler <i class="fa fa-times"></i></button>
          </div>
      </div>
      

    </Form>
  </section>

</template>

<script lang="js">
    import axios from 'axios'
    import store from './Store.js'

  export default  {
    
    name: 'UpdateFournisseur',
    props: [],
    store: store,
    created(){
      // this.initialFournisseur();
    },
    mounted() {
      // setTimeout(() => {
        // this.findFournisseur();
        // this.getVilles();
        // this.getTypesSoc();
        this.initialFournisseur();
        // this.$nextTick(() => {
        // });
      // }, 1500);
      
    },
    updated(){
      this.updateTouchedFunction();
    },
    data() {
      return {
        dataTouched: false,
        fournisseurRemember:{},
        fournisseur:{},
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
      initialFournisseur()
      {
          // this.$store.dispatch('initialVilles');
          // this.$store.dispatch('initialTypesSoc');
          // this.$store.dispatch('findFournisseur', {id: this.$route.params.id}); // id de fournisseur
          // setTimeout(() => {
          //   this.fournisseur = Object.assign({}, this.$store.getters.getFournisseur);
          //   this.fournisseurRemember = Object.assign({}, this.$store.getters.getFournisseur);
          //   this.villes = this.$store.getters.getVilles.slice(0);
          //   this.types = this.$store.getters.getTypesSoc.slice(0);
          //   this.dataTouched = false;
          // }, 4500);
          this.findFournisseur();
          this.getVilles();
          this.getTypesSoc();
          this.dataTouched = false;
      },
      updateTouchedFunction(){
          if(JSON.stringify(this.fournisseur) != JSON.stringify(this.fournisseurRemember))
            this.dataTouched = true;
          else
            this.dataTouched = false;
      },
      cancelUpdateFournisseur(){
        this.fournisseur = Object.assign({}, this.fournisseurRemember);
      },
      validateForm()
      {
          if(this.fournisseur.nom_soc != '')
          {
            this.errors.nom_soc = false;
          }
          else
            this.errors.nom_soc = true;

          if(this.fournisseur.email != '')
            this.errors.email = false;
          else
            this.errors.email = true;

          if(this.fournisseur.gsm != '' && !isNaN(this.fournisseur.gsm))
          {
            this.errors.gsm = false;
          }
          else
          {
            this.errors.gsm = true;
          }
          if((this.fournisseur.localisation_id != '' || this.fournisseur.localisation_id != 0) && !isNaN(this.fournisseur.localisation_id))
          {
            this.errors.localisation_id = false;
          } 
          else
          {
            this.errors.localisation_id = true; 
          }
          if((this.fournisseur.typesociete_id != '' || this.fournisseur.typesociete_id != 0) && !isNaN(this.fournisseur.typesociete_id))
          {
            this.errors.typesociete_id = false;
          } 
          else
          {
            this.errors.typesociete_id = true; 
          }
          if(this.fournisseur.num_patente != '')
            this.errors.num_patente = false;
          else
            this.errors.num_patente = true;  

          if(this.fournisseur.plafond >= 0)
            this.errors.plafond = false;
          else
          {
            this.errors.plafond = true;
          }
          if(this.fournisseur.adresse != '')
            this.errors.adresse = false;
          else
            this.errors.adresse = true; 
              
          if(!this.errors.nom_soc && !this.errors.email && !this.errors.gsm && !this.errors.localisation_id &&
           !this.errors.num_patente && !this.errors.plafond && !this.errors.adresse)    
            return true;
          else
            return false;    
      },
      findFournisseur(){
            axios.get('fournisseur/find_fournisseur/'+this.$route.params.id).then(response => {
                    this.fournisseurRemember = Object.assign({}, response.data.fournisseur);
                    this.fournisseur = response.data.fournisseur;
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
      updateFournisseur()
      {
        if(this.validateForm()){
          axios.put('/fournisseur/update_fournisseur',  {fournisseur: this.fournisseur}).then(response => {
            var nomExist = response.data;
            if(nomExist == 1)
            {
              this.errors.nom_soc_exist = true;
            }
            else
            {
              this.fournisseur = response.data.fournisseur;
              this.fournisseurRemember = Object.assign({}, response.data.fournisseur);
              this.dataTouched = false;
              alert('Le fournisseur: '+ this.fournisseur.nom_soc + ' a ete bien modifier!');
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

<style >
  .update-fournisseur {

  }
  label{
    color:darkgoldenrod;
  }
</style>
