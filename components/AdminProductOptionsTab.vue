<template>
    <div id="admin-categories-tab" class="content">
      <div class="header">
        <div class="searchBar gridcenter">
          <input type="text" placeholder="option name..." class="input input-form input-form2">
        </div>
    
        <div class="actions">
          <optionForm />
        </div>
      </div>
        <div class="preview">
            <div class="preview-content categories">
                <div v-for="group in products.optionGroups">
                  {{group.name}}
                  <div v-for="option in products.options" v-if="option.group.name == group.name">
                    {{option.name}}
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import optionForm from './optionForm'

import { mapState } from 'vuex'

export default {
    components:{
        optionForm,
    },
    computed: {
        ...mapState({
            products: state => state.products.allProducts,
        }),
    },
    methods: {
      async deleteoption(id){
       await this.dbAction('get', `api/admin/categories/delete/${id}`, null, 'categories/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
    }
}
</script>

<style lang="scss">
.categories{
    a{
        color: var(--grayTxt);
        &:hover{
            color: var(--main);
            text-decoration: none;
        }
    }
}
.optionCard{
    background-color: var(--gray);
    boption-radius: 8px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    align-items: center;
    height: 120px;
    text-align: center;
    cursor: pointer;
}
#admin-categories-tab {
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