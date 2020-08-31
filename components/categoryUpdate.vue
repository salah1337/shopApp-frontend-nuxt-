<template>
    <div>
      <div v-if="show" @click="show = !show" class="bg"></div>
      <div v-if="iconsPage == 0" @click="show = !show; getIcons()" style="cursor:pointer" class="status status-primary">
        <span>Update</span>
      </div>
      <div v-else @click="show = !show" style="cursor:pointer" class="status status-primary">
        <span>Update</span>
      </div>
      <div v-if="show" id="categoryform" class="container gridcenter">
           <div v-if="show" @click="show = !show" class="category-form-bg"></div>
          <div class="panel panel_content panel_submit">
        <div class="panel-header">
          <div class="panel-title">Update {{category.name}}</div>
        </div>
        <div @click="show = !show" class="panel-close">X</div>
        <div @click="updatecategory()" class="panel-submit">Confirm</div>
        <div class="panel-content">
          <div class="input-group icon-name gridcenter">
            <font-awesome-icon v-if="!previewIcon" class="icon-preview" :icon="category.icon"/>
            <font-awesome-icon v-else class="icon-preview" :icon="previewIcon"/>
            <br>
            <input placeholder="category name..." v-model="category.name" type="text" class="input input-form input-form2">
          </div>
           <div class="input-group">
            <label for="">icon:</label>
            <div class="icon-search">
              <input v-model="iconSearch" placeholder="icon name..." type="text" class="input input-form input-form2">
              <font-awesome-icon class="icons-search-button" @click="searchIcons()" icon="search"/>
              <font-awesome-icon class="icons-search-button" @click="clearIcons()" icon="times"/>
            </div>
            <div class="icons-select">
                <!-- <font-awesome-icon v-if="icon == category.icon" :title="icon" class="icon selectedIcon" v-for="icon in icons" :icon="icon"/> -->
                <font-awesome-icon :title="icon" @click="selectIcon(icon)" class="icon" v-for="icon in icons" :icon="icon"/>
                <div v-if="iconsCount > icons.length" @click="getIcons()" class="more-icons gridcenter">more icons</div>
                <div v-else class="nomore-icons gridcenter">no more icons left</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
    props: [
        'category'
    ],
  data() {
    return {
      previewIcon: '',
      show: false,
      errors: {},
      iconsPage: 0,
      icons: [],
      iconsCount: 0,
      iconSearch: '',
    }
  },
  mounted() {
    // this.getIcons()
  },
  methods: {
    async updatecategory() {
      await this.dbAction('post', `api/admin/product/category/update/${this.category.id}`, this.category, 'products/loadAll')
        .then(res => {this.show = false}).catch(err => console.log('fail'))
    },
    async getIcons() {
      this.iconsPage++
      let loader =  this.$loading.show()
      let res = (await this.$axios.get(`api/admin/product/category/icons/${this.iconsPage}`))
      this.icons = res.data.data.icons
      this.iconsCount = res.data.data.count
      loader.hide()
    },
    selectIcon(icon){
      this.previewIcon = icon
      this.category.icon = icon
    },
    async searchIcons() {
      let loader =  this.$loading.show()
      let res = (await this.$axios.get(`api/admin/product/category/iconsbyname/${this.iconSearch}`))
      this.icons = res.data.data.icons
      this.iconsCount = res.data.data.count
      loader.hide()
    },
    clearIcons() {
      this.iconSearch = ""
      this.iconsPage = 0
      this.getIcons()
    }
  }
}
</script>

<style lang="scss">
#categoryform{
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
    .category-form-bg{
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
.icons-select{
  margin-top: 5px;
  height: 100px;
  overflow-y: scroll;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 35px);
  .icon{
    height: 20px;
    width: 20px;
    color: var(--grayTxt);
    cursor: pointer;
    &:hover{
      color: var(--main);
    }
  }
}
.selectedIcon{
  color: var(--main) !important;
}
.more-icons{
  grid-column: auto / span 6;
  color: var(--grayTxt);
  cursor: pointer;
  &:hover{
    color: var(--main);
  }
}
.nomore-icons{
  grid-column: auto / span 6;
  color: var(--grayTxt);
}
.icons-search-button{
  cursor: pointer;
}
.icon-preview{
  height: 20px;
  width: 20px;
  font-size: calc(1rem + 1vw);
}
</style>