<template>
  <div id="grid">
      <ul class="menu">
        <h3>Hello {{$auth.user.info.username}}</h3>
        <li class="trigger">Manage Roles</li>
        <li class="trigger">Manage Staff</li>
        <li class="trigger">Manage Products</li>
        <li class="trigger">Manage Orders</li>
      </ul>
      <div class="panels">
        <div class="panel">
          <h2>Roles</h2>
          <ul>
            <h3>There are {{roles.count}} roles.</h3>
            <li v-for="role in roles.roles" :key="role.id">
              <h3>{{ role.label }}--- <span @click="deleteRole(role.id)"> [delete] </span> </h3> 
              <ul v-if="role.abilities.length > 0">
                <h4>Can:</h4>
                <li v-for="ability in role.abilities" :key="ability.id">
                  {{ ability.label }} <span @click="removeAbility(role.name, ability.name)"> [remove] </span>
                </li>
              </ul>
              <select v-model="ability" name="abilitites">
                <option v-for="ability in abilities.abilities" :key="ability.id" :value="ability.name">
                  {{ability.label}}
                </option>
              </select>
              <v-btn @click="grantAbility(role.name)" x-small>
                allow to
              </v-btn>
            </li>
          </ul>
          <br/>
          <div>
            <label for="">Label</label>
            <input v-model="role.label" type="text">
          </div>
          <div>
            <label for="">Name</label>
            <input v-model="role.name" type="text">
          </div>
          <v-btn @click="createRole()">
            Add Role
          </v-btn>
        </div>
        <div class="panel">
          <h2>Staff</h2>
          <ul>
            <h3>There are {{staff.staffCount}} staff members.</h3>
            <li v-for="members in staff.staff" :key="members.name">
              <h4>{{members.name}}</h4>
              <ul>
                <li v-for="member in members.users" :key="member">
                  {{member}} <span @click="revokeRole(member, members.name)">[revoke role]</span>
                </li>
              </ul>
              <br/>
              <br/>
            </li>
          </ul>
          <input v-model="user" type="text">
          <select v-model="roleToAssign" name="roles">
            <option v-for="role in roles.roles" :key="role.id" :value="role.name">
              {{role.label}}
            </option>
          </select>
          <v-btn @click="assignRole(user, roleToAssign)"> assign role to user </v-btn>
        </div>
        <div class="panel">
          <h2>Products</h2>
          <ul>
            <h3>There are {{products.count}} products.</h3>
            <li v-for="product in products.products" :key="product.id">
              <h4>{{product.name}}</h4>
              <ul>
                <li v-for="option in product.options" :key="option.id">
                  {{option.name}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="panel">
          <h2>Orders</h2>
          <ul>
            <h3>There are {{orders.count}} orders.</h3>
            <li v-for="order in orders.orders" :key="order.id">
              <h4>{{order.shipName}}</h4>
              <ul>
                <li v-for="detail in order.details" :key="detail.id">
                  {{detail.name}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   data(){
     return{
       role: {
         label: '',
         name: ''
       },
       ability: '',
       user:'',
       roleToAssign: ''
     }
   },
   methods: {
     async createRole(){
       await this.dbAction('post', `api/admin/roles/add`, this.role, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async deleteRole(id){
       await this.dbAction('get', `api/admin/roles/delete/${id}`, null, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async grantAbility(role){
       let ability = this.ability
       await this.dbAction('post', `api/admin/roles/allow`, {role, ability}, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async removeAbility(role, ability){
       await this.dbAction('post', `api/admin/roles/unallow`, {role, ability}, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },


     async assignRole(username, role){
        await this.dbAction('post', `api/admin/staff/assign`, {username, role}, 'staff/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async revokeRole(username, role){
        await this.dbAction('post', `api/admin/staff/revoke`, {username, role}, 'staff/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
   },
 computed: {
   ...mapState({
      roles: state => state.roles.roles,
      abilities: state => state.roles.abilities,
      staff: state => state.staff.staff,
      products: state => state.products.allProducts,
      orders: state => state.orders.allOrders,
    }),
   navigate(){
     let triggers = document.querySelectorAll('.trigger')
     let panels = document.querySelectorAll('.panel')
     triggers.forEach((trigger, i) => {
       trigger.addEventListener('click', function(){
         panels.forEach(panel => {
           panel.style.display = 'none'
         })
         panels[i].style.display = 'block'
       })
     });
   }
 }
}
</script>

<style lang="scss">
select{
  color: black;
  background: white;
}
  #grid {
    display: grid;
    grid-template-columns: 30% 1fr;
    height: 100vh;
    .menu{
      background: rgb(169, 169, 169);
    }
    .panels{
      background: #232323;
      color: white;
      .panel{
        display: none;
      }
    }
  }
  .menu{
    padding: 5px;
    text-align: center;
    .trigger{
      margin: 5px 0;
      border: 1px white solid;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: black;
      font-size: x-large;
      &:hover{
        background: gray;
      }
      &:active{
        background: rgb(106, 106, 106);
      }
    }
  }
  .panels{
    padding: 15px;
  }
</style>