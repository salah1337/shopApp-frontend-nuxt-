import loader from "../utils/loader";

export default async function({$auth, store, from}){
    let isInitialPageLoad = !from;
    let user = $auth.user;

    if(isInitialPageLoad){
      await loader(user, store)
    }
  } 
