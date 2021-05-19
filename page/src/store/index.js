import { createStore } from "vuex";
const axios = require('axios')
export default createStore({
  state: {
    foldersItems:[], 
    folders:[],
    selectedFolder:null,
    itemName:null,
    edit:false,
    user_id:-1,
    selectedId:-1
  },
  mutations: {
    setFolders (state, listFolders) {
      state.folders = listFolders
    },
    logOut (state) {
      state.user_id = -1
    },
    logedIn(state,id){
      state.user_id=id
    },
    setItems (state, listItems) {
      let formatedItems=[]
      listItems.forEach(item => {
        let id = formatedItems.findIndex(folders => item.folder_id == folders.id)
        console.log(item)
        if(id>-1){
          formatedItems[id].items.push(item)
        }
        else{
          formatedItems.push({id:item.folder_id, name:item.name? item.name : "General", items:[item]})
        }
      });
      console.log("🚀 ~ file: index.js ~ line 31 ~ setItems ~ formatedItems", formatedItems)
      state.foldersItems = formatedItems
    },
    selectItem (state, values){
      state.selectedFolder=values.folder
      state.itemName = values.text
      state.edit=true
      state.selectedId = values.id? values.id:state.selectedId
    },
    editFalse(state){
      state.edit=false
    }
  },
  actions: {
    async addItem(context, item){
      console.log(item)
      await axios.post('http://localhost:3000/additem', item)
      context.commit('editFalse')
    },
    async updateItem(context, item){
      console.log(item)
      await axios.post('http://localhost:3000/updateitem', item)
    },
    async addFolder(context, folder){
      let response = await axios.post('http://localhost:3000/addfolder', folder)
      console.log(response)
    },
    async getItems(context, id){
      let response = await axios.get('http://localhost:3000/items', { params: {id} })
      context.commit('setItems', response.data)

    },
    async getFolders(context, id){
      let response = await axios.get('http://localhost:3000/folders', { params: {id} })
      context.commit('setFolders', response.data)

    },
    async completeItem(context, state){
      await axios.post('http://localhost:3000/checkitem', state)
    },
    async deleteItem(context, id){
      await axios.post('http://localhost:3000/delitem', id)
    },
    async deleteFolder(context, id){
      await axios.post('http://localhost:3000/delfolder', id)
    },
    async login(context, user){
      let response = await axios.post('http://localhost:3000/login', user)
      return response.data
    },
    async signIn(context, user){
      let response = await axios.post('http://localhost:3000/adduser', user)
      return response.data
    }
  },
  modules: {
    
  },
});
