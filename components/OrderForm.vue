<template>
      <div id="orderForm">
        <div class="orderForm panel panel_content">
            <div class="panel-header">
                <div class="panel-title">Order Information</div>
                <div class="panel-description">
                    Please fill in your order details
                </div>
            </div>
           <div class="panel-content">
            <div class="email">
                <label for="email">email</label>
                <input id="email" type="text" class="input input-form input-form2">
            </div>
            <div class="firstName">
                <label for="firstName">firstName</label>
                <input id="firstName" type="text" class="input input-form input-form2">
            </div>
            <div class="lastName">
                <label for="lastName">lastName</label>
                <input id="lastName" type="text" class="input input-form input-form2">
            </div>
            <div class="country">
                <label for="country">country</label>
                <input id="country" type="text" class="input input-form input-form2">
            </div>
            <div class="state">
                <label for="state">state</label>
                <input id="state" type="text" class="input input-form input-form2">
            </div>
            <div class="city">
                <label for="city">city</label>
                <input id="city" type="text" class="input input-form input-form2">
            </div>
            <div class="phone">
                <label for="phone">phone</label>
                <input id="phone" type="text" class="input input-form input-form2">
            </div>
            <div class="zip">
                <label for="zip">zip</label>
                <input id="zip" type="text" class="input input-form input-form2">
            </div>
            <div class="fax">
                <label for="fax">fax</label>
                <input id="fax" type="text" class="input input-form input-form2">
            </div>
            <div class="address">
                <label for="address">address</label>
                <textarea id="address1" class="input input-form input-form2"></textarea>
            </div>
            <div class="address2">
                <label for="address2">address2</label>
                <!-- <input id="address2" type="text" class="input input-form input-form2"> -->
                <textarea id="address2" class="input input-form input-form2"></textarea>
            </div>
           </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
    #orderForm {
      .panel-submit {
        justify-self: center !important;
      }

      .panel-content {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 10px;
      }

      .orderForm {
        min-height: 90vh;
        grid-template-rows: 0.25fr 1fr 0.15fr !important;
        max-width: 600px;
      }

      input {
        width: 100%;
        height: 35px;
      }

      label {
        font-weight: 800;
        text-transform: capitalize;
      }

      label::after {
        content: ':';
      }

      .address textarea,
      .address2 textarea {
        height: 100%;
        width: 100%;
        resize: none;
      }

      .email {
        grid-column: auto / span 12;
      }

      .firstName,
      .lastName,
      .address,
      .address2 {
        grid-column: auto / span 6;
      }

      .country,
      .state,
      .city,
      .phone,
      .zip,
      .fax,
      .panel-header {
        grid-column: auto / span 4;
      }

      @media (max-width: 500px) {

        .firstName,
        .lastName,
        .address,
        .address2 {
          grid-column: auto / span 12;
        }

        .country,
        .state,
        .city,
        .phone,
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