export default function ({ $auth, redirect }) {
    let user = $auth.user;
    if ( user && user.isAdmin ){
      
    } else {
        redirect('/')
    }
}