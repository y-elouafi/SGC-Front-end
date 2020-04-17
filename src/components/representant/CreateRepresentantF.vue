<template lang="html">

  <section class="create-representant">
    <Form @submit.prevent="" class="col">
      <div class="form-group row text-dark">
        <div class="form-group col-md-3">
            <label for="prenom_r"><strong><span class="text-danger">*</span> Prenom</strong></label>
            <input type="text" class="form-control" id="prenom_r" v-model="representant.prenom" @input="errors.representant=false">
            <p class="text-danger" v-show="errors.prenom">Champ Prenom ne peut etre vide!</p>
          </div>
          <div class="form-group col-md-3">
            <label for="nom_r"><strong><span class="text-danger">*</span>Nom</strong></label>
            <input type="text" class="form-control" id="nom_r" v-model="representant.nom" @input="errors.representant=false">
            <p class="text-danger"  v-show="errors.nom">Champ Nom ne peut etre vide!</p>
          </div>
          <div class="form-group col-md-3">
            <label for="gsm_r"><strong><span class="text-danger">*</span>Telephone</strong></label>
            <input type="tel" class="form-control" id="gsm_r" v-model="representant.gsm" >
            <p class="text-danger"  v-show="errors.gsm">Entre une forme valide!</p>
          </div>
          <div class="form-group col-md-3">
            <label for="email_r"><strong>Email</strong></label>
            <input type="email" class="form-control" id="email_r" v-model="representant.email" >
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center ">
          <div class="form-group col-md-4">
            <button type="button" class="btn btn-primary" @click="addNewRepresentant">Enregistre <i style='font-size:20px;color:white' class="fa fa-address-card"></i></button>
          </div>
          
            <slot></slot>
        
      </div>
      <div class="form-group row justify-content-center" v-if="errors.representant">
        <p class="text-danger"><strong>Ce representant exist deja!</strong></p>
      </div>
    </Form>
    
  </section>

</template>

<script lang="js">

import axios from 'axios'

  export default  {
    name: 'CreateRepresentant',
    props: {
      fournisseur_id: Number
    },
    mounted() {

    },
    data() {
      return {
        representant:{
          fournisseur_id: this.fournisseur_id,
          prenom: '',
          nom: '',
          gsm: '',
          email: ''
        },
        errors:{
          prenom: false,
          nom: false,
          gsm: false,
          email: false,
          representant:false
        }
      }
    },
    methods: {
      validateForm(){
        if(this.representant.prenom != '')
          {
            this.errors.prenom = false;
          }
          else
            this.errors.prenom = true;
        if(this.representant.nom != '')
          {
            this.errors.nom = false;
          }
          else
            this.errors.nom = true;
        if(this.representant.gsm != '' && !isNaN(this.representant.gsm))
          {
            this.errors.gsm = false;
          }
          else
          {
            if(this.representant.gsm != '')
              alert('Entre un numero de telephone valide');
            this.errors.gsm = true;
          }
          if(!this.errors.prenom && !this.errors.nom && !this.errors.gsm && !this.errors.representant)
          {
            return true;
          }
          else 
          {
            return false;
          }

      },
      emptyForm()
      {
        this.representant.prenom = '';
        this.representant.nom = '';
        this.representant.gsm = '';
        this.representant.email = '';
      },
      addNewRepresentant(){
        if(this.validateForm())
        {
            axios.post('/fournisseur/create_new_representant',  {representant: this.representant}).then(response => {
              var rep = response.data;
              if(rep.prenom == null)
              {
                this.errors.representant = true;
              }
              else
              {
                alert('Le representant: '+ rep.prenom +' '+ rep.nom +' a ete bien ajouter a votre liste fournisseurs!');
                this.$emit('update-representants', true);
                this.emptyForm();
              }
            }, () => {
              alert('Error sorry we have any data');
            });
        }
      }
    },
    watch: {
      fournisseur_id: function(val){
        this.representant.fournisseur_id = val;
      }
    },
    computed: {

    }
}
</script>

<style >
  .create-representant {

  }
  label{
    color:black;
  }
</style>
