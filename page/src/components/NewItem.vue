<template>
  <div class="container" v-if="user_id>-1">
    <label for="name">Item name:</label>
    <input name="name" class="inputItem" type="text" v-model="updateItemName" placeholder="Item name">
    <label for="folders">Folder:</label>
    <select name="folders" id="folder" v-model="updateFolder">
        <option :value="undefined">None</option>
        <option value="-1">New Folder</option>
        <option :value="folder.id" v-for="folder in folders" v-bind:key="folder.id">{{folder.name}}</option>
    </select>
    <div class="center">
        <button class="edit" v-on:click="updateItemCall" v-if="edit">Save</button>
        <button class="add" v-on:click="newItem">Add</button>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions, mapMutations}  from 'vuex'
import Swal from 'sweetalert2'
export default {
    name: "NewItem",
    data(){
        return {updateItemName:'',
        updateFolder:''}
    },
    watch:{
    updateFolder: function(val){
        this.selectItem({text:this.itemName, folder:val})
        if(val == -1){
            Swal.fire({
                title: 'Create folder',
                html: `<input type="text" id="folder" class="swal2-input" placeholder="Folder">`,
                confirmButtonText: 'Create',
                focusConfirm: false,
                preConfirm: () => {
                    const folder = Swal.getPopup().querySelector('#folder').value
                    if (!folder) {
                    Swal.showValidationMessage(`Please enter a folder name`)
                    }
                    return { folder: folder}
                }
                }).then(async (result) => {
                    await this.addFolder({name:result.value.folder, user_id:this.user_id})
                    await this.getFolders(this.user_id);
                });
            }
        },
    updateItemName: function(val){
        this.selectItem({text:val, folder:this.selectedFolder})
    },
    selectedFolder: function(val){
        this.updateFolder=val
    },
    itemName:function(val){
        this.updateItemName=val
    }
    },
    computed:{
    ...mapState(['folders','selectedFolder','itemName','edit','user_id', 'selectedId'])
    },
    methods:{
        ...mapMutations(['selectItem','editFalse']),
        ...mapActions(['addItem','getItems','getFolders', 'addFolder','updateItem']),
        newItem: async function(){
            await this.addItem({text:this.itemName, folder_id:this.selectedFolder, user_id:this.user_id})
            this.selectItem({text:'', folder:-1})
            await this.getItems(this.user_id);
        },
        updateItemCall: async function(){
            await this.updateItem({text:this.itemName, folder_id:this.selectedFolder, id:this.selectedId })
            this.selectItem({text:'', folder:undefined})
            await this.getItems(this.user_id);
            this.editFalse()
        }
    },
};
</script>

<style scoped>
.container{
    width:15em;
    text-align: left;
    margin: auto;
}
label{
    display: block;
    text-align: left;
    margin:10px 0;
}
select{
    display: block;
    width: 100%;
    padding: 5px;
     font-size: 16px;
     border-width: 1px;
     border-color: #CCCCCC;
     background-color: #FFFFFF;
     color: #000000;
     border-style: solid;
     border-radius: 6px;
     box-shadow: 1px 2px 2px rgba(66,66,66,.53);
}
.inputItem{
    width: 100%;
    padding: 5px;
     font-size: 16px;
     border-width: 1px;
     border-color: #CCCCCC;
     background-color: #FFFFFF;
     color: #000000;
     border-style: solid;
     border-radius: 6px;
     box-shadow: 1px 2px 2px rgba(66,66,66,.53);
}
.inputItem:focus {
     outline:none;
}
.center{
    text-align: center;
}
button{
    margin:10px;
    width: 40%;
      -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius: 5px;
   padding:10px;
   font-size:1em;
   color: #FFFFFF;
   background-color: #2778c4;
   -webkit-box-shadow: 2px 2px 6px 1px #000000;
   -moz-box-shadow: 2px 2px 6px 1px #000000;
   box-shadow: 2px 2px 6px 1px #000000;
   border: solid #2778c4 1px;
   text-decoration: none;
   display: inline-block;
   cursor: pointer;
   text-align: center;
}
.save{
   border: solid #a5dc86 1px;
   background-color: #a5dc86;
}
</style>
