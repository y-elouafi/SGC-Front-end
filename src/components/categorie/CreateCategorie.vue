<template lang="html">

  <section class="create-categorie bg-gray">
    <h1 class="alert alert-success br">Ajouter Une Nouvelle Categorie</h1>
    <Form   v-on:submit.prevent="onSubmit" class="text-center ">
      <div class="container col">
        <div class="form-group row align-self-center">
          <label for="nom" class="align-self-center"><strong>Nouvelle Categorie: </strong></label>
          <!-- <p class="bg-primary">{{name}}</p> -->
          <input type="text" v-model="name"  class="form-control col-md-6 ml-2" id="name"  placeholder="Nom Categorie" require>
          <Button type="" class="form-group btn btn-primary ml-2" v-show="formValid"> Enregistre</Button>
        </div>
        <div v-if="errorSending" class="text-danger">Ce nom de categorie exist deja!</div>
        
      </div>
      
      

    </Form>
  </section>

</template>

<script lang="js">
import axios from 'axios'

  export default  {
    name: 'CreateCategorie',
    props: [],
    data: function(){
      return{
        name:'',
        errorSending: false,
      }
    },
    mounted() {

    },
    methods: {
      onSubmit(){
          axios.get('/categorie/add_new_categorie/'+ this.name).then(response => {
              
                  var someData = response.data;
                  if (someData.nom === undefined || someData.nom === null) {
                      this.errorSending = true;
                  }
                  else
                  {
                    // this.errorSending = false;
                     alert('Votre categorie '+someData.nom+ ' a ete ajouter avec success');
                     this.name = '';
                  }   
            }, response => {
              alert('erreur d\'enregistrement '+ response);
            });
      },

    },
    watch:{

    },
    computed: {
      formValid: function(){
        this.errorSending = false;
        return this.name !='';
      }
    }
}
</script>

<style >
  .create-categorie {
    /* // text-align: center; */
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
