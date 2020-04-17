<template lang="html">

  <section class="categorie text-warning bg-light align-middle">
    <h1>Categorie</h1>
    <router-view></router-view>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'Categorie',
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

<style>
  .categorie {
    text-align: center;
  }
</style>
