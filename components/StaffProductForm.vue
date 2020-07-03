<template>
    <div>
        <div v-if="show" @click="show = !show" class="bg"></div>
        <div @click="show = !show" class="action">
            <span>Add product</span> <span class="sign">+</span>
        </div>
        <div v-if="show" id="staffproductform" class="container">
            <div class="panel panel_content panel_submit">
                <div class="panel-header">
                    <div class="panel-title">
                        Add Product
                    </div>
                </div>
                <div @click="show = !show" class="panel-close">X</div>
                <div class="panel-submit">create</div>
                <div class="panel-content">
                    <div class="form">
                        <div class="left">
                            <div class="field name">
                                <label for="">Name</label>
                                <input type="text" class="input input-form input-form2">
                            </div>
                            <div class="field price">
                                <label for="">Price</label>
                                <input type="text" class="input input-form input-form2">
                            </div>
                            <div class="field weight">
                                <label for="">weight</label>
                                <input type="text" class="input input-form input-form2">
                            </div>
                            <div class="field rows-3 cart-description">
                                <label for="">cart description</label>
                                <textarea name="" class="input input-form input-form2" id="" ></textarea>
                            </div>
                            <div class="field rows-3 short-description">
                                <label for="">short description</label>
                                <textarea name="" class="input input-form input-form2" id="" ></textarea>
                            </div>
                            <div class="field rows-3 long-description">
                                <label for="">long description</label>
                                <textarea name="" class="input input-form input-form2" id="" ></textarea>
                            </div>
                        </div>
                        <div class="right">
                            <div class="field stock">
                                <label for="">stock</label>
                                <input type="text" class="input input-form input-form2">
                            </div>
                            <div class="field thumbnail">
                                <label for="">thumbnail</label>
                                <input type="text" class="input input-form input-form2">
                            </div>
                            <div class="field images">
                                <label for="">images</label>
                                <div class="inputs">
                                    <img class="input" src="/img.jpg">
                                    <div class="addbtn ">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            show: false,
        }
    }
}
</script>

<style lang="scss">
#staffproductform{
    color: black;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
        .panel {
          height: 500px;
          max-height: 95vh;
          display: grid;

          &.panel_content {
            grid-template-rows: none;

            .panel-content {}

            height: 100%;
          }
        }

        .form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 80px;
          .left,
          .right {
            display: grid;
            grid-row-gap: 5px;

            .field {
              display: grid;

              textarea {
                resize: none;
              }

              label {
                align-self: center;
              }
            }

            .thumbnail {
              .input {
                height: 150px;
                max-width: 150px;
              }
            }

            .images {
              .inputs {
                display: flex;
                // grid-template-columns: repeat(auto-fill, 100px);
                overflow-x: scroll;
                overflow: overlay;
                align-items: stretch;

                .input,
                .addbtn {
                  margin: 0 1px;
                  height: 100px;
                  max-width: 100px;
                }

                .addbtn {
                  height: 100px;
                  //  width: 100px;
                  padding: 40px;
                  background-color: var(--gray);
                  cursor: pointer;
                }
              }
            }
          }
        }

        @media(max-width: 550px) {
          .form {
            grid-template-columns: 1fr;
            max-height: unset;
          }
        }

        .rows-3 {
          // height: 100%;
        }

        .thumbnail {
          grid-row: auto / span 4;
        }

        .images {
          grid-row: auto / span 3;
        }
}
.action{
    align-self: flex-start;
    justify-self: end;
    height: 100%;
    width: 100%;
    max-height: 45px;
    max-width: 150px;
    background-color: var(--success);
    box-shadow: 0px 2px 0px var(--successDark);
    border-radius: 2px;
    color: white;
    font-size: calc(0.4vw + 0.8rem);
    font-weight: 450;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sign{
        font-size: calc(0.5vw + 1rem);
        font-weight: 600;
    }
    &:hover{background-color: var(--successHover);}
    &:active{
        box-shadow: 0px 1px 0px var(--successDark) !important;
        transform: translateY(3px);
        background-color: var(--successActive);
    }
}
.bg{
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    left: 0;
}
</style>