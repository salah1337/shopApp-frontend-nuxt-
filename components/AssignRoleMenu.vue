<template>
   <div>
     <div v-if="show" @click="show = !show" class="bg"></div>
     <div class="role-add-btn" >
       <span @click="show = !show" class="status status-primary addrolemenu-text">
         Manage roles
        </span>
      </div>
     <div v-if="show" id="addroleMenu" class="container gridcenter">
       <div v-if="show" @click="show = !show" class="role-form-bg"></div>
       <div class="panel panel_list">
         <div class="panel-header">
           <div class="panel-title">Grant role</div>
         </div>
         <div class="panel-search">
            <input type="text" class="input input-form input-form2">
        </div>
         <div @click="show = !show" class="panel-close">X</div>
         <div class="panel-list">
           <div class="list-head">
             <div class="main">
               <p>role</p>
             </div>
             <div class="others">
               <p></p>
             </div>
           </div>
           <div class="list-items">
             <div v-for="role in roles" :key="role.id" class=" item">
               <p class="main">{{role.label}}</p>
               <div class="others">
                 <p v-if="memberHas(role.name)" @click="revokeRole(member.username, role.name)" class="line status status-primary">revoke</p>
                 <p v-else @click="assignRole(member.username, role.name)" class="line status status-success">add</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: [ 'member', 'roles'],
    data() {
        return{
            show: false,
            errors: {}
        }
    },
    methods: {
    async assignRole(username, role){
        await this.dbAction('post', `api/admin/staff/assign`, {username, role}, 'staff/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async revokeRole(username, role){
        await this.dbAction('post', `api/admin/staff/revoke`, {username, role}, 'staff/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     memberHas(name){
       return this.member.roles.filter(role_ => {
         return role_.name == name 
       }).length > 0 ? true : false
     }
    }
}
</script>

<style lang="scss">
#addroleMenu{
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    .panel-submit{
      margin-bottom: 5%;
    }
    .panel-close{
        position: absolute;
        top: 10px;
        right: 10px;
        height: 35px;
        width: 35px;
    }
    .role-form-bg{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 998;
    }

        .panel {
          min-height: 400px;
          width: 600px;
          z-index: 999;
          // max-height: 95vh;
          max-width: 95vw;
          display: grid;
          position: relative;
          .panel-header{
              grid-column: auto / span 2;
          }
          &.panel_content {
            grid-template-rows: none;
            .panel-content, .panel-content .input-group{
                display: flex;
                flex-direction: column;
            }
            .panel-content{
                .input-group{
                    max-width: 250px;
                    .input-description{
                        color: var(--grayTxt);
                        font-size: calc(0.65rem + 0.1vw);
                        text-transform: capitalize;
                    }
                }
            }
            // height: 100%;
          }
        }
}
.bg{
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    left: 0;
}
</style>