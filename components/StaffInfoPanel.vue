<template>
    <div>
        lol
    </div>
</template>

<script>
export default {
    props: [
        'role',
        'abilities'
    ],
    data(){
        return{
            show: false
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss">

// .role-info-panel-bg{
//     position: fixed;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     background: rgba(0, 0, 0, 0.2);
// }
    .more-text{
        cursor: pointer;
        padding: 1px;
        font-size: calc(0.7rem + 0.4vw);
    }
.roleinfopanel{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    ul{
        list-style: none;
    }
    .rip-title{
        font-size: calc(0.9rem + 0.9vw);
    }
    .rip-staff-txt{
        font-size: calc(0.7rem + 0.7vw);
        color: var(--grayTxt);
    }
    .role-panel-close{
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: calc(1vw + 1rem);
        color: var(--primaryActive);
        cursor: pointer;
        font-weight: 700;
    }
    .role-info-panel-bg{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 998;
    }
   .role-info-panel{
        z-index: 999;
        max-height: 95vh;
        max-width: 95vw;
        min-height: 450px;
        min-width: 450px;
        overflow-y: scroll;
        display: grid;
        position: relative;
        grid-row-gap: 10px;
    .rip-btns{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        .rip-btn{
            height: 50px;
            width: 150px;
            margin: 2% 0;
            color: white;
            border-radius: 2px;
            cursor: pointer;
        }
        .rip-close{
            background: var(--danger);
            box-shadow: 0px 2px 0px var(--dangerDark);
            &:hover{
                background: var(--dangerHover);
            }
            &:active{
                background: var(--dangerActive);
                transform: translateY(2px);
                box-shadow: 0px 1px 0px var(--dangerDark);
            }
        }
    }
}
@media (max-width: 700px) {
    .rip-btns{
        flex-direction: unset !important;
        .rip-btn{
            margin: 0 2% !important;
        }
    }
}
}
</style>