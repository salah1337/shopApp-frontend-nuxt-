<template>
  <div>
    <h1>Staff List: // {{data.roleCount}} Roles & {{data.staffCount}} Staff Members</h1>
    <div v-for="role in data.staff" :key="role.count">      
        <h4>
            {{role.name}} // {{role.count}}
        </h4>
        <ul>
            <li v-for="user in role.users" :key="user.id">
                {{ user }}
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
        data:""
        }
    },
    async asyncData({ $axios, params }){
        let res = await $axios.get('api/admin/staff')
        let data = res.data.data
        return {
            data
        }
    }
}
</script>
