<template>
    <div class="center" v-if="user_id<0">
        <button class="login" v-on:click="openLogin">Log In</button>
        <button class="signin" v-on:click="openSignIn">Sign In</button>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations}  from 'vuex'
import Swal from 'sweetalert2'
import crypto from 'crypto';
export default {
    name: "LogIn",
    computed:{
    ...mapState(['user_id'])
    },
    methods:{
        ...mapMutations(['logedIn']),
        ...mapActions(['getItems','getFolders','login', 'signIn']),
        openLogin(){
            Swal.fire({
                title: 'Login Form',
                html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
                <input type="password" id="password" class="swal2-input" placeholder="Password">`,
                confirmButtonText: 'Log In',
                focusConfirm: false,
                preConfirm: async () => {
                    const login = Swal.getPopup().querySelector('#login').value
                    const password = Swal.getPopup().querySelector('#password').value
                    if (!login || !password) {
                        Swal.showValidationMessage(`Please enter login and password`)
                    }else{
                        let hash = crypto.createHash('sha256').update(password).digest('hex');
                        console.log("🚀 ~ file: LogIn.vue ~ line 34 ~ preConfirm: ~ hash", hash)
                        let response = await this.login({username:login, password:hash})
                        if(response.result != 'connected'){
                            Swal.showValidationMessage(`Incorrect username or password`)
                        }else{
                            this.logedIn(response.id)
                            await this.getItems(response.id);
                            await this.getFolders(response.id);
                        }
                    }
                }
            })
        },
        openSignIn(){
            Swal.fire({
                title: 'Login Form',
                html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
                <input type="password" id="password" class="swal2-input" placeholder="Password"><input type="password" id="confirmation" class="swal2-input" placeholder="Confirm password">`,
                confirmButtonText: 'Log In',
                focusConfirm: false,
                preConfirm: async () => {
                    const login = Swal.getPopup().querySelector('#login').value
                    const password = Swal.getPopup().querySelector('#password').value
                    const confirmation = Swal.getPopup().querySelector('#confirmation').value
                    if (!login || !password || !confirmation) {
                        Swal.showValidationMessage(`Please enter all the required fields`)
                    }else if(password !== confirmation){
                        Swal.showValidationMessage(`Password dont match`)
                    } else {
                        let hash = crypto.createHash('sha256').update(password).digest('hex');
                        let response = await this.signIn({username:login, password:hash})
                        if(!response.insertId){
                            Swal.showValidationMessage(`Sorry, we have problems. Try again!`)
                        }else{
                            this.logedIn(response.insertId)
                            await this.getItems(response.insertId);
                            await this.getFolders(response.insertId);
                        }
                    }
                }
            })
        }
    },
};
</script>

<style scoped>
.center{
    text-align: center;
}
button{
    margin: 15px auto;
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
   display: block;
   cursor: pointer;
   text-align: center;
}
</style>
