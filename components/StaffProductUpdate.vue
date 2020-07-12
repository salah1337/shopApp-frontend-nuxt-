<template>
<div>
    <div @click="show = !show" class="gridcenter pip-btn pip-edit">Edit</div>
    <div v-if="show" id="staffproductform" class="container gridcenter">
    <div v-if="show" @click="show = !show" class="product-form-bg"></div>
    <div class="panel gridcenter panel_content panel_submit">
        <div class="panel-header">
        <div class="panel-title">
            Edit
        </div>
        </div>
        <div @click="show = !show" class="panel-close">X</div>
        <div @click="updateProduct()" class="panel-submit">Update</div>
        <div class="panel-content">
        <div class="form">
            <div class="left">
            <div class="field name">
                <label for="">Name</label>
                <input v-model="product.name" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.name">{{errors.name[0]}}</span>
            </div>
            <div class="field sku">
                <label for="">sku</label>
                <input v-model="product.SKU" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.SKU">{{errors.SKU[0]}}</span>
            </div>
            <div class="field price">
                <label for="">Price</label>
                <input v-model="product.price" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.price">{{errors.price[0]}}</span>
            </div>
            <div class="field weight">
                <label for="">weight</label>
                <input v-model="product.weight" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.weight">{{errors.weight[0]}}</span>
            </div>
            <div class="field rows-3 cart-description">
                <label for="">cart description</label>
                <textarea v-model="product.cartDesc" name="" class="input input-form input-form2"
                id=""></textarea>
                <span class="error" v-if="errors.cartDesc">{{errors.cartDesc[0]}}</span>
            </div>
            <div class="field rows-3 short-description">
                <label for="">short description</label>
                <textarea v-model="product.shortDesc" name="" class="input input-form input-form2"
                id=""></textarea>
                <span class="error" v-if="errors.shortDesc">{{errors.shortDesc[0]}}</span>
            </div>
            <div class="field rows-3 long-description">
                <label for="">long description</label>
                <textarea v-model="product.longDesc" name="" class="input input-form input-form2"
                id=""></textarea>
                <span class="error" v-if="errors.longDesc">{{errors.longDesc[0]}}</span>
            </div>
            </div>
            <div class="right">
            <div class="field stock">
                <label for="">stock</label>
                <input v-model="product.stock" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.stock">{{errors.stock[0]}}</span>
            </div>
            <div class="field thumbnail">
                <label for="">thumbnail</label>
                <input style="display: none" @change="getThumb($event)" ref="thumbInput" type="file">
                <div class="input">
                <img v-if="thumbPreview" :src="thumbPreview" alt="">
                <img v-else :src="`${apiUrl}/storage/${product.thumb}`" alt="">
                <div class="image-overlay">
                    <div class="image-overlay-remove">x</div>
                    <div @click="$refs.thumbInput.click()" class="image-overlay-change">S</div>
                </div>
                </div>
                <span class="error" v-if="errors.thumb">{{errors.thumb[0]}}</span>
            </div>
            <div class="field images">
                <label for="">images</label>
                <div class="inputs">
                <div v-for="(image, index) in product.images">
                    <div v-if="image == ''" @click="$refs.imageInput[index].click()" class="addbtn gridcenter">+
                    </div>
                </div>
                <div v-for="(image, index) in product.images" class="input">
                    <div v-if="image != ''">
                        <div class="image-overlay">
                            <div @click="removeImage(index)" class="image-overlay-remove">x</div>
                            <div @click="$refs.imageInput[index].click()" class="image-overlay-change">S</div>
                        </div>
                        <div class="imagePreview">
                            <img v-if="imagePreviews[index]" :src="imagePreviews[index]" alt="">
                            <img v-else :src="`${apiUrl}/storage/${image}`" alt="">
                        </div>
                    </div>
                    <input style="display: none" @change="getImg($event, index)" ref="imageInput" type="file">
                </div>
                </div>
                <span class="error" v-if="errors.image">{{errors.image[0]}}</span>
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
  props: ['id'],
  data() {
    return {
      product: '',
      errors: {},
      show: false,
      imagePreviews: [],
      thumbPreview: '',
      apiUrl: process.env.apiUrl
    }
  },
  async created() {
    await this.load()
  },
  methods: {
    async load(){
        let data = await this.loadOne('product', this.id, 'staff')
        this.product = {...data.product}
        this.product.images = JSON.parse(this.product.image)
        this.product.image = JSON.parse(this.product.image)
        this.product.images.push('')
        // this.product.images = JSON.parse(data.product.image) 
    },
    async updateProduct() {
    //   this.product.image = JSON.stringify(this.product.image)
      let form = new FormData()
      for (let key in this.product) {
        form.set(key, this.product[key])
      }
      let images = []
      this.product.images.forEach((image, i) => {
        if (!image == '' && typeof(image) != 'string') {
          images.push(image)
          form.append(`images[]`, image)
        }
      });
      form.set('images', JSON.stringify(images))
      await this.dbAction('post', `api/product/update/${this.product.id}`, form, 'products/load')
        .then(reply => {
          console.log('success')
          this.show = false  
          this.errors = {}
        }).catch(err => console.log('fail'))
    },
    getImg(e, index) {
      let file = this.$refs.imageInput[index].files[0]
      if (file) {
        if (typeof(this.product.images[index]) == 'string' && this.product.images[index] != '') {
            this.product.image.splice(this.product.image.indexOf(this.product.images[index]), 1)
        }
        // if (this.product.images[index] == '') this.product.images.push('')
        if (this.product.images[index] == '') {
            this.$set(this.product.images, this.product.images.length, '')
            
        }
        //   this.product.images[index] = file       
          this.$set(this.product.images, index, file)
          let reader = new FileReader;
          reader.onload = (e) => {
            // this.imagePreviews[index] = e.target.result
            this.$set(this.imagePreviews, index, e.target.result)
          }
          reader.readAsDataURL(file)  
      }
    },
    getThumb(e) {
      let file = this.$refs.thumbInput.files[0] 
      if (file) {
        let reader = new FileReader;
        reader.onload = (e) => {
          this.thumbPreview = e.target.result
        }
        reader.readAsDataURL(file)
        this.product.thumb = file
      }
    },
    addImage() {
      this.product.images.push('')
      this.$refs.imageInput[this.product.images.length - 1].click()
    },
    removeImage(index) {
      // console.log(this.product.images.indexOf(image));
      if (typeof(this.product.images[index]) == 'string' && this.product.images[index] != '') {
            this.product.image.splice(this.product.image.indexOf(this.product.images[index]), 1)
        }
    //   this.$delete(this.product.images, index - 1)
    //   this.$delete(this.product.imagePreviews, index - 1)
    this.product.images.splice(index, 1)
    this.imagePreviews.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
#staffproductform{
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .panel-submit{
      margin-bottom: 5%;
    }
    .product-form-bg{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 998;
    }
        .panel {
          z-index: 999;
          // max-height: 95vh;
          max-width: 95vw;
        //   max-width: 700px;
          overflow-y: scroll;
          display: grid;
          position: relative;
          
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
             .image-overlay{
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.5);
                    z-index: 998;
                  }
                  .image-overlay, .image-overlay-change, .image-overlay-remove{
                    display: none;
                    position: absolute;
                    font-weight: 600;
                    font-size: calc(0.8rem + 0.8vw);
                  }
                  .image-overlay-change, .image-overlay-remove{
                    z-index: 999;
                    cursor: pointer;
                  }
                  .image-overlay-remove{
                    top: 2%;
                    right: 4%;
                  }
                  .image-overlay-change{
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                  .imagePreview{
                    height: 100px;
                    width: 100px;
                    img{
                      height: 100%;
                      width: 100%;
                    }
                  }
                  // &:hover{
                  //   .image-overlay, .image-overlay-remove, .image-overlay-change{
                  //     display: unset;
                  //   }
                  // }
            .thumbnail {
              .input {
                position: relative;
                height: 150px;
                max-width: 150px;
                img{
                  height: 100%;
                  width: 100%;
                }
                &:hover{
                  .image-overlay, .image-overlay-remove, .image-overlay-change{
                    display: unset;
                  }
                }
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
                  width: 100px;
                  position: relative;
                  padding: 0;
                 
                }
                .input{
                                    &:hover{
                    .image-overlay, .image-overlay-remove, .image-overlay-change{
                      display: unset;
                    }
                  }
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