<template>
  <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="bg-dark border-right" id="sidebar-wrapper" >
      <div class="bg-warning sidebar-heading text-dark text-center">
        <h4>
          <router-link :to="{ name: 'home'}" class="text-dark" >
            <strong> Bacelec</strong>
          </router-link>
        </h4>
      </div>
      <div class="list-group list-group-flush">


              <div class="dropdown dropright ">
                <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                  <i class="fas fa-book text-light"></i><strong>&nbsp;Categorie</strong>
                </a>
                <div class="dropdown-menu">
                  <router-link :to="{name: 'create_categorie'}" class="dropdown-item bg-light text-primary" >Nouvelle Categorie</router-link>
                  <div class="dropdown-divider"></div>
                  <router-link :to="{name: 'list_categories'}" class="dropdown-item bg-light text-primary" >List Categories</router-link>
                </div>
              </div>

              <div class="dropdown dropright">
                <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                  <i class="fab fa-asymmetrik text-light"></i><strong>rticle</strong>
                </a>
                <div class="dropdown-menu">
                  <router-link :to="{name:'create_article'}" class="dropdown-item bg-light text-primary" >Nouvelle Article</router-link>
                  <div class="dropdown-divider"></div>
                  <router-link :to="{name:'list_articles'}"  class="dropdown-item bg-light text-primary" >List Article</router-link>
                </div>
              </div>

              <div class="dropdown dropright" >
                <a type="button" class="btn btn-success dropdown-toggle nav-link text-light" data-toggle="dropdown" @mouseover="showC = true" >
                  <i class="fas fa-diagnoses text-light"></i><strong>&nbsp;Client</strong>
                </a>
                <div class="dropdown-menu">
                  <router-link :to="{name:'create_client'}" class="dropdown-item bg-light text-primary" >Nouvelle Client</router-link>
                  <div class="dropdown-divider"></div>
                  <router-link :to="{name:'list_clients'}"  class="dropdown-item bg-light text-primary" >List Client</router-link>
                </div>
              </div>

              <transition name="fade">
                <div v-if="showC" @mouseleave="showC = false">
                    <div class="dropdown dropright">
                      <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                        <strong>Commande</strong>
                      </a>
                      <div class="dropdown-menu">
                        <router-link :to="{name:'create_commande_client'}" class="dropdown-item bg-light text-primary" >Nouvelle Commande</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link  :to="{name:'list_commandes_client'}" class="dropdown-item bg-light text-primary" >List Commande En Cours</router-link>
                        <div  class="dropdown-divider"></div>
                        <router-link :to="{name:'list_commandes_client_traite'}" class="dropdown-item bg-light text-primary" >List Commande Traite</router-link>
                      </div>
                    </div>

                    <div class="dropdown dropright">
                      <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                        <strong>Bon Livraison</strong>
                      </a>
                      <div class="dropdown-menu">
                        <router-link :to="{name:'create_bon_livraison_client'}" class="dropdown-item bg-light text-primary" >Nouvelle Bon Laivraison</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="{name:'list_bon_livraisons_client'}" class="dropdown-item bg-light text-primary" >List Bon Laivraison En Cours</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="{name:'list_bon_livraisons_client_traite'}" class="dropdown-item bg-light text-primary" >List Bon Laivraison Traite</router-link>
                      </div>
                    </div>

                    <div class="dropdown dropright">
                      <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                        <strong>Facture</strong>
                      </a>
                      <div class="dropdown-menu">
                        <router-link :to="{name:'create_facture'}" class="dropdown-item bg-light text-primary" >Nouvelle Facture</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="#" class="dropdown-item bg-light text-primary" >List Factures En Cours</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="#" class="dropdown-item bg-light text-primary" >List Factures Traite</router-link>
                      </div>
                    </div>

                    <div class="dropdown dropright">
                      <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                        <strong>Avoir</strong>
                      </a>
                      <div class="dropdown-menu">
                        <router-link :to="{name:'create_avoir'}"  class="dropdown-item bg-light text-primary">Nouvelle Avoir</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="{name:'list_avoirs'}"  class="dropdown-item bg-light text-primary" >List Avoir</router-link>
                      </div>
                    </div>
                </div>
              </transition>

              <div class="dropdown dropright">
                <a type="button" class="btn btn-primary dropdown-toggle nav-link text-light" data-toggle="dropdown" @mouseover="showF = true">
                  <i class="fas fa-store-alt text-light"></i><strong>&nbsp;Fournisseur</strong>
                </a>
                <div class="dropdown-menu">
                  <router-link :to="{name:'create_fournisseur'}" class="dropdown-item bg-light text-primary" >Nouvelle Fournisseur</router-link>
                  <div class="dropdown-divider"></div>
                  <router-link :to="{name:'list_fournisseurs'}"  class="dropdown-item bg-light text-primary" >List Fournisseurs</router-link>
                </div>
              </div>

              <transition name="fade">
                <div v-if="showF" @mouseleave="showF = false">
                    <div class="dropdown dropright">
                      <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                        <strong>Commande</strong>
                      </a>
                      <div class="dropdown-menu">
                        <router-link :to="{name:'create_commande_client'}" class="dropdown-item bg-light text-primary" >Nouvelle Commande</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link  :to="{name:'list_commandes_client'}" class="dropdown-item bg-light text-primary" >List Commande En Cours</router-link>
                        <div  class="dropdown-divider"></div>
                        <router-link :to="{name:'list_commandes_client_traite'}" class="dropdown-item bg-light text-primary" >List Commande Traite</router-link>
                      </div>
                    </div>

                    <div class="dropdown dropright">
                      <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                        <strong>Bon Livraison</strong>
                      </a>
                      <div class="dropdown-menu">
                        <router-link :to="{name:'create_bon_livraison'}" class="dropdown-item bg-light text-primary" >Nouvelle Bon Laivraison</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="#" class="dropdown-item bg-light text-primary" >List Bon Laivraison En Cours</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="#" class="dropdown-item bg-light text-primary" >List Bon Laivraison Traite</router-link>
                      </div>
                    </div>

                    <div class="dropdown dropright">
                      <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                        <strong>Facture</strong>
                      </a>
                      <div class="dropdown-menu">
                        <router-link :to="{name:'create_facture'}" class="dropdown-item bg-light text-primary" >Nouvelle Facture</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="#" class="dropdown-item bg-light text-primary" >List Factures En Cours</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="#" class="dropdown-item bg-light text-primary" >List Factures Traite</router-link>
                      </div>
                    </div>

                    <div class="dropdown dropright">
                      <a type="button" class="btn btn-dark dropdown-toggle nav-link text-light" data-toggle="dropdown">
                        <strong>Avoir</strong>
                      </a>
                      <div class="dropdown-menu">
                        <router-link :to="{name:'create_avoir'}"  class="dropdown-item bg-light text-primary">Nouvelle Avoir</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="{name:'list_avoirs'}"  class="dropdown-item bg-light text-primary" >List Avoir</router-link>
                      </div>
                    </div>
                </div>
              </transition>

              <div class=" ">
                <a type="button" class="btn btn-info nav-link text-light" >
                  <i class="fas fa-chart-line text-light"></i><strong>&nbsp; Statistiques</strong>
                </a>
              </div>

              <div class=" ">
                <router-link to="" type="button" class="btn btn-info nav-link text-light" >
                  <i class="fas fa-candy-cane text-light"></i><strong>&nbsp;Events</strong>
                </router-link>
              </div>
        
      </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
        <button class="btn btn-dark" style='font-size:15px;color:white' id="menu-toggle" @click="wrapperSlide"><i class='fas fa-angle-double-left' v-if="showSlide"></i> <i class='far fa-hand-pointer ml-2 mr-2'></i> <i class='fas fa-angle-double-right' v-if="!showSlide"></i></button>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>


        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item active">
             <!-- <a href="/" class="nav-link" >Home <span class="sr-only">(current)</span></a> -->
             <router-link :to="{name:'index'}" class="nav-link" >Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Notifications</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Email</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" v-if="isUser">
                  <i class="fas fa-user"> </i><em>{{' '+user|upper}}</em>
              </a>
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" v-if="!isUser">
                User
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <!-- <router-link :to="{name: 'index'}" class="dropdown-item" @click="logout">Logout</router-link> -->
                <a class="dropdown-item" @click="logout">Logout</a>
                <!-- <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a> -->
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container-fluid align-bottom center-blog ">
        <router-view></router-view>
        <!-- <slot></slot> -->
      </div>


    </div>
    <!-- /#page-content-wrapper -->

  </div>

</template>


<script lang="js">


import jquery from 'jquery'; /// HERE .......


  export default  {
    name: 'NavSideBar',
    components: {
      
    },  
    data(){
      return{
        showSlide:true,
        isUser: this.$auth.haveUser(),
        user: this.$auth.getUserName(),
        showC: false,
        showF: false
      }
    },
    mounted() {
      jquery("#menu-toggle").click(function(e) { // AND HERE .......
      e.preventDefault();
      jquery("#wrapper").toggleClass("toggled");// HERE ALSO......
      })
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
    methods:{
      logout(){
        this.$auth.destroyToken();
        this.$router.push('/');
      },
      wrapperSlide(){
          this.showSlide = !this.showSlide;
      },
    },
    }



</script>

<style >

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.center-blog{
    vertical-align: middle;
    margin-top: 5%;
}

/*!
 * Start Bootstrap - Simple Sidebar (https://startbootstrap.com/template-overviews/simple-sidebar)
 * Copyright 2013-2019 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-simple-sidebar/blob/master/LICENSE)
 */
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}

</style>
