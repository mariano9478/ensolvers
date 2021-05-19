<template>
  <div class="tree" v-if="user_id>-1">
    <ul id="myUL" v-for="folder in foldersItems" v-bind:key="folder.id">
      <li class="folder"><h3 class="caret" v-on:click="changeState($event)">{{folder.name}}<a href="#" class="close" tabindex="0" role="button" v-on:click="removeFolder(folder.id)">close</a></h3>
        <ul class="nested">
          <li v-for="item in folder.items" v-bind:key="item.id" v-on:dblclick="selectItem({text:item.text,folder:folder.id, id:item.id})">
            <input type="checkbox" v-on:change="checked($event, item.id)" :checked=item.complete>{{item.text}}
            <a href="#" class="close" tabindex="0" role="button" v-on:click="removeItem(item.id)">close</a>
            </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState}  from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: "itemsTree",
  computed:{
    ...mapState(['foldersItems','user_id'])
  },
  methods:{
    ...mapActions(['getItems','completeItem','getFolders','deleteItem', 'deleteFolder']),
    ...mapMutations(['selectItem']),
    async checked(e, id){
     await this.completeItem({state:e.target.checked, id})
     await this.getItems(this.user_id);
    },
    changeState: (e) => {
      e.target.classList.toggle('caret-down')
      e.target.parentElement.querySelector(".nested").classList.toggle("active");
    },
    removeItem(id){
      Swal.fire({
        title: 'Do you want delete this item?',
        showDenyButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then( async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await this.deleteItem({id})
          await this.getItems(this.user_id);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })

    },
    async removeFolder(id){
      Swal.fire({
        title: 'Do you want delete this item?',
        showDenyButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then( async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await this.deleteFolder({id})
          await this.getItems(this.user_id);
          await this.getFolders(this.user_id);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  },
};
</script>

<style scoped>
  ul, #myUL {
  list-style-type: none;
}

#myUL {
  margin: 0;
  padding: 0;
}
h3{
  position: relative;
}
.caret {
  cursor: pointer;
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  -ms-transform: rotate(90deg); /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari */
  transform: rotate(90deg);  
}
.tree{
  width:15em;
  margin: auto;
}
.nested {
  display: none;
  padding:0;
  text-align: left;
}
.folder > h3{
  padding:10px 5px;
  margin: 0;
}
.folder {
  background: #dadada;
  text-align: left;
}
.nested > li {
  padding: 10px 30px;
  background: #f0f0f0;
  width: 100%;
  position: relative;
}
.active {
  display: block;
}
.close {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 40px;
    height: 35px;
    font-size: 0;
}
.close:before, 
.close:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 12px;
    background-color: #ff6d6d;
    transform: rotate(45deg) translate(-50%, -50%);
    transform-origin: top left;
    content: '';
}
.close:after {
    transform: rotate(-45deg) translate(-50%, -50%);
}
</style>
