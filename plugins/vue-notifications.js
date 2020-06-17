import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast'
import '~/assets/iziToast.css'


function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return iziToast[type]({title, message, timeout})
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
Vue.mixin({
    methods:{
        notify(args){
            this.showMessage({
                type: args[0] ? 'success' : 'warn',
                title: args[0] ? 'success' : 'failure',
                message: args[1]
            })
        }
    },
    notifications: {
        showMessage: {
          type: VueNotifications.types.success,
          title: 'Hello there',
          message: 'That\'s the success!'
        },
      }
})
Vue.use(VueNotifications, options)
