import Vue from 'vue'

Vue.mixin({
    methods: {
        async dbAction(method, url, data, reload, noNotif) {
            console.log(`method:--${method}`);
            console.log(`url:--${url}`);
            console.log(`data:--${data}`);
            console.log(`reload:--${reload}`);
            let reply;
            let res = await this.$axios({ method: method, url: url, data: data })
            .then(async res => {
                  if (reload) await this.$store.dispatch(reload)
                  if (!noNotif) this.notify([res.data.success, res.data.data.message])
                  return  res.data;
            },async err => {
                const errCodes = [404, 422, 403]
                if ( errCodes.indexOf(err.response.status) !== -1 ){
                  if (reload) await this.$store.dispatch(reload)
                    let message = err.response.status == 422 
                                ? err.response.data.message
                                : err.response.data.data.message;
                  
                    let errors = err.response.status == 422 
                                ? err.response.data.errors
                                : err.response.data.data.erroprs;

                  if (!noNotif) this.notify([false, message])
                  this.errors = errors
                }
                else{
                if (reload) await this.$store.dispatch(reload)
                console.log(err.response);
                
                  this.notify([false, "Something went wrong :O, contact us"])
                }
                throw  JSON.stringify(err.response.data);
            })
            return JSON.stringify(res);
        },
    }
})