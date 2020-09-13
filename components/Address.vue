<template>
    <div id="address-panel" class="oip-content">
      <div>
        <div class="oip-detail">
          <label for="">full name</label>
          <p>{{address.firstName}} {{address.lastName}}</p>
        </div>
        <div class="oip-detail">
          <label for="">country</label>
          <p>{{address.country}}</p>
        </div>
        <div class="oip-detail">
          <label for="">state</label>
          <p>{{address.state}}</p>
        </div>
        <div class="oip-detail">
          <label for="">city</label>
          <p>{{address.city}}</p>
        </div>
        <div class="oip-detail">
          <label for="">phone</label>
          <p>{{address.phone}}</p>
        </div>
        <div class="oip-detail">
          <label for="">zip code</label>
          <p>{{address.zip}}</p>
        </div>
        <div class="oip-detail">
          <label for="">fax</label>
          <p>{{address.fax}}</p>
        </div>
      </div>
      <div>
        <div class="oip-detail description">
          <label for="">first address</label>
          <p>{{address.address}}</p>
        </div>
        <div class="oip-detail description">
          <label for="">second address</label>
          <p>{{address.address2}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ['address']
}
</script>

<style lang="scss">
    #address-panel {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 50px;
            grid-row-gap: 20px;
            &>div{
                display: grid;
                grid-row-gap: 20px;
            }
            .oip-detail{
                display: flex;
                justify-content: space-between;
                max-width: 300px;
                &.description{
                  display: grid;
                }
                p{
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    display: inline-block;
                }
                label{
                    font-size: calc(0.7rem + 0.7vw);
                    color: var(--grayTxt);
                }
            }
            .oip-description{
                flex-direction: column;
            }
        }
</style>