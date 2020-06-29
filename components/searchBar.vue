<template>

  <div v-if="$nuxt.$route.path != '/products'">
     <div @click="show = !show" class="popup-trigger">
        <v-icon class="nav-btn">fa fa-search</v-icon>
      </div>
      <div v-if="show" @click="show = !show" class="popup-bg"></div>
      <div v-if="show" class="popup-content searchpopup">
        <div class="panel panel_content panel_submit">
            <div class="panel-close"  @click="show = !show">X</div>
            <div class="panel-header">
                <div class="panel-title">Search products</div>
            </div>
            <div class="panel-content gridcenter">
                <input v-model="searchField" placeholder="product name..." type="text" class="input input-form input-form2">
            </div>
            <nuxt-link v-if="searchField" :to="`/products?s=${searchField}`">
                <div @click="search()" class="panel-submit">search</div>
            </nuxt-link>
        </div>
      </div>
  </div>

</template>

<style lang="scss">
.searchpopup{
    height: 200px;
    max-width: 450px;
    input{
        width: 250px;
    }
    .panel-header{
        grid-column: auto / span 2;
    }
}
</style>

<script>
export default{
    data() {
        return {
            show: false,
            searchField: ''
        }
    },
    methods: {
        search(){
            this.searchField = ''
            this.show = false
        }
    }
}
</script>