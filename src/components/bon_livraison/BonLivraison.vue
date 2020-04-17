<template lang="html">

  <section class="bon-livraison text-warning bg-light align-middle ">
    <!-- <h1>Commande Client</h1> -->
    <router-view></router-view>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'BonLivraison',
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
  .bon-livraison{
      text-align: center;
  }
</style>
