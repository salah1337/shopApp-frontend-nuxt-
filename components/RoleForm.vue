<template>
    <div>
      <div v-if="show" @click="show = !show" class="bg"></div>
      <div @click="show = !show" class="action">
        <span>Add role</span> <span class="sign">+</span>
      </div>
      <div v-if="show" id="roleform" class="container gridcenter">
           <div v-if="show" @click="show = !show" class="role-form-bg"></div>
          <div class="panel panel_content panel_submit">
        <div class="panel-header">
          <div class="panel-title">Create New Role</div>
        </div>
        <div @click="show = !show" class="panel-close">X</div>
        <div @click="createRole()" class="panel-submit">Confirm</div>
        <div class="panel-content">
          <div class="input-group">
            <label for="">Name:</label>
            <input v-model="role.name" type="text" class="input input-form input-form2">
          </div>
          <div class="input-group">
            <label for="">Label:</label>
            <input v-model="role.label" type="text" class="input input-form input-form2">
            <span class="input-description">the label is what is displayed on the client side, doesn’t have to be unique, doesn’t affect back end</span>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      role: {
        name: '',
        label: ''
      },
      show: false,
      errors: {}
    }
  },
  methods: {
    async createRole() {
      await this.dbAction('post', `api/admin/roles/add`, this.role, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
    },
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
</style>