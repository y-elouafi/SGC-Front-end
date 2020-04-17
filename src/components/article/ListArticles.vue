<template lang="html">

  <section class="list-articles">
    <h2 class="alert alert-success">La List Des Articles</h2>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
      <div class="form-inline  " >
        <!-- <input class="form-control mr-sm-4" type="text"  placeholder="Search client"> -->
        <button class="ml-1 btn btn-success mr-sm-4 col align-self-center " style="height: 62px;" @click="getArticlesActive"><strong>Tous les articles active</strong></button>
        <button class="ml-1 btn btn-danger mr-sm-4 col align-self-end " style="height: 62px;" @click="getArticlesDesactive"><strong>Tous les articles desactive</strong></button>
        <button class="ml-1 btn btn-primary mr-sm-4 col align-self-start text-center" style="height: 62px;" @click="getArticles"><strong>Tous les articles stocke</strong></button>
      </div>
    </nav>
    <div>
      <br/>
      <hr/>
      <UpdateArticle :article="article"  :fournisseurs="fournisseurs" :categories="categories" v-if="updateArticle" @articleUpdated="actualizeDataArticles">
        <div class="form-group col-md-4">
          <button class="btn btn-danger text-light"  @click="hideFormUpdateArticle">Annuler <i class="fa fa-reply"></i></button>
          </div>
      </UpdateArticle>
      <br/>
      <hr/>
      <v-client-table :data="articles" :columns="columns" :options="options">
        <button type="button" slot="is_active" slot-scope="props" :class="props.row.is_active? 'text-center btn btn-success' : 'text-center btn btn-danger'" @click="updateEtatArticle(props.row)">
          <em>{{ props.row.is_active? 'Active' : 'Desactive'}}</em>
        </button>
        <p slot="categorie_id" slot-scope="props" class="text-center">
          <em>{{ props.row.categorie_id | nomCategorie(categories)|capitalize}}</em>
        </p>
        <p slot="qte_reel" slot-scope="props" :class="(props.row.qte_reel < props.row.qte_min)? 'text-danger':(props.row.qte_reel > props.row.qte_max?'text-success':'')">
          <strong v-if="props.row.qte_reel < props.row.qte_min || props.row.qte_reel > props.row.qte_max">{{props.row.qte_reel}}</strong>
          <span v-if="(props.row.qte_reel >= props.row.qte_min && props.row.qte_reel <= props.row.qte_max)">{{props.row.qte_reel}}</span>
        </p>
        <p slot="qte_min" slot-scope="props" :class="(props.row.qte_reel < props.row.qte_min )? 'text-info':''">
          <strong  v-if="props.row.qte_reel < props.row.qte_min">{{props.row.qte_min}}</strong>
          <span v-if="props.row.qte_reel >= props.row.qte_min">{{props.row.qte_min}}</span>
        </p>
        <p slot="qte_max" slot-scope="props" :class="(props.row.qte_reel > props.row.qte_max)? 'text-info':''">
          <strong v-if="props.row.qte_reel > props.row.qte_max">{{props.row.qte_max}}</strong>
          <span v-if="props.row.qte_reel <= props.row.qte_max">{{props.row.qte_max}}</span>
        </p>
        <router-link :to="{ name: 'detail_fournisseur', params: { id: props.row.fournisseur_id }}" slot="fournisseur_id" slot-scope="props" class="text-center">
          <strong><em>{{ props.row.fournisseur_id | nomFournisseur(fournisseurs)|upper}}</em></strong>
        </router-link>
        <button type="button" slot="modifier" slot-scope="props" class="btn btn-success text-center text-light" @click="showFormUpdateArticle(props.row)">
          <i class="fa fa-edit"></i>
        </button>
        <button type="button" slot="supprime" slot-scope="props" class="btn btn-danger text-center text-light" @click="deleteArticle(props.row)">
          <i class="fa fa-trash"></i>
        </button>
       
      </v-client-table>
    </div>
  </section>

</template>

<script lang="js">

import axios from 'axios'
import UpdateArticle from './UpdateArticle.vue'

  export default  {
    name: 'ListArticles',
    props: [],
    components: {
      UpdateArticle
    },
    mounted() {
      this.getArticlesActive();
      this.getCategories();
      this.getFournisseurs();
    },
    data() {
      return {
        articles: [],
        categories: [],
        fournisseurs: [],
        cat:[],
        nameFornisseur:[],
        columns: ['id', 'nom', 'is_active', 'categorie_id', 'qte_reel', 'qte_min', 'qte_max', 'prix_achat', 'prix_vent', 'fournisseur_id', 'modifier', 'supprime'],
        options: {
          headings: {
            id: 'Code',
            nom: 'Reference',
            is_active: 'Etat',
            categorie_id: 'Categorie',
            qte_reel: 'Stocke',
            qte_min: 'Min',
            qte_max: 'Max',
            prix_achat: 'Prix Achat/DH',
            prix_vent: 'Prix Vent/DH',
            fournisseur_id: 'Fournisseur',
            modifie: 'Modifier',
            supprime: 'Supprime'
          },
          sortable: ['id', 'nom', 'qte_reel', 'prix_achat', 'prix_vent',],
          filterable: ['id', 'nom',]
        },
        article:{},
        updateArticle:false
      }
    },
    filters: {
      nomCategorie: function (value, categories) {
        for(var c of categories)
        {
          if(c.id == value)
          {
            return c.nom;
          }
        }
      },
      nomFournisseur: function (value, fournisseurs) {
        for(var f of fournisseurs)
        {
          if(f.id == value)
          {
            return f.nom_soc;
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
      showFormUpdateArticle(val){
        this.article = val;
        this.updateArticle = true;
      },
      hideFormUpdateArticle(){
        this.updateArticle = false;
      },
      actualizeDataArticles()
      {
         this.updateArticle = false;
         this.getArticlesActive();
      },
      getCategories(){
        axios.get('/categorie/categories').then(response => {
            this.categories = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getFournisseurs(){
        axios.get('/fournisseur/all_fournisseurs').then(response => {
            this.fournisseurs = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getArticles(){
        axios.get('/article/all_articles').then(response => {
            this.articles = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getArticlesActive(){
        axios.get('/article/all_articles_active').then(response => {
            this.articles = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getArticlesDesactive(){
        axios.get('/article/all_articles_desactive').then(response => {
            this.articles = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      updateEtatArticle(val){
        var etat = val.is_active?"Desactive ": "Active ";
        if(confirm("Vous voulez vraiment "+ etat +"cette article: "+val.nom+"?"))
        {
          axios.put('/article/change_etat_article', {id: val.id}).then(response => {
              var i = response.data;
              if(i.is_active)
              {
                this.getArticlesActive();
                alert('l\'article '+ i.nom + ' est active');
              }
              else if(!i.is_active)
              {
                this.getArticlesActive();
                alert('l\'article '+ i.nom + ' est desactive');
              }
              else
              alert('Article n\'est pas trouve');
            }, () => {
              alert('Error sorry we have any data');
            });
        }
      },
      deleteArticle(val){
        if(confirm("Vous voulez vraiment supprime l\'article: "+val.nom+"?"))
        {
          axios.delete('/article/delete_article', {data: {id: val.id}}).then(response => {
              var i = response.data;
              if(i == 1)
              {
                this.getArticles();
                alert('l\'article a ete supprimer avec success');
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
  .list-articles {

  }
</style>
