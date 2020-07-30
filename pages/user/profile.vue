<template>
<div>
  <div class="container">
    <div class="header-btns">
      <nuxt-link to="/" class="backbtn">
        back to store
      </nuxt-link>
      <div v-if="showInfo" @click="showInfo = !showInfo" class="backbtn">
        Edit Profile
        <font-awesome-icon icon="edit" />
      </div>
      <div class="updatebtns" v-else>
        <div @click="cancel()" class="cancelbtn">
          Cancel
          <font-awesome-icon icon="times" />
        </div>
        <div @click="Update()" class="backbtn updatebtn">
          Update
        </div>
      </div>
    </div>
    <div>
      <div id="dashboard">
        <div class="dashboard-content">
          <div class="details panel panel_content">
            <div class="panel-header">
              <div class="panel-title">Details</div>
            </div>
            <div class="panel-content">
              <div class="panel-row">
                <div class="user-image">
                  <img v-if="showInfo" :src="`${apiUrl}/storage/${$auth.user.info.image}`" alt="">
                  <div v-else>
                    <img v-if="!imagePreview" :src="`${apiUrl}/storage/${$auth.user.info.image}`" alt="">
                    <img v-else :src="imagePreview" alt="">
                    <font-awesome-icon @click="$refs.imageInput.click()" class="imgBtn" icon="edit" />
                  </div>
                <input style="display: none" @change="getImg($event)" ref="imageInput" type="file">
                    <span class="error" v-if="errors.image">{{errors.image[0]}}</span>
                </div>
              </div>
              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">username</label>
                  <div class="info">
                    {{user.username}}
                  </div>
                </div>
                <div v-else>
                  <label for="">username</label>
                  <div>
                    <input v-model="user.username" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.username">{{errors.username[0]}}</span>
                  </div>
                </div>
              </div>
              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">email</label>
                  <div class="info">
                    {{user.email}}
                  </div>
                </div>
                <div v-else>
                  <label for="">email</label>
                  <div>
                    <input v-model="user.email" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.email">{{errors.email[0]}}</span>
                  </div>
                </div>
              </div>
              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">first name</label>
                  <div class="info">
                    {{user.firstName}}
                  </div>
                </div>
                <div v-else>
                  <label for="">first name</label>
                  <div>
                    <input v-model="user.firstName" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.firstName">{{errors.firstName[0]}}</span>
                  </div>
                </div>
              </div>
              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">last name</label>
                  <div class="info">
                    {{user.lastName}}
                  </div>
                </div>
                <div v-else>
                  <label for="">last name</label>
                  <div>
                    <input v-model="user.lastName" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.lastName">{{errors.lastName[0]}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="payment panel panel_content">
            <div class="panel-header">
              <div class="panel-title">Payment Method</div>
            </div>
            <div class="panel-content">
              <img :src="`${apiUrl}/storage/creditcard.png`" alt="">
            </div>
          </div>
          <div class="address panel panel_content">
            <div class="panel-header">
              <div class="panel-title">Address</div>
            </div>
            <div class="panel-content">
              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">city</label>
                  <div class="info">
                    {{user.city ? user.city : 'unspecified'}}
                  </div>
                </div>
                <div v-else>
                  <label for="">city</label>
                  <div>
                    <input v-model="user.city" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.city">{{errors.city[0]}}</span>
                  </div>
                </div>

              </div>

              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">state</label>
                  <div class="info">
                    {{user.state ? user.state : 'unspecified'}}
                  </div>
                </div>
                <div v-else>
                  <label for="">state</label>
                  <div>
                    <input v-model="user.state" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.state">{{errors.state[0]}}</span>
                  </div>
                </div>

              </div>

              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">country</label>
                  <div class="info">
                    {{user.country ? user.country : 'unspecified'}}
                  </div>
                </div>
                <div v-else>
                  <label for="">country</label>
                  <div>
                    <input v-model="user.country" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.country">{{errors.country[0]}}</span>
                  </div>
                </div>

              </div>

              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">phone</label>
                  <div class="info">
                    {{user.phone ? user.phone : 'unspecified'}}
                  </div>
                </div>
                <div v-else>
                  <label for="">phone</label>
                  <div>
                    <input v-model="user.phone" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.phone">{{errors.phone[0]}}</span>
                  </div>
                </div>

              </div>

              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">fax</label>
                  <div class="info">
                    {{user.fax ? user.fax : 'unspecified'}}
                  </div>
                </div>
                <div v-else>
                  <label for="">fax</label>
                  <div>
                    <input v-model="user.fax" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.fax">{{errors.fax[0]}}</span>
                  </div>
                </div>

              </div>

              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">address</label>
                  <div class="info">
                    {{user.adress ? user.adress : 'unspecified'}}
                  </div>
                </div>
                <div v-else>
                  <label for="">address</label>
                  <div>
                    <input v-model="user.adress" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.adress">{{errors.adress[0]}}</span>
                  </div>
                </div>

              </div>

              <div class="panel-row">
                <div v-if="showInfo">
                  <label for="">second address</label>
                  <div class="info">
                    {{user.adress2 ? user.adress2 : 'unspecified'}}
                  </div>
                </div>
                <div v-else>
                  <label for="">second address</label>
                  <div>
                    <input v-model="user.adress2" type="text" class="input input-form input-form2">
                    <span class="error" v-if="errors.adress2">{{errors.adress2[0]}}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.user-image{
  img{
    width: 150px;
    max-height: 150px;
    overflow: hidden;
    border-radius: 250px;
  }
  .img-btn{
    color: var(--main);
    cursor: pointer;
  }
}
.header-btns{
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    .updatebtns{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 10px;
    }
}
.container{
    display: grid;
    grid-gap: 30px;
    margin-top: 5%;
    margin-bottom: 5%;

}
.orderlist{
    max-height: 85vh;
}
.dashboard-content{
    display: grid;
    grid-template-areas: 
    "details address"
    "payment address"
    ;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 0.5fr;
    grid-gap: 30px;
    .details{
        grid-area: details;  
        width: 100%; 
    }
    .address{
        grid-area: address;
    }
    .payment{
        grid-area: payment;
    }
    .panel{
        grid-template-rows: unset !important;
    }
    .panel-content{
        display: grid;
        grid-row-gap: 10px;
        .panel-row{
            display: flex;
            width: 100%; 
            justify-content: space-between;
            label{
                color: var(--grayTxt);
                font-size: calc(0.5rem + 0.5vw);
            }
            .info{
                font-size: calc(0.6rem + 0.6vw);
            }
            input{
                // max-width: 70%;
                width: 100%;
            }
        }
    }
}

.side-panel{
    font-size: calc(0.7vw + 0.7rem);
    .user{
        display: grid;
        img{
            border-radius: 100px;
            width: 100%;
            height: auto;
        }
        .username{
            font-weight: 550;
        }
    }
}
.btns{
    .btn{
        height: 40px;
        justify-content: flex-start;
        grid-template-columns: 0.2fr 1fr;
        .txt{
            text-transform: capitalize;
            font-weight: 600;
        }
    }
}
.side-menu{
    .side-menu-toggle, .side-menu-content{
        position: fixed;
        background: var(--main);
        display: none;
    }
    .side-menu-toggle, .side-menu-close{
        cursor: pointer;
    }
    .side-menu-toggle, .side-menu-content{
        top: 0;
    }
    .side-menu-toggle{
        height: 100vh;
        width: 6vw;
        left: 0;
    }
    .side-menu-content{
        .side-menu-close{
            position: fixed;
            top: 5vh;
            right: 5vw;
            z-index: 3;
            font-size: calc(1vw + 1rem);
        }
        height: 100vh;
        width: 100vw;
        z-index: 2;
    }
}
@media (max-width: 700px){
    .side-panel{
        display: none;
    }
    .side-menu{
        .side-menu-toggle{
            display: grid;
        }
        .user{
            .image{
                img{
                    border-radius: 100px;
                    height: 150px ;
                    width: 150px ;
                }
            }
        }
    }
    .container{
        display: block;
        width: 95vw;
        .content{
            display: block;
            .panel{
                margin: 5% auto;
            }
        }
    }
    .header-btns{
        display: grid;
        grid-row-gap: 10px;
    }
}
</style>

<script>
import OrderCard from '../../components/OrderCard'
export default {
  components: {
    OrderCard
  },
    data(){
      return{
        user: {...this.$auth.user.info},
        initialuser: {...this.$auth.user.info},
        showInfo: true,
        showForm: false,
        apiUrl: process.env.apiUrl,
        imagePreview: '',
        errors: {}
      }
    },
    methods: {
        async Update() {
          let form = new FormData()
          for (let key in this.user) {
            //   if (key == 'image' || key == 'images') return
            if (this.user[key] != this.initialuser[key]){
              console.log(key);
                form.set(key, this.user[key])
            }
          }
          await this.dbAction('post', `api/customer/user/update/${this.user.id}`, form, 'products/load') 
          .then(async reply => {
            console.log('success')
            this.errors = {}
            await this.$auth.fetchUser()
            this.user = {...this.$auth.user.info}
            this.initialuser = {...this.$auth.user.info}
            this.showInfo = true
          }).catch(err => console.log('fail'))
        },
        cancel() {
           this.user = {...this.$auth.user.info}
           this.imagePreview = ''
           this.showInfo = !this.showInfo
        },
        getImg(e) {
          let file = this.$refs.imageInput.files[0] 
          if (file) {
            let reader = new FileReader;
            reader.onload = (e) => {
              this.imagePreview = e.target.result
            }
            reader.readAsDataURL(file)
            this.user.image = file
          }
        },
    }
}
</script>