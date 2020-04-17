<template lang="html">

  <section class="update-article">
   <h4 class="alert alert-success">Modifie l'article  <strong class="text-primary">{{articleData.nom | capitalize}}</strong></h4>
   <Form @submit.prevent="" class="col" @input="haveChange">
      <div class="form-group row">
        <div class="form-group col-md-4">
          <label for="nom"><span class="text-danger" v-show="errors.nom">* </span><strong>Nom</strong></label>
          <input type="text" class="form-control" id="nom"   v-model="articleData.nom" @input="setErrorName">
          <div class="text-danger" v-show="errors.nom_exist" nom_exist>Ce nom exist deja!</div>
        </div>
        <div class="form-group col-md-4">
          <label for="prix_achat"><span class="text-danger" v-show="errors.prix_achat">* </span><strong>Prix d'Achat</strong></label>
          <input type="number" step="0.01" class="form-control" id="prix_achat"  v-model="articleData.prix_achat" @input="parsingValue">
        </div>
        <div class="form-group col-md-4">
            <label for="prix_vent"><span class="text-danger" v-show="errors.prix_vent">* </span><strong>Prix Vente</strong></label>
            <input type="number" step="0.01" class="form-control" id="prix_vent"  v-model="articleData.prix_vent"  @input="parsingValue">
          </div>
      </div>
      <div class="form-group row">
          <div class="form-group col-md-4">
            <label for="qte_reel"><span class="text-danger" v-show="errors.qte_reel">* </span><strong>Quantite Stocke</strong></label>
            <input type="number" class="form-control" id="qte_reel"  v-model="articleData.qte_reel" @input="parsingValue">
          </div>
          <div class="form-group col-md-4">
            <label for="qte_min"><span class="text-danger" v-show="errors.qte_min">* </span><strong>Quantite MIN</strong></label>
            <input type="number" class="form-control" id="qte_min" v-model="articleData.qte_min" @input="parsingValue">
          </div>
          <div class="form-group col-md-4">
            <label for="qte_max"><span class="text-danger" v-show="errors.qte_max">* </span><strong>Quantite MAX</strong></label>
            <input type="number" class="form-control" id="qte_max"  v-model="articleData.qte_max" @input="parsingValue">
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center  ">
        <div class="form-group col-md-4">
            <label for="fournisseur_id"><span class="text-danger" v-show="errors.fournisseur_id">* </span><strong>Fournisseurs</strong></label>
            <select class="form-control" id="fournisseur_id" v-model="articleData.fournisseur_id" >
              <option v-for="fournisseur in fournisseurs" :key="fournisseur.id" :value="fournisseur.id">{{fournisseur.nom_soc| capitalize}}</option>
            </select>
          </div>
        <div class="form-group col-md-4">
            <label for="categorie_id"><span class="text-danger" v-show="errors.categorie_id">* </span><strong>Categories</strong></label>
            <select class="form-control" id="categorie_id" v-model="articleData.categorie_id" >
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.nom | capitalize}}</option>
            </select>
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center ">
          <div class="form-group col-md-4">
            <button class="btn btn-success" v-show="showButton" @click="updateArticle">Modifier <i style='font-size:20px;color:white' class="fa fa-check"></i></button>
          </div>
          <slot></slot>
      </div>
      <div class="row  justify-content-center ">
          <div class="col-md-4">
            <p class="text-danger" v-show="!valide" >Remplire la formulaire correctement </p>
          </div>
      </div>
   </Form>
  </section>

</template>

<script lang="js">

import axios from 'axios'

  export default  {
    name: 'UpdateArticle',
    props: {
      article: Object,
      fournisseurs: Array,
      categories: Array
    },
    mounted() {
      this.initiatArticleData();
    },
    data() {
      return {
        articleData:{},
        articleRemember:{},
        showButton:false,
        valide:true,
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
      initiatArticleData(){
        setTimeout(() => {
          this.articleData = Object.assign({}, this.article);
          this.articleRemember = Object.assign({}, this.article);
        }, 500);
      },
      cancelUpdate(){
        setTimeout(() => {
          this.articleData = Object.assign({}, this.articleRemember);
        }, 500);
        
      },
      haveChange(){
        if(JSON.stringify(this.articleData) != JSON.stringify(this.articleRemember))
        {
          this.showButton = true;
        }
        else
        {
          this.showButton = false;
        }
        this.valide = true;
      },
      setErrorName(){
        this.errors.nom_exist = false;
      },
      parsingValue()
      {
        this.articleData.prix_achat = parseFloat(this.articleData.prix_achat);
        this.articleData.prix_vent = parseFloat(this.articleData.prix_vent);
        this.articleData.qte_reel = parseInt(this.articleData.qte_reel);
        this.articleData.qte_min = parseInt(this.articleData.qte_min);
        this.articleData.qte_max = parseInt(this.articleData.qte_max);
      },
      validateForm(){
        if(this.articleData.nom != ''){
            this.errors.nom = false;
        }
        else{
             this.errors.nom = true;
        }
        if(this.articleData.prix_achat != '' && !isNaN(this.articleData.prix_achat) && parseFloat(this.articleData.prix_achat) < parseFloat(this.articleData.prix_vent)){
            this.errors.prix_achat = false;
        }
        else{
             this.errors.prix_achat = true;
        }
        if(this.articleData.prix_vent != '' && !isNaN(this.articleData.prix_vent) && parseFloat(this.articleData.prix_achat) < parseFloat(this.articleData.prix_vent)){
            this.errors.prix_vent = false;
        }
        else{
             this.errors.prix_vent = true;
        }
        if(this.articleData.qte_reel != '' && !isNaN(this.articleData.qte_reel) && this.articleData.qte_reel > 0){
            this.errors.qte_reel = false;
        }
        else{
             this.errors.qte_reel = true;
        }
        if(this.articleData.qte_min != '' && !isNaN(this.articleData.qte_min) && (parseInt(this.articleData.qte_min) <= parseInt(this.articleData.qte_max))){
            this.errors.qte_min = false;
        }
        else{
             this.errors.qte_min = true;
        }
        if(this.articleData.qte_max != '' && !isNaN(this.articleData.qte_max) && (parseInt(this.articleData.qte_min) <= parseInt(this.articleData.qte_max))){
            this.errors.qte_max = false;
        }
        else{
             this.errors.qte_max = true;
        }
        if((this.articleData.categorie_id != '' || this.articleData.categorie_id != 0) && !isNaN(this.articleData.categorie_id)){
            this.errors.categorie_id = false;
        }
        else{
             this.errors.categorie_id = true;
        }
        if((this.articleData.fournisseur_id != '' || this.articleData.fournisseur_id != 0) && !isNaN(this.articleData.fournisseur_id)){
            this.errors.fournisseur_id = false;
        }
        else{
             this.errors.fournisseur_id = true;
        }
        if(!this.errors.nom && !this.errors.prix_achat && !this.errors.prix_vent && !this.errors.qte_reel &&
           !this.errors.qte_min && !this.errors.qte_max && !this.errors.categorie_id && !this.errors.fournisseur_id)
           {
              return true;
           }    
          else{
            this.valide = false;
            return false;
          }
      },
      updateArticle(){
        if(this.validateForm())
        {
          axios.put('/article/update_article', {article: this.articleData}).then(response => {
              var article = response.data;
              if(article.nom == null)
              {
                this.errors.nom_exist = true;
              }
              else if(article == 1)
              {
                alert('Article introuvable!');
              }
              else
              {
                alert('L\'article: '+ article.nom + ' a ete modifier avec success!');
                this.$emit('articleUpdated', true);
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

<style>
  .update-article {

  }
  label{
    color:orange;
  }
</style>
