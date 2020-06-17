import Vue from 'vue'

Vue.mixin({
    methods: {
        cartedit(action, id, noNotifs, noLoader){
            let payload = {action, id}
            let loader;
            if(!noLoader) {loader = this.$loading.show()}
            this.$store.dispatch('cart/edit', payload)
                .then(res => {
                  if(!noLoader) loader.hide()
                  if(!noNotifs) this.notify(res)
                })
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
    }
})