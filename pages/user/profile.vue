<template>
  <div class="container">
    <div class="user">
        <div class="image">
          <img style="width:200px;height:200px;border-radius:100px" :src="`http://localhost:6969/storage/${user.image}`" alt="">
          <div>
            <strong>username:</strong> {{ user.username }} <br/>
          </div>
        </div>

        <div class="info">
          <div>
            <strong>firstName:</strong> {{ user.firstName }} <br/>
          </div>
          <div>
            <strong>lastName:</strong> {{ user.lastName }} <br/>
          </div>
          <div>
            <strong>email:</strong> {{ user.email }} <br/>
          </div>
        </div>
    </div>
    <div class="orders">
      <h3>Your Orders:</h3>
      <OrderCard :order="order" v-for="order in user.orders" :key="order.id"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container{
  background: rgb(183, 200, 216);
  margin-top: 150px;
  display: grid;
  border-radius: 5px;
  padding: 0 50px;
  width: 95vw;
  max-width: 500px;
}
.image{
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-100px);
  img{
    border: rgb(183, 200, 216) 8px solid;
  }
}
.user{
  display: grid;
  grid-template-rows: 1fr 0.4fr; 
  .info{

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
        user: this.$auth.user.info
      }
    }
}
</script>