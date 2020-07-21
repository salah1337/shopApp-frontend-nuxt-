<template>
    <div id="admin-staff-tab" class="content">
      <div class="header">
        <div class="stats">
          <div class="panel panel_content">
            <div class="panel-header">
              <div class="panel-title">Stats</div>
            </div>
            <div class="panel-content">
              <div class="stat-rows">
                <div class="stat-row">
                  <div class="name">All</div>
                  <div class="name">100</div>
                </div>
                <div class="stat-row">
                  <div class="name">All</div>
                  <div class="name">100</div>
                </div>
                <div class="stat-row">
                  <div class="name">All</div>
                  <div class="name">100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <AddstaffForm :members="staff.staffMembers" :roles="roles" :users="users.users"/>
        </div>
      </div>
      <div class="list">
        <div class="staff-products-tab-panel panel panel_list">
          <div class="panel-header">
            <div class="panel-title">staff List</div>
            <div class="panel-description">Click the cards for more info.</div>
          </div>
            <div class="panel-search">
            <input v-model="searchField" placeholder="search by product name..." type="text" class="input input-form input-form2">
            <font-awesome-icon icon="times" class="clearSearch" @click="searchField = ''"/>
          </div>
          <div class="panel-list">
            <div class="list-head">
              <div class="main">
                <p>name</p>
              </div>
              <div class="others">
                <p>roles</p>
              </div>
            </div>
            <div class="list-items">
              <div v-for="member in staff.staffMembers" v-if="filterSearch(searchField, member.username)" :key="member.id" class="item">
                <p v-html="highlight(searchField, member.username)" class="main">{{member.username}}</p>
                <div class="others">
                  <div class="line list-item-abilities">
                    <div v-for="role in member.roles" :key="role.id">
                      {{role.label}}
                    </div>
                  </div>
                </div>
                <staffInfoPanel/>
                <AssignRoleMenu :member="member" :roles="roles.roles" class="roleManageMenu"/>
                <div @click="fireMember(member.id)" class="delete-staff">
                  <font-awesome-icon icon="trash"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import StaffInfoPanel from './StaffInfoPanel'
import AssignRoleMenu from './AssignRoleMenu'
import AddstaffForm from './AddstaffForm'

import { mapState } from 'vuex'

export default {
  data() {
    return{
      searchField: ''
    }
  },
    components:{
        StaffInfoPanel,
        AssignRoleMenu,
        AddstaffForm
    },
    computed: {
        ...mapState({
            staff: state => state.staff.staff,
            roles: state => state.roles.roles,
            users: state => state.users.users,
        }),
    },
    methods: {
      async fireMember(id){
       await this.dbAction('get', `api/admin/staff/fire/${id}`, null, 'staff/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
    }
}
</script>

<style lang="scss">
#admin-staff-tab {
  &.content {
    padding: 30px;
    display: grid;
    max-height: 100vh;
    overflow: overlay;
    overflow-y: scroll;

    .header {
      display: grid;
      grid-template-columns: 1fr 0.7fr;
      column-gap: 15px;
      height: 150px;
      margin-bottom: 8%;

      .stats {
        .panel {
          height: 100%;

          .panel-content {
            padding-bottom: 0px;

            .stat-rows {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
            }
          }
        }
      }

      .actions {
        display: grid;

        .action {
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

          .sign {
            font-size: calc(0.5vw + 1rem);
            font-weight: 600;
          }

          &:hover {
            background-color: var(--successHover);
          }

          &:active {
            box-shadow: 0px 1px 0px var(--successDark) !important;
            transform: translateY(3px);
            background-color: var(--successActive);
          }
        }
      }
    }

    .list {
      .staff-products-tab-panel {
        height: 100%;

        .panel-header {
          grid-column: auto / span 2;
        }

        .panel-search {
          input {
            width: 90%;
          }
        }
            .list-item-abilities{
        // max-height: 50px;
        // overflow-y: scroll;
        // overflow: overlay
        // direction: rtl;
    }
        .list-items {
          height: 50vh;

          .item {
            position: relative;
            .roleManageMenu {
              display: grid;
              justify-content: end;
            }
            height: fit-content;
            min-height: 75px;

            .ability-add-btn {
              text-align: right;

              .addabilitymenu-text,{
                cursor: pointer;
                padding: 1px;
                font-size: calc(0.7rem + 0.4vw);
              }

            }
          }
        }
      }
    }
  }

  .delete-staff {
    position: absolute;
    right: 10px;
    top: 10px;
    color: var(--danger);
    cursor: pointer;
  }

  @media (max-width: 700px) {
    #wrapper {
      // grid-template-columns: unset;
      display: flex;

      .content {
        margin: 0 auto;
        overflow: unset !important;
        // overflow-y: scroll;
      }
    }
  }
}
</style>