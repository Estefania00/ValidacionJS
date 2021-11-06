<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
    <HelloWorld msg="¡Bienvenido a HappyBaggs, para todos!"/>
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
