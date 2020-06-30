<template>
  <p>Hi</p>
  <vugel :settings="{clearColor: 'black'}" style="width: 500px; height: 500px">
    <HelloWorld></HelloWorld>
  </vugel>
</template>

<script>
import { Vugel } from "vugel"
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Vugel,
  }
}
</script>
