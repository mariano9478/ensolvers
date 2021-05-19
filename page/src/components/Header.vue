<template>
    <div class="header"><h1>Ensolvers Exercise</h1> <button v-if="user_id>-1" v-on:click="logOut">Log Out</button></div>
</template>

<script>
import {mapMutations, mapState}  from 'vuex'

export default {
  name: "Header",
  computed:{
    ...mapState(['user_id'])
  },
  methods:{
    ...mapMutations(['logOut'])
  }
}
</script>

<style scoped>
 .header{
  width: 100%;
  height: 3em;
  background: #6e7d88;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
}
.header > h1{
  text-align: left;
  margin: auto;
  width: inherit;
  padding: 0 10px;
  color:#fff;
}
button{
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 5px;
    padding: 6px;
    width: 6em;
    margin-right: 20px;
    font-size: 1em;
    color: #FFFFFF;
    background-color: #ea5455;
    -webkit-box-shadow: 1px 1px 4px 1px #000000;
    -moz-box-shadow: 1px 1px 4px 1px #000000;
    box-shadow: 1px 1px 4px 1px #000000;
    border: solid #ea5455 1px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    text-align: center;
}
</style>
