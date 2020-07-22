<template>
<v-app class="content">
        <!-- <div id="adminProductTab" class="content"> -->
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
          <ProductForm class="product-form" />
          <AddFeaturedProduct :products="products.products" />
        </div>
      </div>
      <div class="list">
        <div class="staff-products-tab-panel panel panel_list">
          <div class="panel-header">
            <div class="panel-title">Products List</div>
            <div class="panel-description">Click the <font-awesome-icon icon="info-circle"/> to see more information</div>
          </div>
          <div class="panel-search">
            <input v-model="searchField" placeholder="search by product name..." type="text" class="input input-form input-form2">
            <font-awesome-icon icon="times" class="clearSearch" @click="searchField = ''"/>
          </div>
          <div class="panel-list">
            <div @click="refresh()" class="refresh">
              refresh
              <font-awesome-icon icon="sync"/>
            </div>
            <div class="list-head">
              <div class="main">
                <p>name</p>
              </div>
              <div class="others">
                <p>price</p>
                <p>stock</p>
                <p>status</p>
              </div>
            </div>
            <div class="list-items">
              <div v-for="product in products.products" v-if="filterSearch(searchField, product.name)" :key="product.id" class="item">
                <p class="main" v-html="highlight(searchField, product.name)">{{product.name}}</p>
                <div class="others">
                    <p class="line">{{product.price}}</p>
                    <p class="line">{{product.stock}}</p>
                    <div class="line">
                         <div class="status-switch" v-if="$auth.user.isAdmin" @click="toggleProductStatus(product.id)">
                           <!-- this is like this because when ":value="product.live"" doesn't work on first load -->
                             <v-switch
                             v-if="product.live"
                            :value="true"
                            ></v-switch>
                             <v-switch
                             v-else
                            :value="false"
                            ></v-switch>
                         </div>
                        <p v-if="product.live"  class="status status-success">Live</p>
                        <p v-else class="status status-primary">Unlisted</p>
                    </div>
                </div>
                <div></div>
                <StaffProductPanel class="product-info-btn" :product="product" />
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
</v-app>
</template>

<script>
import ProductForm from './StaffProductForm'
import StaffProductPanel from './StaffProductPanel'
import AddFeaturedProduct from './AddFeaturedProduct'

import { mapState } from 'vuex'

export default {
    data() {
      return{
        searchField:''
      }
    },
    components:{
        ProductForm,
        StaffProductPanel,
        AddFeaturedProduct,
    },
    computed: {
        ...mapState({
            products: state => state.products.products,
        }),
    },
    methods: {
        async toggleProductStatus(id){
            await this.dbAction('get', `api/product/togglestatus/${id}`, null, 'products/load')
            .then(reply => console.log('success')).catch(err => console.log('fail'))
        },
        async refresh(){
          let loader = this.$loading.show()
          await this.$store.dispatch('products/load')
          if (this.$auth.user.isAdmin) await this.$store.dispatch('products/loadAll')
          loader.hide()
        }
    }
}
</script>

<style lang="scss">
.product-form {
  z-index: 2;
}
.clearSearch, .refresh{
  color: var(--grayTxt);
  margin: auto;
  cursor: pointer;
}
.refresh{
  text-align: right;
  margin-bottom: 5px;
}
.product-info-btn {
  width: 100px;
  justify-self: flex-end;
}

.content {
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
        bProduct-radius: 2px;
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
      .list-items {
        height: 50vh;
        .item {
          height: fit-content;
        }
      }
    }
  }
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