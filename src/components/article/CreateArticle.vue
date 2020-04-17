<template >

  <section class="create-article bg-gray pl-2 pr-2 pt-2 ">
    <h1 class="alert alert-success br">Ajouter Un Nouveau Article</h1>
    <Form @submit.prevent="" class="">
      <div class="form-group row">
        <div class="form-group col-md-4">
          <label for="nom"><span class="text-danger" v-show="errors.nom">* </span><strong>Nom</strong></label>
          <input type="text" class="form-control" id="nom"   v-model="article.nom" @input="setErrorName">
          <div class="text-danger" v-show="errors.nom_exist" nom_exist>Ce nom exist deja!</div>
        </div>
        <div class="form-group col-md-4">
          <label for="prix_achat"><span class="text-danger" v-show="errors.prix_achat">* </span><strong>Prix d'Achat</strong></label>
          <input type="number" step="0.01" class="form-control" id="prix_achat"  v-model="article.prix_achat" @input="parsingValue">
        </div>
        <div class="form-group col-md-4">
            <label for="prix_vent"><span class="text-danger" v-show="errors.prix_vent">* </span><strong>Prix Vente</strong></label>
            <input type="number" step="0.01" class="form-control" id="prix_vent"  v-model="article.prix_vent"  @input="parsingValue">
          </div>
      </div>
      <div class="form-group row">
          <div class="form-group col-md-4">
            <label for="qte_reel"><span class="text-danger" v-show="errors.qte_reel">* </span><strong>Quantite Stocke</strong></label>
            <input type="number" class="form-control" id="qte_reel"  v-model="article.qte_reel" @input="parsingValue">
          </div>
          <div class="form-group col-md-4">
            <label for="qte_min"><span class="text-danger" v-show="errors.qte_min">* </span><strong>Quantite MIN</strong></label>
            <input type="number" class="form-control" id="qte_min" v-model="article.qte_min" @input="parsingValue">
          </div>
          <div class="form-group col-md-4">
            <label for="qte_max"><span class="text-danger" v-show="errors.qte_max">* </span><strong>Quantite MAX</strong></label>
            <input type="number" class="form-control" id="qte_max"  v-model="article.qte_max" @input="parsingValue">
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center  ">
        <div class="form-group col-md-4">
            <label for="fournisseur_id"><span class="text-danger" v-show="errors.fournisseur_id">* </span><strong>Fournisseurs</strong></label>
            <select class="form-control" id="fournisseur_id" v-model="article.fournisseur_id" >
              <option disabled value="0">Choisissez</option>
              <option v-for="fournisseur in fournisseurs" :key="fournisseur.id" :value="fournisseur.id">{{fournisseur.nom_soc| capitalize}}</option>
            </select>
          </div>
        <div class="form-group col-md-4">
            <label for="categorie_id"><span class="text-danger" v-show="errors.categorie_id">* </span><strong>Categories</strong></label>
            <select class="form-control" id="categorie_id" v-model="article.categorie_id" >
              <option disabled value="0">Choisissez</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.nom | capitalize}}</option>
            </select>
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center ">
          <div class="form-group col-md-4">
            <button class="btn btn-primary"  @click="createArticle">Enregistre <i style='font-size:20px;color:white' class="fa fa-address-card"></i></button>
          </div>
      </div>
      <div class="row  justify-content-center ">
          <div class="col-md-4">
            <p class="text-danger" v-show="!showButton" >Remplire la formulaire correctement </p>
          </div>
      </div>
    </Form>
  </section>

</template>

<script >

import axios from 'axios'

  export default  {
    name: 'CreateArticle',
    props: [],
    mounted() {
      this.getCategories();
      this.getFournisseurs();
    },
    data() {
      return {
        article:{
          nom:'',
          prix_achat:'',
          prix_vent:'',
          qte_reel:'',
          qte_min:'',
          qte_max:'',
          categorie_id:0,
          fournisseur_id:0
        },
        errors:{
          nom:true,
          prix_achat:true,
          prix_vent:true,
          qte_reel:true,
          qte_min:true,
          qte_max:true,
          categorie_id:true,
          fournisseur_id:true,
          nom_exist:false
        },
        categories:[],
        fournisseurs:[],
        showButton:true
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
      setErrorName(){
        this.errors.nom_exist = false;
      },
      validateForm(){
        if(this.article.nom != ''){
            this.errors.nom = false;
        }
        else{
             this.errors.nom = true;
        }
        if(this.article.prix_achat != '' && !isNaN(this.article.prix_achat) && parseFloat(this.article.prix_achat) < parseFloat(this.article.prix_vent)){
            this.errors.prix_achat = false;
        }
        else{
             this.errors.prix_achat = true;
        }
        if(this.article.prix_vent != '' && !isNaN(this.article.prix_vent) && parseFloat(this.article.prix_achat) < parseFloat(this.article.prix_vent)){
            this.errors.prix_vent = false;
        }
        else{
             this.errors.prix_vent = true;
        }
        if(this.article.qte_reel != '' && !isNaN(this.article.qte_reel) && this.article.qte_reel > 0){
            this.errors.qte_reel = false;
        }
        else{
             this.errors.qte_reel = true;
        }
        if(this.article.qte_min != '' && !isNaN(this.article.qte_min) && (parseInt(this.article.qte_min) <= parseInt(this.article.qte_max))){
            this.errors.qte_min = false;
        }
        else{
             this.errors.qte_min = true;
        }
        if(this.article.qte_max != '' && !isNaN(this.article.qte_max) && (parseInt(this.article.qte_min) <= parseInt(this.article.qte_max))){
            this.errors.qte_max = false;
        }
        else{
             this.errors.qte_max = true;
        }
        if((this.article.categorie_id != '' || this.article.categorie_id != 0) && !isNaN(this.article.categorie_id)){
            this.errors.categorie_id = false;
        }
        else{
             this.errors.categorie_id = true;
        }
        if((this.article.fournisseur_id != '' || this.article.fournisseur_id != 0) && !isNaN(this.article.fournisseur_id)){
            this.errors.fournisseur_id = false;
        }
        else{
             this.errors.fournisseur_id = true;
        }
        if(!this.errors.nom && !this.errors.prix_achat && !this.errors.prix_vent && !this.errors.qte_reel &&
           !this.errors.qte_min && !this.errors.qte_max && !this.errors.categorie_id && !this.errors.fournisseur_id)
           {
              this.showButton = true;
              return true;
           }    
          else{
            this.showButton = false;
            return false;
          }
      },
      parsingValue()
      {
        this.article.prix_achat = parseFloat(this.article.prix_achat);
        this.article.prix_vent = parseFloat(this.article.prix_vent);
        this.article.qte_reel = parseInt(this.article.qte_reel);
        this.article.qte_min = parseInt(this.article.qte_min);
        this.article.qte_max = parseInt(this.article.qte_max);
      },
      emptyForm(){
        this.article.nom = '';
        this.article.prix_achat = '';
        this.article.prix_vent = '';
        this.article.qte_reel = '';
        this.article.qte_min = '';
        this.article.qte_max = '';
      },
      getCategories(){
        axios.get('/categorie/categories').then(response => {
              this.categories = response.data;
            }, () => {
              alert('Error sorry we have any data');
            });
      },
      getFournisseurs(){
        axios.get('/fournisseur/all_fournisseurs_active').then(response => {
              this.fournisseurs = response.data;
            }, () => {
              alert('Error sorry we have any data');
            });
      },
      createArticle(){
        if(this.validateForm())
        {
          axios.post('/article/create_new_article', {article: this.article}).then(response => {
              var nom = response.data;
              // console.log(nom);
              if(nom.nom == null)
              {
                this.errors.nom_exist = true;
              }
              else
              {
                alert('L\'article: '+ nom.nom + ' a ete bien ajouter a votre liste articles!');
                this.emptyForm();
              }
            }, () => {
              alert('Error sorry we have any data');
            });
        }
      }
    },
    computed: {

    }
}
</script>

<style >
  .create-article {

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
