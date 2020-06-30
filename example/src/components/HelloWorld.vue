<compiler compiler="vugel">
  <text :x="10" :y="140" :font-size="10" :font-weight="600">Vugel test!</text>
</compiler>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
