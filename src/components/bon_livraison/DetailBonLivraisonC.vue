<template lang="html">

  <section class="detail-commande">
    <h1 class="alert alert-success br">Detail Commande N {{commande_id}}</h1>
    <div class="col ">
      <p v-if="isValide">Success</p>
      <p class="text-dark">Nom Client: 
        <router-link :to="{ name: 'detail_client', params: { id: client.id }}"  class="text-center">
          <strong><em>{{client.nom_soc | upper}}</em></strong>
        </router-link>
      </p>
      <p class="text-dark">Nom Representant: 
        <strong>
          {{representant.prenom | capitalize}}
        </strong> 
        <strong>
          {{representant.nom | capitalize}}
        </strong>
      </p>
      <p class="text-dark">
        Commande traite dernierement par : <strong class="text-danger">{{user.name | capitalize}}</strong> le <strong>{{commande.updated_at}}</strong>
      </p>
    </div>
  <div>
    <br/>
          <i class="material-icons text-dark">sync</i>
          <table class="table table-condensed" >
            <thead>
              <tr>
                <!-- <th>Check</th> -->
                <th>Code Article</th>
                <th>Reference Article</th>
                <th>Categorie</th>
                <th>Fournisseur</th>
                <th>Quantite</th>
                <th>Prix vent/DH</th>
                <th>Total/DH</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(element, index) in cmd.ids" :key="index">
                <!-- <td><input type="checkbox"  class="" checked/></td> -->
                <td><input type="text"  readOnly class="form-control" :value="cmd.ids[index]" /></td>
                <td><input type="text"  readOnly class="form-control" :value="cmd.noms[index]"  /></td>
                <td ><input type="text" readOnly class="form-control" :value="cmd.cat_noms[index]"/></td>
                <td class="border border-success rounded-lg">
                  <router-link :to="{ name: 'detail_fournisseur', params: { id: cmd.fournisseurs[index].id }}"  class="text-center">
                    <strong><em >{{cmd.fournisseurs[index] | upper}}</em></strong>
                  </router-link>
                </td>
                <td><input type="number" readOnly class="form-control" :value="cmd.qtes[index]" /></td>
                <td><input type="number" step="0.01" readOnly class="form-control" :value="cmd.vents[index]"/></td>
                <td><input type="text" readOnly class="form-control" :value="cmd.totals[index]"/></td>
              </tr>
            </tbody>
          </table>
  </div>
  <div>
    <p class="text-dark">
      Total Commande: <strong>{{commande.total_HT_vent}}DH</strong>
    </p>
    <p class="text-dark">
      Total en lettre: <strong>{{commande.total_HT_lettre}} DH</strong>
    </p>
  </div>

  </section>

</template>

<script lang="js">
import axios from 'axios'

  export default  {
    name: 'DetailCommande',
    props: [],
    mounted() {
      this.initDetailCommande();
    },
    data() {
      return {
        show:false,
        isValide:false,
        len:0,
        commande_id:this.$route.params.id,
        commande:{},
        client:{},
        representant:{},
        user:{},
        articles:[],
        indexTable:[],
        valueTable:[],
        increment:0,
        cmd:{
          to_delete:[],
          ids:[],
          noms:[],
          cat_noms:[],
          fournisseurs:[],
          qtes:[],
          vents:[],
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
        this.cmd.ids.push("");
        this.cmd.noms.push("");
        this.cmd.cat_noms.push("");
        this.cmd.fournisseurs.push("");
        this.cmd.qtes.push("");
        this.cmd.vents.push("");
        this.cmd.totals.push("");
      },
      initTableIndexAndValue(idx, val){
        this.indexTable.push(idx);
        this.valueTable.push(val);
        if(this.len == idx + 1){
          this.show = true;
          console.log("show: " + this.show);
          
        }
      },

      initRow(idx, detail){
        this.cmd.ids[idx] = detail.article_id;
        this.cmd.noms[idx] = this.articles[idx].nom;
        this.initTableIndexAndValue(idx, this.cmd.ids[idx]);
        this.cmd.qtes[idx] = detail.qte;
        this.cmd.vents[idx] = detail.prix_vent;
        this.cmd.totals[idx] = detail.prix_total;
      },
      async getArticleById(idx, val)
      {
        await axios.get('client_commande/get_detail_article_by_id', {params:{article_id:val}}).then(response => {
           if(response.data)
           {
             console.log("articles test: " + response.data.categorie.nom);
              this.cmd.cat_noms[idx] = response.data.categorie.nom;
              this.cmd.fournisseurs[idx] = response.data.fournisseur.nom_soc;
              this.isValide = !this.isValide;
           }
          }, () => {
            alert('Error sorry we have any data');
          });
      },
      initDetailCommande(){
          axios.get('/client_commande/all_detail_commande_by_id', {params:{commande_id: this.commande_id}}).then(response => {
            if(response.data)
            {
              this.client = response.data.client;
              this.representant = response.data.representant;
              this.user = response.data.user;
              this.commande = response.data.commande;
              this.articles = response.data.articles;
              console.log("articles: " + this.articles[0]);
              
              var details = response.data.details;
              this.len = details.length;
              for(var i=0; i<details.length; i++ )
              {
                this.addRow();
                this.initRow(i, details[i]);
              }
            }
          }, () => {
            alert('Error sorry we have any data');
          });
      }

    },
    watch: {
    show: function () {
      this.len = 0;
      for(var i=0; i< this.indexTable.length; i++){
        this.getArticleById(this.indexTable[i], this.valueTable[i]);
      }
      this.isValide = true;
      console.log("is valide: " + this.isValide);
      
    },
    isValide: function () {
      this.len = 0;
      this.isValide = false;
    }
  }
}
</script>

<style >
.detail-commande {
}
</style>
