<template>
<div>
    {{item.count}} | {{item.name}} | {{item.price}} <br/>
</div>
</template>

<script>
export default {
  props: {
    item: {
        required: true
    }
  },
}
</script>