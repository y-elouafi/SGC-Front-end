<template lang="html">
<Form @submit.prevent="">
    <div class="col div-glb">
        <div class="col form-group div-log text-center"  >
            <label><strong></strong></label>
            <input type="text" class="form-control input-log" placeholder="Email" v-model="email">
        </div>
        <div class="col form-group div-log text-center"  >
            <label><strong></strong></label>
            <input type="password" class="form-control input-log" placeholder="******" v-model="password">
        </div>
        <div class="col form-group">
            <button class="btn btn-stl text-light" @click="login"><em>Login</em></button>
        </div>
    </div>



</Form>
    
</template>

<script lang="js">
import axios from 'axios'

    export default {
    name: 'Login',
    mounted(){
        // axios.get('/user').then(response => {
        //         console.log(response.data + ' ...');
        //     }, () => {
           
        //     });
    },
    data(){
        return{
            email:'',
            password: '',
        }
    },
    methods: {
        login(){
            var data = {
                client_id:2,
                client_secret:"bPSvlXf2zcXRS95AxDl7och10ClY61hXyUIQ9KvT",
                grant_type:"password",
                username:this.email,  
                password:this.password
            }
            axios.post('../oauth/token', data).then(response => {
                this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now());
                axios.defaults.headers.common = {
                    'Authorization': 'Bearer '+ response.data.access_token
                };
                axios.get('/user', {headers: {"Authorization" : 'Bearer '+response.data.access_token}}).then(r => {
                    this.$auth.setUserName(r.data.name);
                    this.$auth.setUserId(r.data.id);
                    this.$emit('newLog', true);
                    }, () => {
                
                });
                this.$emit('log', true);
            }, () => {
           
            });
            
        }
    }

}


</script>
<style>
.div-log {
  width: 450px;
}
.input-log,
.div-glb,
.btn-stl {
  border: solid grey 2px;
  border-radius: 30px;
}
.btn-stl {
  width: 130px;
  font-size: 1.2em;
}
</style>

