<template>
  <div class="timer">{{ leftTimeOutput }}</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Timer',
  computed: {
    ...mapGetters([
      'leftTimeOutput'
    ])
  }
}
</script>

<style lang="sass">
  .timer
    font-size: 24px
    line-height: 1

    padding: 5px 10px

    border-radius: 5px

    color: #fff
    background-color: #000
</style>