import Vue from 'vue'

Vue.mixin({
    methods: {
      async cartedit(action, id, noNotifs, noLoader){
          let payload = {action, id}
          let loader;
          if(!noLoader) {loader = this.$loading.show()}
          await this.$store.dispatch('cart/edit', payload)
              .then(res => {
                if(!noLoader) loader.hide()
                if(!noNotifs) this.notify(res)
              })
          return
        },
      cartclear(noNotifs, noLoader){
        let loader;
        if(!noLoader) {loader = this.$loading.show()}
        this.$store.dispatch('cart/clear')
            .then(res => {
              if(!noLoader) loader.hide()
              if(!noNotifs) this.notify(res)
            })
      },
      cartHas(id){
        if (!this.cart.items) return false

        var found = false;
        for(var i = 0; i < this.cart.items.length; i++) {
            if (this.cart.items[i].product_id == id) {
                found = true;
            }
        }
        return found;
      }
    }
})