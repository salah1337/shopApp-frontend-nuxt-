import Vue from 'vue'

Vue.mixin({
    methods: {
        async dbAction(url, data, reload) {
            console.log(`url:--${url}`);
            console.log(`data:--${data}`);
            console.log(`reload:--${reload}`);
            
            let res = await this.$axios.get(url, data)
            .then(async res => {
                  if (reload) await this.$store.dispatch(reload)
                  this.notify([res.data.success, res.data.data.message])
            },async err => {
                console.log(err.response)
                const errCodes = [404, 422, 403]
                if ( errCodes.indexOf(err.response.status) !== -1 ){
                  if (reload) await this.$store.dispatch(reload)
                  this.notify([false, err.response.data.data.message])
                  this.errors = err.response.data.data.errors
                }
                else{
                if (reload) await this.$store.dispatch(reload)
                  this.notify([false, "Something went wrong :O, contact us"])
                }
            })
        },
    }
})