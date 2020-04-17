
// import CreateArticle from './components/CreateCategorie.vue';
// import CreateCategorie from './components/ListCategories.vue';
import SGCHome from '../SGCHome.vue';
import Categorie from './categorie/Categorie.vue'
import CreateCategorie from './categorie/CreateCategorie.vue'
import ListCategories from './categorie/ListCategories.vue'
import DetailCategorie from './categorie/DetailCategorie.vue'
// import UpdateCategorie from './categorie/UpdateCategorie.vue'

import Article from './article/Article.vue'
import CreateArticle from './article/CreateArticle.vue'
import ListArticles from './article/ListArticles.vue'
import DetailArticle from './article/DetailArticle.vue'
// import UpdateArticle from './article/UpdateArticle.vue'

import Commande from './commande/Commande.vue'
import CreateCommandeC from './commande/CreateCommandeC.vue'
import ListCommandesC from './commande/ListCommandesC.vue'
import DetailCommandeC from './commande/DetailCommandeC.vue'
import ListCommandesTraiteC from './commande/ListCommandeTraiteC.vue'
import UpdateCommandeC from './commande/UpdateCommandeC.vue'

import BonLivraison from './bon_livraison/BonLivraison.vue'
import CreateBonLivraisonC from './bon_livraison/CreateBonLivraisonC.vue'
import ListBonsC from './bon_livraison/ListBonsC.vue'
import ListBonsTraiteC from './bon_livraison/ListBonsTraiteC.vue'
import DetailBonLivraisonC from './bon_livraison/DetailBonLivraisonC.vue'
import UpdateBonLivraisonC from './bon_livraison/UpdateBonLivraisonC.vue'

import Facture from './facture/Facture.vue'
import CreateFacture from './facture/CreateFacture.vue'
import ListFactures from './facture/ListFactures.vue'
import DetailFacture from './facture/DetailFacture.vue'
// import UpdateFacture from './facture/UpdateFacture.vue'

// import Avoir from './avoir/Avoir.vue'
import CreateAvoir from './avoir/CreateAvoir.vue'
import ListAvoirs from './avoir/ListAvoirs.vue'
import DetailAvoir from './avoir/DetailAvoir.vue'
// import UpdateAvoir from './avoir/UpdateAvoir.vue'

import Client from './client/Client.vue'
import CreateClient from './client/CreateClient.vue'
import ListClients from './client/ListClients.vue'
import DetailClient from './client/DetailClient.vue'
import UpdateClient from './client/UpdateClient.vue'

import Fournisseur from './fournisseur/Fournisseur.vue'
import CreateFournisseur from './fournisseur/CreateFournisseur.vue'
import ListFournisseurs from './fournisseur/ListFournisseurs.vue'
import DetailFournisseur from './fournisseur/DetailFournisseur.vue'
import UpdateFournisseur from './fournisseur/UpdateFournisseur.vue'

import NavSideBar from './NavSideBar.vue'
import Home from '../Home.vue'





const routes = [
  {path:'/', component: Home, name : 'index'},
  {path:'/sgc', component: NavSideBar, meta: { requiresAuth: true }, name : 'navside', children: [
      {path:'/sgc/home', component: SGCHome, meta: { requiresAuth: true }, name : 'home'},
      {path:'/sgc/categorie', component: Categorie, meta: { requiresAuth: true }, name : 'categorie', children: [
                {path: 'create_categorie',component: CreateCategorie, meta: { requiresAuth: true }, name : 'create_categorie'},
                {path: 'list_categories',component: ListCategories, meta: { requiresAuth: true }, name : 'list_categories'},
                {path: 'detail_categorie/:id',component: DetailCategorie, meta: { requiresAuth: true }, name : 'detail_categorie'},
      ]},
      {path:'/sgc/article', component: Article, meta: { requiresAuth: true }, name : 'article', children: [
        {path: 'create_article',component: CreateArticle, meta: { requiresAuth: true }, name : 'create_article'},
        {path: 'list_articles',component: ListArticles, meta: { requiresAuth: true }, name : 'list_articles'},
        {path: 'detail_article/:id',component: DetailArticle, meta: { requiresAuth: true }, name : 'detail_article'},
      ]},
      {path:'/sgc/commande', component: Commande, meta: { requiresAuth: true }, name : 'commande', children: [
        {path: 'create_commande_client',component: CreateCommandeC, meta: { requiresAuth: true }, name : 'create_commande_client'},
        {path: 'list_commandes_client',component: ListCommandesC, meta: { requiresAuth: true }, name : 'list_commandes_client'},
        {path: 'list_commandes_client_traite', component: ListCommandesTraiteC, meta: { requiresAuth: true }, name: 'list_commandes_client_traite' },
        {path: 'detail_commande_client/:id',component: DetailCommandeC, meta: { requiresAuth: true }, name : 'detail_commande_client'},
        { path: 'update_commande_client/:id', component: UpdateCommandeC, meta: { requiresAuth: true }, name: 'update_commande_client' },
      ]},
      {path:'/sgc/bon_livraison', component: BonLivraison, meta: { requiresAuth: true }, name : 'bon_livraison', children: [
        {path: 'create_bon_livraison_client',component: CreateBonLivraisonC, meta: { requiresAuth: true }, name : 'create_bon_livraison_client'},
        {path: 'list_bon_livraisons_client',component: ListBonsC, meta: { requiresAuth: true }, name : 'list_bon_livraisons_client'},
        {path: 'list_bon_livraisons_client_traite', component: ListBonsTraiteC, meta: { requiresAuth: true }, name: 'list_bon_livraisons_client_traite' },
        {path: 'detail_bon_livraison_client/:id',component: DetailBonLivraisonC, meta: { requiresAuth: true }, name : 'detail_bon_livraison_client'},
        { path: 'update_bon_livraison_client/:id', component: UpdateBonLivraisonC, meta: { requiresAuth: true }, name: 'update_bon_livraison_client' },
      ]},
      {path:'/sgc/facture', component: Facture, meta: { requiresAuth: true }, name : 'facture', children: [
        {path: 'create_facture',component: CreateFacture, meta: { requiresAuth: true }, name : 'create_facture'},
        {path: 'list_factures',component: ListFactures, meta: { requiresAuth: true }, name : 'list_factures'},
        {path: 'detail_facture/:id',component: DetailFacture, meta: { requiresAuth: true }, name : 'detail_facture'},
      ]},
      {path:'/sgc/client', component: Client, meta: { requiresAuth: true }, name : 'client', children: [
        {path: 'create_client',component: CreateClient, meta: { requiresAuth: true }, name : 'create_client'},
        {path: 'list_clients',component: ListClients, meta: { requiresAuth: true }, name : 'list_clients'},
        {path: 'detail_client/:id',component: DetailClient, meta: { requiresAuth: true }, name : 'detail_client'},
        {path: 'update_client/:id',component: UpdateClient, meta: { requiresAuth: true }, name : 'update_client'}
      ]},
      {path:'/sgc/fournisseur', component: Fournisseur, meta: { requiresAuth: true }, name : 'fournisseur', children: [
        {path: 'create_fournisseur',component: CreateFournisseur, meta: { requiresAuth: true }, name : 'create_fournisseur'},
        {path: 'list_fournisseurs',component: ListFournisseurs, meta: { requiresAuth: true }, name : 'list_fournisseurs'},
        {path: 'detail_fournisseur/:id',component: DetailFournisseur, meta: { requiresAuth: true }, name : 'detail_fournisseur'},
        {path: 'update_fournisseur/:id',component: UpdateFournisseur, meta: { requiresAuth: true }, name : 'update_fournisseur'}
      ]},
      {path:'/sgc/avoir', component: Fournisseur, meta: { requiresAuth: true }, name : 'avoir', children: [
        {path: 'create_avoir',component: CreateAvoir, meta: { requiresAuth: true }, name : 'create_avoir'},
        {path: 'list_avoirs',component: ListAvoirs, meta: { requiresAuth: true }, name : 'list_avoirs'},
        {path: 'detail_avoir/:id',component: DetailAvoir, meta: { requiresAuth: true }, name : 'detail_avoir'},
      ]},
      
    ]},
  ]

export default routes;