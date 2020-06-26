<template>
    <div class="nav-container">
       <div class="nav-body container">
            <div class="logo">
                <v-icon class="icon">store</v-icon>
                <h3 class="name">
                    <nuxt-link to="/">
                        chop<span>shop</span>
                    </nuxt-link>
                </h3>
            </div>
            <ul class="btns">
                <li v-if="!this.$auth.loggedIn" class="nav-btn"><LoginForm/></li>
                <li v-if="!this.$auth.loggedIn" class="nav-btn"><RegisterForm/></li>
                <v-icon class="nav-btn">search</v-icon>
                <CartDropdown class="nav-btn"/>
                <sideBar class="nav-btn"/>
            </ul>
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import CartDropdown from '../components/CartDropdown'
import sideBar from '../components/sideBar'

export default {
    components: {
        RegisterForm,
        LoginForm,
        CartDropdown,
        sideBar
    },
    computed: {
        ...mapState({
            cart: state => state.cart.cart,
        })
    },
    methods: {
        change(lang) {
            this.$i18n.setLocale(lang);
        },
        availableLocales () {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        },
        async logout() {
            let loader = this.$loading.show()
            await this.$store.dispatch('resetAll')
            await this.$auth.logout()
            loader.hide()
            this.notify([true, "Bye."])
        },
    }
}
</script>

<style lang="scss">
ul{
  margin: 0;
}
.nav-container{
    width: 100vw;
    height: 10vh;
    .nav-body, .logo, .btns{
        display: flex;
    }
    .nav-body, .btns{
        justify-content: space-between;
    }
    .nav-body{
        height: 100%;
        align-items: center;
    }
    .btns{
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
    .nav-btn p{
        color: var(--dark);
        font-weight: 600;
        text-shadow: 0px 4px 2px var(--main);
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
    .btns{
        width: 50% !important;
        li{
            // display: none;
        }
    }
}
</style>