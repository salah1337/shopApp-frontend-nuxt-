export default function ({ $auth, redirect }) {
    let user = $auth.user;
    if ( user && user.isStaff ){

    } else {
        redirect('/')
    }
}