<template>
    <div v-if="$nuxt.$route.path != '/admin' && $nuxt.$route.path != '/staff'" id="nav" class="nav-container">
       <div class="nav-body container">
            <div class="logo">
                <v-icon class="icon">fa-shopping-basket</v-icon>
                <h3 class="name">
                    <nuxt-link to="/">
                        chop<span>shop</span>
                    </nuxt-link>
                </h3>
            </div>
            <ul class="nav-btns">
                <searchBar class="nav-btn gridcenter"/>
                <CartDropdown v-if="this.$auth.loggedIn" class="nav-btn"/>
                <nuxt-link v-else to="/register">
                    <v-icon class="nav-btn">fa fa-shopping-cart</v-icon>
                </nuxt-link>
                <sideBar v-if="this.$auth.loggedIn" class="nav-btn"/>
                <LoginModal v-else class="nav-btn"/>
            </ul>
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import RegisterModal from '../components/RegisterModal'
import LoginModal from '../components/LoginModal'
import CartDropdown from '../components/CartDropdown'
import sideBar from '../components/sideBar'
import searchBar from '../components/searchBar'

export default {
    components: {
        RegisterModal,
        LoginModal,
        CartDropdown,
        sideBar,
        searchBar
    },
    computed: {
        ...mapState({
            cart: state => state.cart.cart,
        })
    },
    mounted() {
        // this.watchscroll()
    },
    methods: {
        change(lang) {
            this.$i18n.setLocale(lang);
        },
        availableLocales () {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        },
        watchscroll() {
            window.addEventListener('scroll', ()=>{
                if (window.scrollY > 0) {
                   document.getElementById('nav').style.position = 'fixed'
                }else{
                   document.getElementById('nav').style.position = 'static'
                }
            })
        }
    }
}
</script>

<style lang="scss">
#loginForm{

}
ul{
  margin: 0;
}
.nav-container{
    z-index: 995;
    background: white;
    width: 100vw;
    height: 10vh;
    .nav-body, .logo, .nav-btns{
        display: flex;
    }
    .nav-body, .nav-btns{
        justify-content: space-between;
    }
    .nav-body{
        height: 100%;
        align-items: center;
    }
    .nav-btns{

        width: 70%;
        max-width: 200px;
        list-style: none;
        li{
            text-transform: capitalize;
        }
        .btn-secondary{
            color: unset;
            background-color: unset;
            border-color: unset;
        }
    }
    .nav-btn{
        p{
        color: var(--dark);
        font-weight: 600;
        text-shadow: 0px 4px 2px var(--main);
        }
        cursor: pointer;
    }
    .logo{
        display: flex;
        color: var(--grayTxt);
        .name{
            align-self: flex-end;
            font-size: calc(0.8vw + 0.8rem);
            font-weight: 600;
            a {
                color: var(--grayTxt);
                &:hover{
                    text-decoration: none !important;
                }
            }
            span{
                color: var(--main);
                font-size: calc(1vw + 1rem);
                font-weight: 800;
                text-shadow: -2px 2px 2px var(--gray);
            }
        }
        .icon{
            font-size: calc(2vw + 2rem);
        }
    }
}
@media (max-width: 700px){
    .nav-btns{
        width: 50% !important;
        li{
            // display: none;
        }
    }
}
</style>