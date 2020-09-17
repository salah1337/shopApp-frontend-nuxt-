<template>
  <div id="addressForm">
    <div @click="show = !show" class="action">
      <span v-if="address && address.id">Edit address</span>
      <span v-else>Add new address</span>
    </div>
    <div v-if="show" @click="show = !show" class="popup-bg"></div>
    <div ref="addressFormContainer" class="popup gridcenter" v-if="show">
      <ValidationObserver class="form" v-slot="{ invalid }">
        <div @click="resetForm()" class="reloadAddress">
          <span>Reset</span>
          <font-awesome-icon class="icon" icon="redo" />
        </div>
        <div class="close-btn">
          <font-awesome-icon  @click="show = !show" class="icon errormsg" icon="times" />
        </div>
        <!-- <div class="email">
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <label for="email">email</label>
            <input id="email" type="text" class="input input-form input-form2" v-model="address.email">
            <span class="errormsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div> -->
        <div class="firstName">
          <ValidationProvider :rules="{required: true, between: {min:3, max:10}}" v-slot="{ errors }">
          <label for="firstName">firstName</label>
          <input v-model="address.firstName" id="firstName" type="text" class="input input-form input-form2">
            <span class="errormsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="lastName">
          <label for="lastName">lastName</label>
          <input v-model="address.lastName" id="lastName" type="text" class="input input-form input-form2">
        </div>
        <div ref="countrySelect" class="country">
          <!-- <input v-model="address.country" id="country" type="text" class="input input-form input-form2"> -->
          <ValidationProvider rules="required" v-slot="{ errors }">
            <label for="country">country</label>
            <span class="errormsg">{{ errors[0] }}</span>
            <select @change="getStates()" class="input input-form input-form2" id="country" v-model="address.country" name="">
              <option disabled value="placeholder" selected>chose country...</option>
              <option v-for="name in countryNames" :key="name" :value="name">{{name}}</option>
            </select>
          </ValidationProvider>
        </div>
        <div class="state">
          <ValidationProvider v-if="stateNames.length > 0" rules="required" v-slot="{ errors }">
            <label for="state">state</label>
            <!-- <input v-model="address.state" id="state" type="text" class="input input-form input-form2"> -->
            <select @change="getCities()" class="input input-form input-form2" id="state" v-model="address.state" name="">
              <option disabled value="placeholder" selected>chose state...</option>
              <option v-for="name in stateNames" :key="name" :value="name">{{name}}</option>
            </select>
          </ValidationProvider>
        </div>
        <div class="city">
          <ValidationProvider v-if="cityNames.length > 0" rules="required" v-slot="{ errors }">
            <label for="city">city</label>
            <!-- <input v-model="address.city" id="city" type="text" class="input input-form input-form2"> -->
            <select class="input input-form input-form2" id="city" v-model="address.city" name="">
              <option disabled value="placeholder" selected>chose city...</option>
              <option v-for="name in cityNames" :key="name" :value="name">{{name}}</option>
            </select>
          </ValidationProvider>
        </div>
        <div class="phone">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <label for="phone">phone</label>
            <div id="phone">
              <select class="input input-form input-form2" v-model="address.phonecode" id="">
                <option disabled value="placeholder" selected>chose area code...</option>
                <option v-if="code" v-for="code in phoneCodes" :value="code">{{addPlusSign(code)}}{{code}}</option>
              </select>
              <input v-model="address.phone" type="text" class="input input-form input-form2">
            </div>
          </ValidationProvider>
        </div>
        <div class="zip">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <label for="zip">zip</label>
            <input v-model="address.zip" id="zip" type="text" class="input input-form input-form2">
          </ValidationProvider>
        </div>
        <div class="fax">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <label for="fax">fax</label>
            <input v-model="address.fax" id="fax" type="text" class="input input-form input-form2">
          </ValidationProvider>
        </div>
        <div class="address">
          <ValidationProvider rules="required" v-slot="{ errors }">
          <label for="address">address</label>
          <textarea v-model="address.address" id="address1" class="input input-form input-form2"></textarea>
          </ValidationProvider>
        </div>
        <div class="address2">
          <ValidationProvider rules="required" v-slot="{ errors }">
          <label for="address2">address2</label>
          <textarea v-model="address.address2" id="address2" class="input input-form input-form2"></textarea>
          </ValidationProvider>
        </div>
        <div class="address-submit-btn gridcenter">
          <button 
            v-if="address && address.id" 
            @click="updateAddress()" 
            type="submit" 
            class="action"
            :disabled="invalid">
              update address
          </button>
          <button v-else @click="addNewAddress()" type="submit" class="action" :disabled="invalid">add address</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver  } from 'vee-validate';
export default {
  props: {'address': {required: false}},
  components: {
    ValidationProvider,
    ValidationObserver ,
  },
  data() {
    return {
        emptyAddress: {
            'amount': '3',
            'firstName': 'first name',
            'lastName': 'last name', 
            'address': 'address', 
            'address2': 'address2', 
            'city': 'placeholder', 
            'state': 'placeholder', 
            'zip': '3', 
            'country': 'placeholder', 
            'phone': '3', 
            'fax': '3', 
            'shipping': '3', 
            'tax': '3', 
            'email': 'email@mmm.com', 
            'shipped': '0', 
            'trackingNumber': '1',
            'details': [],
            'newAddress': 'new',
            'phonecode': 'placeholder'
        },
        show: false,
        countryNames: [],
        stateNames: [],
        cityNames: [],
        phoneCodes: '',
        baseAddress: undefined
      }
  },
  methods: {
    async addNewAddress() {
      await this.dbAction('post', `api/customer/address/add`, this.address)
        .then(async reply => {
          this.show = false
          await this.$auth.fetchUser()
        }).catch(err => console.log('fail'))
    },
    async updateAddress() {
      await this.dbAction('post', `api/customer/address/update/${this.address.id}`, this.address)
        .then(async reply => {
          this.show = false
          await this.$auth.fetchUser()
          this.address = {...this.address}
        }).catch(err => console.log('fail'))
    },
    async getCountries() {
      let loader = this.$loading.show({
        container: this.$refs.addressFormContainer
      })
      await this.$axios.get('api/customer/address/countries').then(res => {
        this.countryNames = res.data.countries.names
        this.phoneCodes = res.data.countries.phone
        loader.hide()
      })
    },
    async getStates() {
      if (!this.address.phonecode) {this.address.phonecode = this.phoneCodes[this.address.country]}
      let loader = this.$loading.show({
        container: this.$refs.countrySelect
      })
      await this.$axios.get('api/customer/address/states/' + this.address.country).then(res => {
        this.stateNames = res.data.states.names
        this.cityNames = []
        loader.hide()
      })
    },
    async getCities() {
      let loader = this.$loading.show({
        container: this.$refs.addressFormContainer
      })
      await this.$axios.get(`api/customer/address/cities/${this.address.country}/${this.address.state}`).then(res => {
        this.cityNames = res.data.cities.names
        loader.hide()
      })
    },
    getLocation(){
      this.getCountries()
      if (this.address.country) {this.getStates()}
      if (this.address.state) {this.getCities()}
    },
    resetForm(){
      if (this.baseAddress == {...this.address}) console.log("keeeeeeeeeeeeeeeeek");
      this.address = {...this.baseAddress}
      if (this.address.id) this.getLocation()
    },
    addPlusSign(code) {
      if (code.charAt(0) != '+') {
        return '+'
      }
    }
  },
  mounted(){
    this.baseAddress = this.address
    if(this.address.id) this.address = {...this.address}
    this.getLocation()
  }
}
</script>

<style lang="scss">
#addressForm{
  .icon{
    font-size: 16px;
  }
  .reloadAddress{
    color: var(--primary);
    position: fixed;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
  }
  .popup{
 position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 998;
}
.popup-bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 997;
}
      .form{
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 10px;
        background: white;
        padding: 15px;
        border-radius: 4px;
        z-index: 999;
        max-width: 95vw;
        max-height: 95vh;
        width: 450px;
        border-bottom: 6px solid var(--main);
        overflow-y: scroll;
        overflow-y: overlay;
        margin-bottom: 0;
        .address-submit-btn{
          grid-column: auto / span 12;
          // background: var(--success);
          max-width: unset;
          margin-bottom: 4px;
          button{
            width: 100%;
            height: 100%;
            cursor: pointer;
            padding: 4px;
            &:disabled{
              cursor: not-allowed;
              background: rgba(128, 128, 128, 0.637);
            }
          }
        }
      }
      
      .orderForm {
        // min-height: 90vh;
        grid-template-rows: unset !important;
        max-width: 600px;
      }

      input, select {
        width: 100%;
        height: 35px;
      }

      select {
        
      }

      label {
        font-weight: 600;
        text-transform: capitalize;
      }

      label::after {
        content: ':';
      }

      .address textarea,
      .address2 textarea {
        width: 100%;
        resize: none;
      }

      .email, .phone {
        grid-column: auto / span 12;
      }

      .firstName,
      .lastName,
      .address,
      .address2,
      .fax,
      .zip {
        grid-column: auto / span 6;
      }
      .phone{
        #phone{

        display: flex;
        justify-content: space-between;
        select{
          width: 35%;
          margin-right: 5px;
        }
        }
      }
      .country,
      .state,
      .city,
      .panel-header {
        grid-column: auto / span 4;
      }

      @media (max-width: 500px) {

        .firstName,
        .lastName,
        .address,
        .phone,
        .country,
        .address2 {
          grid-column: auto / span 12;
        }

        .state,
        .city,
        .zip,
        .fax,
        .panel-header {
          grid-column: auto / span 6;
        }

        .orderForm {
          grid-template-rows: 0.1fr 1fr 0.15fr !important;
        }
      }
}
</style>