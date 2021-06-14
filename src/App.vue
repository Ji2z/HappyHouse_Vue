<template>
  <div id="app">
    <Header/>
    
     <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/include/Header.vue";

export default {
   name: 'App',
   components: {
       Header,
   },
   computed: {

   }
};
</script>

<style>
@import './css/text.css';
@import './css/customTag.css';
body {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  height : 100vw;
}
</style>
