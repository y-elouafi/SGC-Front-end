<template lang="html">

  <section class="client text-warning bg-light align-middle ">
    <h1>Client</h1>
    <router-view></router-view>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'Client',
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
  .client {
      text-align: center;
  }
</style>
