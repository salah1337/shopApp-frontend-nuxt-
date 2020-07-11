<template>
    <div>
      <div v-if="show" @click="show = !show" class="bg"></div>
      <div @click="show = !show" class="action">
        <span>New Member</span> <span class="sign">+</span>
      </div>
      <div v-if="show" id="roleform" class="container gridcenter">
           <div v-if="show" @click="show = !show" class="role-form-bg"></div>
          <div class="panel panel_content panel_submit">
        <div class="panel-header">
          <div class="panel-title">Add new staff member</div>
        </div>
        <div @click="show = !show" class="panel-close">X</div>
        <div @click="assignRole(username, role)" class="panel-submit">Confirm</div>
        <div class="panel-content">
            <div class="searchBar gridcenter">
                <input type="text" class="input input-form input-form2" placeholder="username...">
            </div>
            <div class="user-list">
                <div v-if="!isStaff(user.username)" @click="username = user.username" v-for="user in users" :key="user.id">
                    
                    <div v-if="user.username == username" class="user-card clicked">
                        <img :src="`http://localhost:6969/storage/${user.image}`" alt="">
                        <h5>{{user.username}}</h5>
                    </div>
                    <div v-else class="user-card">
                        <img :src="`http://localhost:6969/storage/${user.image}`" alt="">
                        <h5>{{user.username}}</h5>
                    </div>
                </div>
            </div>
            <!-- <span v-if="errors[0]" class="error">{{errors[0].username}}</span> -->
            <div class="roleSelect">
                <h6>Chose a role:</h6>
                <select v-model="role" name="" id="">
                    <option selected disabled value="">Select role...</option>
                    <option v-for="role in roles.roles" :value="role.name" :key="role.id">
                        {{role.label}}
                    </option>
                </select>
            </div>
            <!-- <span v-if="errors[1]" class="error">{{errors[1].role}}</span> -->
        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  props: [ 'roles', 'users', 'members'],
  data() {
    return {
      username: '',
      role: '',
      show: false,
      errors: []
    }
  },
  methods: {
    async assignRole(username, role){
        this.errors = []
        if (this.username == '') {
            this.errors.push({'username':'please select a username'})
        }
        if (this.role == '') {
            this.errors.push({'role':'please select a role'})
        }
        if (this.errors.length == 0) {
            await this.dbAction('post', `api/admin/staff/assign`, {username, role}, 'staff/load')
            .then(reply => {
                this.username = this.role = ''
                this.show = false
            }).catch(err => console.log('fail'))
        }
     },
     isStaff(username){
         return this.members.filter(member => {
             return member.username == username
         }).length > 0 ? true : false
     }
  }
}
</script>

<style lang="scss">
#roleform{
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
          width: 400px;
          z-index: 999;
          // max-height: 95vh;
          max-width: 95vw;
          max-height: 95vh;
          display: grid;
          position: relative;
          overflow: overlay;
          overflow-y: scroll;
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
                display: grid;
                grid-row-gap: 15px;
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
.action{
    align-self: flex-start;
    justify-self: end;
    height: 100%;
    width: 100%;
    max-height: 45px;
    max-width: 150px;
    background-color: var(--success);
    box-shadow: 0px 2px 0px var(--successDark);
    border-radius: 2px;
    color: white;
    font-size: calc(0.4vw + 0.8rem);
    font-weight: 450;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sign{
        font-size: calc(0.5vw + 1rem);
        font-weight: 600;
    }
    &:hover{background-color: var(--successHover);}
    &:active{
        box-shadow: 0px 1px 0px var(--successDark) !important;
        transform: translateY(3px);
        background-color: var(--successActive);
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
.searchBar{
    width: 100%;
}
.user-list{
    max-height: 50vh;
    overflow-y: scroll;
    // overflow: overlay;
    display: grid;
    grid-row-gap: 5px;
    border-radius: 4px;
    .user-card{
        background: var(--gray);
        display: flex;
        align-items: center;
        padding: 10px;
        img{
            height: 35px;
            width: 35px;
            margin-right: 5px;
            border-radius: 100px;
        }
        h5{
            font-size: calc(0.7rem + 0.5vw);
        }
        &:hover{
            border: 2px solid var(--main);
            padding: 8px;
        }
        &:active{
            border: 4px solid var(--main);   
            padding: 6px;
        }
        &.clicked{
            border: 4px solid var(--main);   
            padding: 6px;
        }
    }
}
.roleSelect{
    select{
        background: var(--gray);
        width: 100%;
        border-radius: 4px;
        padding: 5px;
        &:focus{
            outline: var(--main) 2px solid;
            -moz-outline-radius: 4px;
        }
    }
}
</style>