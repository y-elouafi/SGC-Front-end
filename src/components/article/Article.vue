<template lang="html">

  <section class="article text-warning bg-light align-middle ">
    <h1>Article</h1>
    <router-view></router-view>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'Article',
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
  .article{
      text-align: center;
  }
</style>
