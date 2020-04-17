<template lang="html">
  
  <section class="create-bon-livraison  pl-2 pr-2 pt-2">
    <h1 class="alert alert-success br">Creation Bon Livraison Client</h1>
    <div class="">
      <Form @submit.prevent="" class="">
        <div class="col ">
            <div class="row bg-gray justify-content-center">
            <div class="form-group col-md-5">
              <label for=""><strong>Client</strong></label>
              <select class="form-control" id="" v-model="client_id" @change="getRepresentant(client_id)">
                <option disabled value="0">Choisissez</option>
                <option v-for="client in clients" :key="client.id" v-bind:value="client.id">{{client.nom_soc|upper}}</option>
              </select>
            </div>
            <div class="form-group col-md-5">
              <label for=""><strong>Representant</strong></label>
              <select class="form-control" id=""  v-model="representant_id" @change="showTable = true">
                <option disabled value="0">Choisissez</option>
                <option v-for="rep in representants" :key="rep.id" v-bind:value="rep.id">{{rep.prenom|capitalize}} {{rep.nom|capitalize}}</option>
              </select>
            </div>
          </div>
          <br/>
          <i class="material-icons text-dark">sync</i>
          <table class="table table-condensed" v-if="showTable">
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Reference</th>
                <th>Categorie</th>
                <th>Stocke</th>
                <th>Quantite</th>
                <th>Prix d'achat/DH</th>
                <th>Prix vent/DH</th>
                <th>Dernier vent/DH</th>
                <th>Total/DH</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(element, index) in cmd.ids" v-bind:key="index">
                <td><input type="checkbox" v-model="cmd.to_delete[index]"/></td>
                <td><input type="text"  class="form-control" v-model="cmd.ids[index]" @input="getRowValuesById(index, cmd.ids[index])" @blur="verifyDeplicateArticle"/></td>
                <td><input type="text"  class="form-control" v-model="cmd.noms[index]" @input="getRowValuesByName(index, cmd.noms[index])" /></td>
                <td><input type="text" readOnly class="form-control" v-model="cmd.cat_noms[index]"/></td>
                <td><input type="text" readOnly class="form-control" v-model="cmd.stockes[index]"/></td>
                <td><input type="number" class="form-control" v-model="cmd.qtes[index]" @input="calculeVent(index)"/></td>
                <td><input type="number" step="0.01" class="form-control" v-model="cmd.achats[index]"/></td>
                <td><input type="number" step="0.01" class="form-control" v-model="cmd.vents[index]" @input="calculeVent(index)"/></td>
                <td><input type="number" readOnly step="0.01" class="form-control" v-model="cmd.last_vents[index]"/></td>
                <td><input type="text" readOnly class="form-control" v-model="cmd.totals[index]"/></td>
              </tr>
            </tbody>
          </table>
          <div class="form-group col h-100 justify-content-end col-4">
              <p class="text-primary"><strong>Total Global: </strong></p>
              <div class="row form-group"><input type="text" readOnly class="form-control text-center col-10" v-model="totalGlobal"/>
              <p class="text-dark pt-2 pl-2"> DH</p></div>
          </div>
          <div class="form-group row h-100 justify-content-center">
              <div class="form-group ">
                <button class="btn btn-success" @click="addRow">Ajouter&nbsp;<i class="fa fa-plus"></i></button>&nbsp;
                <button class="btn btn-danger"  @click="deleteRow">Supprimer&nbsp;<i class="fa fa-trash"></i></button>&nbsp;
                <button class="btn btn-primary" @click="saveBonLivraison">Enregistre&nbsp;<i class="fas fa-save"></i></button>
              </div>
          </div>
        </div>
    </Form>
    </div>

  </section>

</template>

<script lang="js">
import axios from 'axios'

  export default  {
    name: 'CreateBonLivraisonC',
    props: [],
    mounted() {
      this.getClients();
    },
    data() {
      return {
        showTable: false,
        clients: [],
        representants: [],
        bonLivraison:{},
        client_id:0,
        representant_id:0,
        article:{},
        categorie:{},
        // last_vent:0,
        totalGlobal:0,
        cmd:{
          to_delete:[],
          ids:[],
          noms:[],
          cat_noms:[],
          stockes:[],
          qtes:[],
          achats:[],
          vents:[],
          last_vents:[],
          totals:[]
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
      addRow(){
        this.cmd.to_delete.push("");
        this.cmd.ids.push("");
        this.cmd.noms.push("");
        this.cmd.cat_noms.push("");
        this.cmd.stockes.push("");
        this.cmd.qtes.push("");
        this.cmd.achats.push("");
        this.cmd.vents.push("");
        this.cmd.last_vents.push("");
        this.cmd.totals.push("");
      },
      deleteRow(){
        for(var i=0; i<this.cmd.ids.length; i++)
        {
          while(this.cmd.to_delete[i])
          {
            this.cmd.to_delete.splice(i, 1);
            this.cmd.ids.splice(i, 1);
            this.cmd.noms.splice(i, 1);
            this.cmd.cat_noms.splice(i, 1);
            this.cmd.stockes.splice(i, 1);
            this.cmd.qtes.splice(i, 1);
            this.cmd.achats.splice(i, 1);
            this.cmd.vents.splice(i, 1);
            this.cmd.last_vents.splice(i, 1);
            this.cmd.totals.splice(i, 1);
          }
        }
        this.calculeTotalIndex();
      },
      initRow(idx){
        this.cmd.ids[idx] = this.article.id;
        this.cmd.noms[idx] = this.article.nom;
        this.cmd.cat_noms[idx] = this.categorie.nom;
        this.cmd.stockes[idx] = this.article.qte_reel;
        this.cmd.qtes[idx] = this.article.qte_reel == 0? 0: 1;
        this.cmd.achats[idx] = this.article.prix_achat;
        this.cmd.vents[idx] = this.article.prix_vent;
        // this.cmd.last_vents[idx] = this.last_vent;
        this.calculeVent(idx);
        
      },
      calculeVent(idx){
        if(this.cmd.qtes[idx] > this.cmd.stockes[idx])
        {
          alert("Vous n'avez pas autant en stocke!");
          this.cmd.qtes[idx] = this.cmd.stockes[idx];
        }
        this.cmd.totals[idx] = this.cmd.qtes[idx] * this.cmd.vents[idx];
        this.calculeTotalIndex();
      },
      calculeTotalIndex(){
        var total = 0;
        for(var i=0; i<this.cmd.ids.length; i++)
        {
          total += this.cmd.totals[i];
        }
        this.totalGlobal = total;
      },
      verifyBonLivraison(){
        for(var i=0; i<this.cmd.ids.length; i++)
        {
          while(this.cmd.ids[i] == "" || this.cmd.noms[i] == "")
          {
            this.cmd.to_delete.splice(i, 1);
            this.cmd.ids.splice(i, 1);
            this.cmd.noms.splice(i, 1);
            this.cmd.cat_noms.splice(i, 1);
            this.cmd.stockes.splice(i, 1);
            this.cmd.qtes.splice(i, 1);
            this.cmd.achats.splice(i, 1);
            this.cmd.vents.splice(i, 1);
            this.cmd.last_vents.splice(i, 1);
            this.cmd.totals.splice(i, 1);
            // return false;
          }
        }
        // return true;
      },
      async verifyDeplicateArticle(){
        await setTimeout(() => {
          for(var i=0; i<this.cmd.ids.length-1 ; i++)
          {
            var index = this.cmd.ids.length-1; // dernier element ajouter a verify si il se trouve en double dans le bon livraison...
            while(this.cmd.ids[index] == this.cmd.ids[i])
            {
              alert("L'article "+ this.cmd.ids[index]  +" est deja presente dans cette Bon Livraison.");
              return false;
            }
          }
          return true;
        }, 0);
      },
      async verifyDeplicateArticleByName(){
        await setTimeout(() => {
          for(var i=0; i<this.cmd.ids.length-1 ; i++)
          {
            var index = this.cmd.ids.length-1; // dernier element ajouter a verify s'il se trouve en double dans le bon livraison...
            while(this.cmd.noms[index] == this.cmd.noms[i])
            {
              alert("L'article "+ this.cmd.noms[index]  +" est deja presente dans cette Bon Livraison.");
              return false;
            }
          }
          return true;
        }, 0);
      },
      verifyDeplicateArticleBeforSave(){
        var test = true;
        for(var i=0; i<this.cmd.ids.length-1 ; i++)
          {
            for(var j=i+1; j<this.cmd.ids.length; j++)
            {
              while(this.cmd.ids[i] == this.cmd.ids[j] || this.cmd.noms[i] == this.cmd.noms[j] )
              {
                this.cmd.to_delete.splice(j, 1);
                this.cmd.ids.splice(j, 1);
                this.cmd.noms.splice(j, 1);
                this.cmd.cat_noms.splice(j, 1);
                this.cmd.stockes.splice(j, 1);
                this.cmd.qtes.splice(j, 1);
                this.cmd.achats.splice(j, 1);
                this.cmd.vents.splice(j, 1);
                this.cmd.last_vents.splice(j, 1);
                this.cmd.totals.splice(j, 1);
                this.calculeTotalIndex();
                test = false;
              }
            }
          }
          return test;
      },
      videArrayBonLivraison(){
        this.cmd.ids = [];
        this.cmd.noms = [];
        this.cmd.cat_noms = [];
        this.cmd.stockes = [];
        this.cmd.qtes = [];
        this.cmd.achats = [];
        this.cmd.vents= [];
        this.cmd.last_vents = [];
        this.cmd.totals = [];
        this.totalGlobal = 0;
        this.addRow();
      },

      getRowValuesById(idx, val){
        axios.get('client_bon_livraison/get_article_by_id', {params:{article_id:val, client_id:this.client_id}}).then(response => {
            if(response.data)
            {
              if(response.data.article.qte_reel == 0)
              {
                this.cmd.ids[idx]= "";
                this.cmd.noms[idx] = "";
                this.cmd.cat_noms[idx] = "";
                this.cmd.stockes[idx] = "";
                this.cmd.qtes[idx] = "";
                this.cmd.achats[idx] = "";
                this.cmd.vents[idx] = "";
                this.calculeVent(idx);
                alert("Stock epuise");
              }
              else
              {
                this.article = response.data.article;
                this.categorie = response.data.categorie;
                this.cmd.last_vents[idx] = response.data.last_vent;
                this.initRow(idx);
              }
            }
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      async getRowValuesByName(idx, val){
        await this.verifyDeplicateArticleByName();
        axios.get('/client_bon_livraison/get_article_by_name', {params:{article_name:val, client_id:this.client_id}}).then(response => {
            if(response.data)
            {
              if(response.data.article.qte_reel == 0)
              {
                this.cmd.ids[idx]= "";
                this.cmd.noms[idx] = "";
                this.cmd.cat_noms[idx] = "";
                this.cmd.stockes[idx] = "";
                this.cmd.qtes[idx] = "";
                this.cmd.achats[idx] = "";
                this.cmd.vents[idx] = "";
                this.calculeVent(idx);
                alert("Stock epuise");
              }
              else
              {
                this.article = response.data.article;
                this.categorie = response.data.categorie;
                this.cmd.last_vents[idx] = response.data.last_vent;
                this.initRow(idx);
              }
            }
            
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getClients(){
        this.totalGlobal = 0;
        axios.get('/client/all_clients_active').then(response => {
            this.clients = response.data;
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      getRepresentant(val){
        this.showTable = false;
        if(val > 0)
        {
          axios.get('/client/all_representants/'+val).then(response => {
            this.representants = response.data;
            this.videArrayBonLivraison();
          }, () => {
            alert('Error sorry we have any data');
          });
        }
      },
      async saveBonLivraison(){
        await this.verifyBonLivraison();
        if(this.cmd.ids.length > 0 )
        {
          if(await this.verifyDeplicateArticleBeforSave()){
            axios.post('/client_bon_livraison/create_new_bon_livraison_client',
              {
                cmd: this.cmd, client_id: this.client_id, representant_id: this.representant_id,
                total: this.totalGlobal, user_id: this.$auth.getUserId()
              }).then(response => {
                var data = response.data;
                // console.log(data);
                if(data)
                {
                  alert("Votre Bon Livraison N "+ data.id +" a ete bien traite!");
                  this.videArrayBonLivraison();
                }
            
              }, () => {
                alert('Error sorry we have any data');
              });
          }
          else
          {
            if(confirm("Valide le bon livraison? \n NB: les colonnes duplique seront retire automatiquement!"))
            {
              this.saveBonLivraison();
            }
          }
            
        }
        else{
          alert("Aucun Bon livraison a traite!");
        }
      }

    },
    computed: {

    }
}
</script>

<style >
.create-bon-livraison {
}
label {
  color: white;
}
.bg-gray {
  text-align: center;
  background-color: rgb(90, 88, 88);
  border: 2px solid rgb(126, 117, 247);
  border-radius: 20px;
}
.br {
  border: 2px solid rgb(1, 129, 33);
  border-radius: 40px;
}
</style>
