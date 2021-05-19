<template>
  <div class="wrapper">
    <Header></Header>
    <h1>ToDo List</h1>
    <LogIn></LogIn>
    <itemsTree></itemsTree>
    <NewItem></NewItem>
  </div>
</template>

<script>
import itemsTree from "./components/itemsTree.vue";
import NewItem from "./components/NewItem.vue";
import LogIn from "./components/LogIn.vue";
import Header from "./components/Header.vue";

export default {
  components: {
    itemsTree,
    NewItem,
    LogIn,
    Header
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #eee;
  height: 100vh;
  width: 100%;
  margin: auto;
}
*{
  webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;   
  margin:0;      /* Opera/IE 8+ */
}
h1{
  margin:20px;
}
.wrapper{
  text-align: center;
}

</style>
