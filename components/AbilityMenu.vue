<template>
   <div>
     <div v-if="show" @click="show = !show" class="bg"></div>
     <div class="ability-add-btn" >
       <span @click="show = !show" class="status status-primary addabilitymenu-text">
          <font-awesome-icon icon="cog"/>
        </span>
      </div>
     <div v-if="show" id="addAbilityMenu" class="container gridcenter">
       <div v-if="show" @click="show = !show" class="ability-form-bg"></div>
       <div class="panel panel_list">
         <div class="panel-header">
           <div class="panel-title">{{role.name}}'s abilities</div>
         </div>
         <div class="panel-search">
            <input type="text" class="input input-form input-form2">
        </div>
         <div @click="show = !show" class="panel-close">X</div>
         <div class="panel-list">
           <div class="list-head">
             <div class="main">
               <p>Ability</p>
             </div>
             <div class="others">
               <p></p>
             </div>
           </div>
           <div class="list-items">
             <div v-for="ability in abilities" :key="ability.id" class=" item">
               <p class="main">{{ability.label}}</p>
               <div class="others">
                 <p v-if="roleHas(ability.name)" @click="revokeAbility(role.name, ability.name)" class="line status status-primary">revoke</p>
                 <p v-else @click="grantAbility(role.name, ability.name)" class="line status status-success">add</p>
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
    props: [ 'role', 'abilities'],
    data() {
        return{
            show: false,
            errors: {}
        }
    },
    methods: {
    async grantAbility(role, ability){
       await this.dbAction('post', `api/admin/roles/allow`, {role, ability}, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
    async revokeAbility(role, ability){
       await this.dbAction('post', `api/admin/roles/unallow`, {role, ability}, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     roleHas(name){
       return this.role.abilities.filter(ability_ => {
         return ability_.name == name 
       }).length > 0 ? true : false
     }
    }
}
</script>

<style lang="scss">
#addAbilityMenu{
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
    .ability-form-bg{
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