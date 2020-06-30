<template>
  <p>Hi</p>
  <vugel style="width: 500px; height: 500px">
    <HelloWorld></HelloWorld>
  </vugel>
</template>

<script>
import { Vugel } from "vugel/esm"
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Vugel,
  }
}
</script>
