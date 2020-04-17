<template lang="html">

  <section class="commande text-warning bg-light align-middle ">
    <!-- <h1>Commande Client</h1> -->
    <router-view></router-view>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'Commande',
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
  .commande {
      text-align: center;
  }
</style>
