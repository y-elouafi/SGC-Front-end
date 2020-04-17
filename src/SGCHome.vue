<template lang="html">

  <section class="sgc-home row justify-content-center">
    <div class="col">
    <h1 class="text-primary"> <img src="./assets/img/bienvenue.jpg" class="img"> To</h1>
    <!-- <h1 class="text-primary">to</h1> -->
    <div class="">
      <img src="./assets/img/logo_sgc.png" class="imgsgc">
    </div>
    
    </div>
    
  </section>

</template>

<script lang="js">
  export default  {
    name: 'SGCHome',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style >
  .sgc-home {
      /* // margin-top:-15px; */
      text-align: center;
  }
  .img{
    /* // height: 140px; */
  }
  .imgsgc{
    /* // height: 190px; */
  }
</style>
