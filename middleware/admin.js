import axios from 'axios'
export default function ({ $auth, redirect }) {
    let user = $auth.user;
    if ( user && user.isStaff ){
        axios.get('api/admin')
        .then(res => {
          if (res.success && res.admin){

          }else{
            redirect('/')
          }
        })
    } else {
        redirect('/')
    }
}