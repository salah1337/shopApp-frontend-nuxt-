let rolesmixin = {
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
      },
}

export default {
  rolesmixin
}