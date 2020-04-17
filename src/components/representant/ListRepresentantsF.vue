<template lang="html">

  <section class="representants">
    <h3 class="alert alert-success">List Des Representants</h3>
    <div>
      <div class="col">
        <div class="row justify-content-end mr-3 ">
          <button class="btn btn-primary text-light" v-if="!showAdd" @click="showAddForm">Nouveau <i class="fa fa-plus"></i></button>
        </div>
        <div class="row justify-content-end mr-3 " v-if="showAdd">
          <div class="col">
            <CreateRepresentant :fournisseur_id="id" @update-representants="getAllRepresentants">
              <div class="form-group col-md-4">
                <button class="btn btn-danger text-light"  @click="showAddForm">Annuler <i class="fa fa-reply"></i></button>
              </div>
            </CreateRepresentant>
            
          </div>
        </div>
      </div>
      <hr>
      <div>
        <UpdateRepresentant :representant="representant" v-if="updateRepresentant" @update-representant="updateList">
          <div class="form-group col-md-4">
            <button class="btn btn-danger text-light"  @click="hideUpdateForm">Annuler <i class="fa fa-reply"></i></button>
          </div>
        </UpdateRepresentant>
        <v-client-table :data="representantsData" :columns="columns" :options="options">
          <button type="button" slot="modifier"   class="btn btn-success text-center text-light" slot-scope="props"  @click="showUpdateForm(props.row)"><i class="fa fa-edit"></i></button>
          <button type="button" slot="supprime"   class="btn btn-danger text-center text-light" slot-scope="props" @click="deleteRepresentantById(props.row)"><i class="fa fa-trash"></i></button>
        </v-client-table>
      </div>
    </div>
  </section>

</template>

<script lang="js">

import axios from 'axios'
import CreateRepresentant from './CreateRepresentantF.vue'
import UpdateRepresentant from './UpdateRepresentantF.vue'


  export default  {
    name: 'ListRepresentants',
    props: {
      id: Number, // id provider
      representants: Array
    },
    components: {
      CreateRepresentant,
      UpdateRepresentant
    },
    mounted() {
      setTimeout(() => {
         this.initialRepresentants();
      }, 1500);
    },
    updated(){
      if(JSON.stringify(this.representantsData) == JSON.stringify({}))
      {
        setTimeout(() => {
          this.initialRepresentants();
        }, 1500);
      }
    },
    data() {
      return {
        representantsData: [],
          columns: ['id', 'prenom', 'nom', 'gsm', 'email', 'modifier', 'supprime'],
          options: {
            headings: {
              id: 'Code',
              prenom: 'Prenom',
              nom: 'Nom',
              gsm: 'Telephone',
              email: 'Email',
              modifier: 'Modifier',
              supprime: 'Supprime'
            },
          sortable: ['id', 'prenom', 'nom'],
          filterable: ['id', 'prenom', 'nom']
        },
        representant:{},
        showAdd: false,
        updateRepresentant: false
      }
    },
    methods: {
      initialRepresentants(){
        // this.representantsData = await (this.representants.slice(0));
        this.representantsData = this.representants;
      },
      initiatRepresentantToUpdate(val){
        this.representant = val;
      },
      showAddForm(){
        this.showAdd = !this.showAdd;
      },
      showUpdateForm(val){
        this.representant =  val;
        this.updateRepresentant = true;
      },
      hideUpdateForm(){
          this.updateRepresentant = false;
      },
      updateList(){
        this.getAllRepresentants();
        this.updateRepresentant = false;
      },
      getAllRepresentants(){
          axios.get('fournisseur/all_representants/'+this.id).then(response => {
            this.representantsData = response.data;
            this.$emit('representants-changed', this.representantsData);
            this.showAdd = false;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      deleteRepresentantById(val)
      {
        if(confirm("Vous voulez vraiment supprime ce representant: "+val.prenom+ ' ' + val.nom+"?"))
        {
          axios.delete('/fournisseur/delete_representant',  {data: {id: val.id}}).then(response => {
            this.getAllRepresentants();
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
  .representants {

  }
  .pos{
    position: relative;
    top: 45px;
  }
</style>
