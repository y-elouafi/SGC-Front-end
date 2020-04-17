<template lang="html">

  <section class="update-representant">
    <h4>Modifie le representant {{representantData.prenom | capitalize}} {{representantData.nom | capitalize}}</h4>
    <Form @submit.prevent="" class="col" @input="haveChange">
      <div class="form-group row text-dark">
        <div class="form-group col-md-3">
            <label for="prenom_r"><strong><span class="text-danger">*</span> Prenom</strong></label>
            <input type="text" class="form-control" id="prenom_r" v-model="representantData.prenom" @input="errors.representant=false">
            <p class="text-danger" v-show="errors.prenom">Champ Prenom ne peut etre vide!</p>
          </div>
          <div class="form-group col-md-3">
            <label for="nom_r"><strong><span class="text-danger">*</span>Nom</strong></label>
            <input type="text" class="form-control" id="nom_r" v-model="representantData.nom" @input="errors.representant=false">
            <p class="text-danger"  v-show="errors.nom">Champ Nom ne peut etre vide!</p>
          </div>
          <div class="form-group col-md-3">
            <label for="gsm_r"><strong><span class="text-danger">*</span>Telephone</strong></label>
            <input type="tel" class="form-control" id="gsm_r" v-model="representantData.gsm" >
            <p class="text-danger"  v-show="errors.gsm">Entre une forme valide!</p>
          </div>
          <div class="form-group col-md-3">
            <label for="email_r"><strong>Email</strong></label>
            <input type="email" class="form-control" id="email_r" v-model="representantData.email" >
          </div>
      </div>
      <div class="form-group row h-100 justify-content-center ">
          <div class="form-group col-md-4">
            <button type="button" class="btn btn-success" v-show="showButton" @click="updateRepresentant">Modifier <i style='font-size:20px;color:white' class="fa fa-address-card"></i></button>
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
    name: 'UpdateRepresentant',
    props: {
      representant: Object
    },
    mounted() {
      this.initiatRepresentantData();
    },
    data() {
      return {
        representantData:{},
        representantRemember:{},
        errors:{
          prenom: false,
          nom: false,
          gsm: false,
          email: false,
          representant:false
        },
        showButton: false
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
      initiatRepresentantData(){
        setTimeout(() => {
          this.representantData = Object.assign({}, this.representant);
          this.representantRemember = Object.assign({}, this.representant);
        }, 500);
      },
      cancelUpdate(){
        setTimeout(() => {
          this.representantData = Object.assign({}, this.representantRemember);
        }, 500);
        
      },
      validateForm(){
        if(this.representantData.prenom != '')
          {
            this.errors.prenom = false;
          }
          else
            this.errors.prenom = true;
        if(this.representantData.nom != '')
          {
            this.errors.nom = false;
          }
          else
            this.errors.nom = true;
        if(this.representantData.gsm != '' && !isNaN(this.representant.gsm))
          {
            this.errors.gsm = false;
          }
          else
          {
            if(this.representantData.gsm != '')
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
        this.representantData.prenom = '';
        this.representantData.nom = '';
        this.representantData.gsm = '';
        this.representantData.email = '';
      },
      haveChange(){
        if(JSON.stringify(this.representantData) != JSON.stringify(this.representantRemember))
        {
          this.showButton = true;
        }
        else
        {
          this.showButton = false;
        }
      },
      updateRepresentant(){
        if(this.validateForm())
        {
          if(JSON.stringify(this.representantData) != JSON.stringify(this.representantRemember))
          {
              axios.put('/fournisseur/update_representant',  {representant: this.representantData}).then(response => {
              var rep = response.data;
              if(rep == 1)
              {
                this.errors.representant = true;
              }
              else if(rep == 2)
              {
                alert('Cette representant n\'exist pas!');
              }
              else
              {
                alert('Le representant: '+ rep.prenom +' '+ rep.nom +' a ete bien modifier!');
                this.$emit('update-representant', true);
              }
            }, () => {
              alert('Error sorry we have any data');
            });
          }
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
  .update-representant {

  }
</style>
