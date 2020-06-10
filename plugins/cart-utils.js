import Vue from 'vue'

Vue.mixin({
    methods: {
        cartedit(action, id){
            let payload = {action, id}
            this.$store.dispatch('cart/edit', payload)
                .then(res => {
                  this.notify(res)
                })
          },
          cartclear(){
            this.$store.dispatch('cart/clear')
                .then(res => {
                  this.notify(res)
                })
          },
    }
})