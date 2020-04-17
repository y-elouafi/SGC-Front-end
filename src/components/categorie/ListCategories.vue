<template lang="html">

  <section class="list-categories ">
    <h2 class="alert alert-success">La List Des Categories</h2>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="form-inline text-center" >
        <input class="form-control mr-sm-4" type="text" v-model="nameCatSearch" placeholder="Search categorie">
        <button class="btn btn-success mr-sm-4 col align-self-center " @click="getCategoriesActive"><strong>Tous les categories active</strong></button>
        <button class="btn btn-danger mr-sm-4 col align-self-end " @click="getCategoriesDesactive"><strong>Tous les categories desactive</strong></button>
        <button class="btn btn-primary mr-sm-4 col align-self-start text-center" style="height: 62px;" @click="getCategories"><strong>Tous les categories</strong></button>
      </div>
    </nav>
    <table class="table table-striped">
    <thead class="thead-light ">
      <tr>
        <th>Code</th>
        <th>Nom</th>
        <th>Etat</th>
        <th>Date Creation</th>
        <th>Date Modification</th>
        <th>Modifier</th>
        <th>Supprimer</th>
      </tr>
    </thead>
    <tbody>
      <tr class="text-dark bg-light" v-for="(categorie,index) in categories.data">
        <td :class="categorie.is_active? 'bg-info': 'bg-warning'">{{categorie.id}}</td>
        <td :class="categorie.is_active? '': 'text-danger'"><input v-model="categorie.nom" class="form-control" :hidden="index !== indexRow">{{index !== indexRow?categorie.nom:''}}</td>
        <!-- <td >{{categorie.is_active?'Active':'Desactive'}}</td> -->
        <td :class="categorie.is_active?'text-success':'text-danger'">
          <p v-if="index !== indexRow">
            {{categorie.is_active?'Active':'Desactive'}}
          </p>
          <button :class="categorie.is_active?'btn btn-danger':'btn btn-success'" :hidden="index !== indexRow && categorie.is_active"  @click="changeStatusCategorieById(categorie.id)">
            {{categorie.is_active?'Desactive':'Active'}}
          </button>
        </td>
        <!-- v-if="categorie.is_active" -->
        <td>{{categorie.created_at}}</td>
        <td>{{categorie.updated_at}}</td>
        <td><button type="button" class="btn btn-primary" @click="hideInputUpdate(index, categorie.id)" :hidden="index !== indexRow"><i class="fa fa-check"></i></button><button type="button" class="btn btn-success" @click="showInputUpdate(index)" :hidden="index === indexRow"><i class="fa fa-edit"></i></button></td>
        <td><button type="button" class="btn btn-danger" @click="deleteCategorieById(categorie)"><i class="fa fa-trash"></i></button></td>
      </tr>
    </tbody>
  </table>
  <div class="element-center">
    <pagination :data="categories" @pagination-change-page="getCategories" v-if="etatSearchCat == 3 && !isSearch">
        <span slot="prev-nav">&lt; Precedent</span>
        <span slot="next-nav">Suivant &gt;</span>
    </pagination>
    <pagination :data="categories" @pagination-change-page="getCategoriesActive" v-if="etatSearchCat == 1 && !isSearch">
        <span slot="prev-nav">&lt; Precedent</span>
        <span slot="next-nav">Suivant &gt;</span>
    </pagination>
    <pagination :data="categories" @pagination-change-page="getCategoriesDesactive" v-if="etatSearchCat == 0 && !isSearch">
        <span slot="prev-nav">&lt; Precedent</span>
        <span slot="next-nav">Suivant &gt;</span>
    </pagination>
    <pagination :data="categories" @pagination-change-page="getCategoriesBySearchNamePagination" v-if="isSearch">
        <span slot="prev-nav">&lt; Precedent</span>
        <span slot="next-nav">Suivant &gt;</span>
    </pagination>
  </div>

  </section>

</template>

<script lang="js">
// import categorieStore from './CategorieStore.js'
// import Vuex from 'vuex'
import axios from 'axios'

  export default  {
    name: 'ListCategories',
    props: [],
    // store: categorieStore,
    
    data() {
      return {
          categories: {},
          nameCatSearch: '',
          nameCat: '',
          indexRow: null, // show input update if clicked
          etatSearchCat: 3,
          isSearch: false,
          pagination: {},
      }
    },

    mounted() {
      this.getCategoriesActive();
    },
    methods: {
      showInputUpdate(val){
        this.indexRow = val; // val = index
      },
      hideInputUpdate(index, id){
        this.updateCategorieById(index, id);
        this.indexRow = null;
        this.nameCat = '';
            if(this.etatSearchCat == 1)
              this.getCategoriesActive();
            else if(this.etatSearchCat == 0)
              this.getCategoriesDesactive();
            else
              this.getCategories();
      },
      getCategories(page = 1){
        this.isSearch = false;
        this.etatSearchCat = 3;
        axios.get('/categorie/categories_all?page=' + page).then(response => {
          // fetch().then(r=>{}, r=>{}); 
            this.categories = response.data;
            // console.log(response.data);
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getCategoriesActive(page = 1){
        this.isSearch = false;
        this.etatSearchCat = 1;
        axios.get('/categorie/categories_all_active?page=' + page).then(response => {
            this.categories = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getCategoriesDesactive(page = 1){
        this.isSearch = false;
        this.etatSearchCat = 0;
        axios.get('/categorie/categories_all_desactive?page=' + page).then(response => {
            this.categories = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getCategoriesBySearchName(val){
        // this.etatSearchCat = 2;
        this.isSearch = true;
        axios.get('/categorie/search_categories_like_name/',{params: {name: val, etat:this.etatSearchCat}}).then(response => {
            this.categories = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getCategoriesBySearchNamePagination(page = 1){
        this.isSearch = true;
        // this.etatSearchCat = 2;
        axios.get('/categorie/search_categories_like_name?page=' + page, {params: {name: this.nameCatSearch , etat:this.etatSearchCat}}).then(response => {
            this.categories = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      updateCategorieById(index, val){
        axios.put('/categorie/update_name_categorie_by_id',  {id: val, name: this.categories.data[index].nom}).then(response => {
            if(response.data.count > 0)
            {
              alert('Ce nom Exist deja!')
            }
            else{
                this.nameCat = '';
                if(this.etatSearchCat == 1)
                  this.getCategoriesActive();
                else if(this.etatSearchCat == 0)
                  this.getCategoriesDesactive();
                else
                  this.getCategories();
            }
            
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      changeStatusCategorieById(val){
        axios.put('/categorie/update_status_categorie_by_id',  {id: val}).then(response => {
            this.indexRow = null;
            this.nameCat = '';
            if(this.etatSearchCat == 1)
              this.getCategoriesActive();
            else if(this.etatSearchCat == 0)
              this.getCategoriesDesactive();
            else
              this.getCategories();
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      deleteCategorieById(val)
      {
        if(confirm("Vous voulez vraiment supprime la categorie: "+val.nom+"?"))
        {
          axios.delete('/categorie/delete_categorie_by_id',  {data: {id: val.id}}).then(response => {
            this.nameCat = '';
            if(this.etatSearchCat == 1)
              this.getCategoriesActive();
            else if(this.etatSearchCat == 0)
              this.getCategoriesDesactive();
            else
              this.getCategories();
          }, () => {
            alert('Error sorry we have any data');
          });
        } 
      }

    },
    watch:{
        nameCatSearch: function (val) {
          if(val)
            this.getCategoriesBySearchName(val);

          else
            if(this.etatSearchCat == 1)
              this.getCategoriesActive();
            else if(this.etatSearchCat == 0)
              this.getCategoriesDesactive();
            else
              this.getCategories();
        },
    },
    computed: {

    }
}
</script>

<style >
  .list-categories {

  }
  .element-center{
    width: 100%;
    margin: auto;
    margin-left: 40%;

  }
</style>
