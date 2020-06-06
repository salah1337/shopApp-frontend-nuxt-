<template>
  <div>
      <h1>Roles // {{ data.count }}</h1>
      <div v-for="role in data.roles" :key="role.id" >
          <h4>
              {{ role.name }} // {{ role.label }} <br/>
              {{ role.userCount }}
          </h4>
          <ul>
              <h5>Abilities:</h5>
              <li v-for="ability in role.abilities" :key="ability.id">
                  {{ ability.name }}
              </li>
          </ul>
          <br/>
          <br/>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            data:"",
        }
    },
    async asyncData({ $axios, params }){
        let res = await $axios.get('api/admin/roles')
        let data = res.data.data
        return {
            data
        }
    }
}
</script>
