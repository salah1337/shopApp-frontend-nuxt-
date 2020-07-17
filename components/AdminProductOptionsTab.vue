<template>
    <div id="admin-options-tab" class="content">
      <div class="header">
        <div class="searchBar gridcenter">
          <input type="text" placeholder="option name..." class="input input-form input-form2">
        </div>
    
        <div class="actions">
          <optionForm />
          <optionGroupForm />
        </div>
      </div>
        <div class="optionGroups">
          <div class="option-group" v-for="(group, index) in products.optionGroups">
            <div class="group-header">
              <p class="group-name">{{group.name}}</p>
              <font-awesome-icon @click="deleteOptionGroup(group.id)" class="group-delete" icon="trash"/>
            </div>
            <div v-if="showOptions[index]" class="options">
              <div class="option" v-for="option in products.options" v-if="option.group.name == group.name">
                <p class="option-name">{{option.name}}</p>
                <font-awesome-icon @click="deleteOption(option.id)" class="option-delete" icon="times"/>
              </div>
            </div>
            <div class="toggleOptions" v-if="!showOptions[index]" @click="toggleOptions(index)">
              <font-awesome-icon icon="chevron-down"/>
            </div>
            <div class="toggleOptions" v-else @click="toggleOptions(index)">
              <font-awesome-icon icon="chevron-up"/>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import optionForm from './optionForm'
import optionGroupForm from './optionGroupForm'

import { mapState } from 'vuex'

export default {
    data(){
      return{
        showOptions: []
      }
    },
    components:{
        optionForm,
        optionGroupForm
    },
    computed: {
        ...mapState({
            products: state => state.products.allProducts,
        }),
    },
    mounted(){
      for (let i = 0; i < this.products.optionGroups.length; i++) {
      // this.itemOptions[i] = this.cart.items.options
      this.$set(this.showOptions, i, false)
    }
    },
    methods: {
      async deleteOptionGroup(id){
       await this.dbAction('get', `api/admin/product/option/group/remove/${id}`, null, 'products/loadAll')
        .then(res => console.log('success')).catch(err => console.log('fail'))
     },
      async deleteOption(id){
       await this.dbAction('get', `api/admin/product/option/remove/${id}`, null, 'products/load')
        .then(res => console.log('success')).catch(err => console.log('fail'))
     },
      toggleOptions(i){
      this.$set(this.showOptions, i, !this.showOptions[i])
    }
    }
}
</script>

<style lang="scss">
p{
  margin-bottom: 0;
}
  .toggleOptions{
    text-align: center;
  }
.optionGroups{
    a{
        color: var(--grayTxt);
        &:hover{
            color: var(--main);
            text-decoration: none;
        }
    }
    display: grid;
    row-gap: 10px;
    .option-group{
      background: var(--gray);
      padding: 5px;
      border-radius: 4px;
      &:hover{
        .group-delete{
          color: var(--danger);
        }
        .option{
          .option-name{
            color: var(--mainDark);
             font-weight: 500;
          }
          .option-delete{
            color: var(--dangerHover);
          }
          &:hover{
            padding: 3px;
            border: 1px solid var(--main);
            box-shadow: 0px 0px 1px var(--gray);
           .option-name{
            color: var(--main);
             font-weight: 800;
          }
          .option-delete{
            color: var(--danger);
            cursor: pointer;
          } 
          }
        }
      }
    }
    
    .group-header, .option{
      display: flex;
      justify-content: space-between;
    }
    .group-delete{
      color: var(--grayTxt);
      cursor: pointer;
    }
    .option-delete{
      color: var(--grayTxt);
      align-self: center;
    }
    .group-name{
      font-size: calc(1rem + 0.5vh);
      font-weight: 800;
    }
    .options{
      display: grid;
      padding: 5px;
      grid-row-gap: 4px;
      border-radius: 4px;
      max-height: 40vh;
      overflow-y: scroll;
      overflow: overlay;
      background: white;
    }
    .option{
      background: var(--gray);
      color: var(--grayTxt);
      height: 30px;
      padding: 4px;
      border-radius: 4px;
        &:hover{
        .option-delete{
          color: var(--danger);
        }
      }
    }
}
.optionCard{
    background-color: var(--gray);
    border-radius: 8px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    align-items: center;
    height: 120px;
    text-align: center;
    cursor: pointer;
}
#admin-options-tab {
  &.content {
    padding: 30px;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: overlay;
    overflow-y: scroll;

    .header {
      display: grid;

      column-gap: 15px;
      height: fit-content;
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
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 5px;
        .action {
          align-self: flex-start;
          justify-self: end;
          height: 100%;
          width: 100%;
          max-height: 45px;
          max-width: 150px;
          background-color: var(--success);
          box-shadow: 0px 2px 0px var(--successDark);
          boption-radius: 2px;
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
          max-height: 50vh;

          .item {
            position: relative;

            // .abilityadditem {
            //   grid-column: auto / span 2;
            // }

            height: fit-content;

            .ability-add-btn {
              text-align: right;

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

  .delete-option {
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

</style>