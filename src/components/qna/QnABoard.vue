<template>
     <div id="app">
        <Header/>
        <Dropdown/>
        <br><br><br>
        <h1>QnA</h1>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "../components/include/Header.vue";
import Dropdown from "../components/include/Dropdown.vue";

export default {
   name: 'App',
   components: {
       Header,
      Dropdown,
   },
   computed: {

   }
};
</script>

<style scoped>
h1{
    margin-left: 30px;
}
</style>