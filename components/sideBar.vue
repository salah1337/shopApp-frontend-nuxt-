<template>
  <div>
    <b-button v-b-toggle.sidebar-menu>
        <v-icon>menu</v-icon>
    </b-button>
    <b-sidebar id="sidebar-menu" right backdrop shadow>
        <ul class="">
            <li class="col-12">Item</li>
            <li class="col-12">Item</li>
            <li class="col-12">Item</li>
        </ul>
        <template v-slot:footer="{ hide }">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
            <b-button id="logoutbtn" size="sm" @click="hide">Logout</b-button>
        </div>
        </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  computed: {

  },
}
</script>

<style lang="scss">
#logoutbtn{
    background: var(--danger);
    border: none;
    box-shadow: 0px 1px 0px var(--dangerDark);
    &:hover{
        background: var(--dangerHover);
    }
    &:active{
        background: var(--dangerActive);
    }
}
</style>