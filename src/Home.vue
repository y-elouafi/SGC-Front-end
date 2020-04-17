<template>
    <section>
         <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
        <a href="/" class="text-light" style="font-size:26px;" v-if="!isAuth">BACELEC</a>

        <router-link :to="{name: 'home'}" class="text-light" style="font-size:26px;" v-if="isAuth">BACELEC</router-link>
        <!-- Uncomment below if you prefer to use a text logo -->
        <!--<h1><a href="#hero">Regna</a></h1>-->
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li class="menu-active"><a href="#hero">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#partenaire">Partenaire</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li class="nav-item dropdown" v-if="isAuth">
              <a class="nav-link dropdown-toggle text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" v-if="isUser">
                  <i class="fas fa-user"> </i><em>{{' '+user|upper}}</em>
              </a>
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" v-if="!isUser">
                User
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" @click="logout">Logout</a>
              </div>
            </li>
        </ul>
      </nav><!-- #nav-menu-container -->
    </div>
  </header><!-- #header -->

  <!--==========================
    Hero Section
  ============================-->
  <section id="hero">
    <div class="hero-container">
      <h1>Bienvenu chez Bacelec</h1>
      <h2>Nous Somme Une Societe Specialise Dans l’Importation Et La Distribution Des Matériaux Electriques</h2>
      <a href="#about" class="btn-get-started" v-if="isValide && isAuth">Get Started</a>
      <div v-if="!isValide" class="div-log">
            <a  class="btn-get-started"  @click="show = !show">Get Started</a>
            <transition name="fade" v-if="show">
              <div class="custom-file" >
                <input type="file" class="custom-file-input" id="customFile" ref="fileInput" @change="uploadFile">
                <label class="custom-file-label" for="customFile">Choose file</label>
              </div>
            </transition>
      </div>
      <div v-if="isValide && !isAuth">
            <a  class="btn-get-started"  @click="show = !show">Get Started</a>
            <transition name="fade" >
                <div v-if="show">
                    <login @newLog="newLogin"></login>
                </div>
            </transition>
      </div>
    </div>
  </section><!-- #hero -->

  <main id="main">

    <!--==========================
      About Us Section
    ============================-->
    <section id="about">
      <div class="container">
        <div class="row about-container">

          <div class="col-lg-6 content order-lg-1 order-2">
            <h2 class="title">Quelque Mots Sur Nous</h2>
            <p>
              Bacelec fondé en 1989 , basé à Casablanca , Societe spécialisé dans l’importation et la distribution des matériaux électriques.
              Nous sommes aujourd'hui l'une des figures de proue dans ce domaine. Nous somme l'un des fournisseurs le plus performant et le mieux adapté aux demandes des clients.
            </p>

            <div class="icon-box wow fadeInUp">
              <div class="icon"><i class="fa fa-shopping-bag"></i></div>
              <h4 class="title"><a href="">Notre Engagement</a></h4>
              <p class="description">Importation Et La Distribution Des Matériaux Electriques</p>
            </div>

            <div class="icon-box wow fadeInUp" data-wow-delay="0.2s">
              <div class="icon"><i class="fa fa-photo"></i></div>
              <h4 class="title"><a href="">Referencement</a></h4>
              <p class="description">Nous Somme Une Des Plus Grand Societe Situe A Casablanca</p>
            </div>

            <div class="icon-box wow fadeInUp" data-wow-delay="0.4s">
              <div class="icon"><i class="fa fa-bar-chart"></i></div>
              <h4 class="title"><a href="">Services Et Qualites</a></h4>
              <p class="description">Bacelec Fournis Des Materiaux De Haut Gemme, Avec Un Tres Bonne Service</p>
            </div>

          </div>

          <div class="col-lg-6 background order-lg-2 order-1 wow fadeInRight"></div>
        </div>

      </div>
    </section><!-- #about -->

    <!--==========================
      Facts Section
    ============================-->
    <section id="facts">
      <div class="container wow fadeIn">
        <div class="section-header">
          <h3 class="section-title">FAITS</h3>
          <p class="section-description">Tous Nos Activites Realise</p>
        </div>
        <div class="row counters">

  				<div class="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">232</span>
            <p>Clients</p>
  				</div>

          <div class="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">521</span>
            <p>Projects</p>
  				</div>

          <div class="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">1,463</span>
            <p>Hours Of Support</p>
  				</div>

          <div class="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">15</span>
            <p>Hard Workers</p>
  				</div>

  			</div>

      </div>
    </section><!-- #facts -->

    <!--==========================
      Services Section
    ============================-->
    <section id="services">
      <div class="container wow fadeIn">
        <div class="section-header">
          <h3 class="section-title">Services</h3>
          <p class="section-description"></p>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="box">
              <div class="icon"><a href=""><i class="fa fa-desktop"></i></a></div>
              <h4 class="title"><a href="">Qualite</a></h4>

            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
            <div class="box">
              <div class="icon"><a href=""><i class="fa fa-bar-chart"></i></a></div>
              <h4 class="title"><a href="">Satisfaction</a></h4>

            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
            <div class="box">
              <div class="icon"><a href=""><i class="fa fa-paper-plane"></i></a></div>
              <h4 class="title"><a href="">Rapidite</a></h4>

            </div>
          </div>
        </div>

      </div>
    </section><!-- #services -->

    <!--==========================



      Portfolio Section
    ============================-->
    <section id="partenaire">
      <div class="container wow fadeInUp">
        <div class="section-header">
          <h3 class="section-title">Partenariat</h3>
          <p class="section-description">Les Partenaires Ideal</p>
        </div>
        <div class="row">


        </div>

        <div class="row" id="portfolio-wrapper">
          <div class="col-lg-3 col-md-6 portfolio-item filter-app">
            <a href="">
              <img src="img/part/sofa.jpg" alt="" style="width:200px; height:200px;">
              <div class="details">
                <h4>SOFA</h4>
              </div>
            </a>
          </div>

          <div class="col-lg-3 col-md-6 portfolio-item filter-web">
            <a href="">
              <img src="img/part/ing.jpg" alt="" style="width:200px; height:200px;">
              <div class="details">
                <h4>INGELEC</h4>
              </div>
            </a>
          </div>

          <div class="col-lg-3 col-md-6 portfolio-item filter-app">
            <a href="">
              <img src="img/part/selfa.jpg" alt="" style="width:200px; height:200px;">
              <div class="details">
                <h4>SELFA</h4>
              </div>
            </a>
          </div>

          <div class="col-lg-3 col-md-6 portfolio-item filter-card">
            <a href="">
              <img src="img/part/sh.jpg" alt="" style="width:200px; height:200px;">
              <div class="details">
                <h4>SCHNEIDER</h4>
              </div>
            </a>
          </div>

          <div class="col-lg-3 col-md-6 portfolio-item filter-card">
            <a href="">
              <img src="img/part/hager.jpg" alt="" style="width:200px; height:200px;">
              <div class="details">
                <h4>HAGER</h4>
              </div>
            </a>
          </div>

          <div class="col-lg-3 col-md-6 portfolio-item filter-card">
            <a href="">
              <img src="img/part/simon.jpg" alt="" style="width:200px; height:200px;">
              <div class="details">
                <h4>SIMON</h4>
              </div>
            </a>
          </div>

          <div class="col-lg-3 col-md-6 portfolio-item filter-card">
            <a href="">
              <img src="img/part/sot.jpg" alt="" style="width:200px; height:200px;">
              <div class="details">
                <h4>SOTELEC</h4>
              </div>
            </a>
          </div>

          <div class="col-lg-3 col-md-6 portfolio-item filter-card">
            <a href="">
              <img src="img/part/ouh.jpg" alt="" style="width:200px; height:200px;">
              <div class="details">
                <h4>GROUPE OUHOUD</h4>
              </div>
            </a>
          </div>

        </div>

      </div>
    </section><!-- #portfolio -->

    <!--==========================
      Team Section
    ============================-->
   <!-- #team -->

    <!--==========================
      Contact Section
    ============================-->
    <section id="contact">
      <div class="container wow fadeInUp">
        <div class="section-header">
          <h3 class="section-title">Contact</h3>
          <p class="section-description">Nous Contacte Facilement sur:</p>
        </div>
      </div>

     

      <div class="container wow fadeInUp mt-5">
        <div class="row justify-content-center">

          <div class="col-lg-3 col-md-4">

            <div class="info">
              <div>
                <i class="fa fa-map-marker"></i>
                <p>A108 Adam Street<br>New York, NY 535022</p>
              </div>

              <div>
                <i class="fa fa-envelope"></i>
                <p>info@example.com</p>
              </div>

              <div>
                <i class="fa fa-phone"></i>
                <p>+1 5589 55488 55s</p>
              </div>
            </div>

            <div class="social-links">
              <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
              <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
              <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
              <a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
              <a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
            </div>

          </div>

          <div class="col-lg-5 col-md-8">
            <div class="form">
              <div id="sendmessage">Your message has been sent. Thank you!</div>
              <div id="errormessage"></div>
              <form action="" method="post" role="form" class="contactForm">
                <div class="form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                  <div class="validation"></div>
                </div>
                <div class="text-center"><button type="submit">Send Message</button></div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section><!-- #contact -->

  </main>

  <!--==========================
    Footer
  ============================-->
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <P>Tel: 0635 463 007 / 0610 092 181</P>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>Team Dev HIMY</strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!--
          All the links in the footer should remain intact.
          You can delete the links only if you purchased the pro version.
          Licensing information: https://bootstrapmade.com/license/
          Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=Regna
        -->
        <!-- Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> -->
      </div>
    </div>
  </footer><!-- #footer -->

  <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>    
    </section>
</template>


<script>
import axios from 'axios'
// import dataToken from 'C:/sgc/sgc_access_cross.json'
// import jquery from 'jquery';
import Login from './components/Login.vue'
import { setTimeout } from 'timers';

export default {
  name: 'Home',
  components:{
      'login': Login
  },
  mounted(){
      // console.log(this.dataToken.key);
      this.dataToken = this.getCookie("accessToken");
      if(this.dataToken != null && this.dataToken != 'undefined' && this.dataToken != "")
      {
        this.isInServer();
      }
      else{
        this.isValide = false;
        this.show = false;
        this.isAuth = false;
        this.isUser = false;
        this.user = null;
      }
  },
  created(){

  },
  data() {
      return {
          // dataToken: dataToken,
          dataToken: '',
          isValide: false,
          isAuth: this.$auth.isAuthenticated(),
          show:false,
          isUser: this.$auth.haveUser(),
          user: this.$auth.getUserName()
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
  methods:{
    newLogin(){
      // setTimeout(() => {
      this.isAuth = true;
      this.isUser = this.$auth.haveUser();
      this.user = this.$auth.getUserName();
      // window.location.href = '/';
      // }, 1000);
    },
    logout(){
        this.$auth.destroyToken();
        this.isAuth = false;
      },
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    checkCookie(val) {
      var user = getCookie(val);
      if (user != "") {
        alert("Welcome again " + user);
      } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
          setCookie(val, user, 365);
        }
      }
    },
    uploadFile: function () {
      let files = this.$refs.fileInput.files[0];
      if(files != null)
      {
        $(".custom-file-label").addClass("selected").html(files.name);
      }
      let formData = new FormData();
      formData.append('fileJson', files);
      axios.post('/verify_file_token_server', formData, {headers: {'Content-Type': 'multipart/form-data'}} ).then(response => {
            var server = response.data;
            if(server !== null && server !== 'undefined' && server !== "")
            {
              this.setCookie('accessToken', server.key, 90);
              this.isValide = true;
              this.show = false;
            }
            else
            {
              this.isValide = false;
              this.show = false;
            }
          }, () => {
           
          });
    },  
    isInServer(){
      axios.post('/verify_token_server', {key: this.dataToken}).then(response => {
            var data = response.data;
           
            if(data !== null && data === 'exist'){
              this.isValide = true;
              this.show = false;
            }
            else{
              this.isValide = false;
              this.show = false;
              this.isAuth = false;
              this.isUser = false;
              this.user = null;
            }
          }, () => {
           
          });
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.div-log{
    width: 450px;
}
.input-log, .div-glb, .btn-stl {
    border: solid grey 2px;
    border-radius: 30px;
}
#home {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center;  */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>