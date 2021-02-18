<template>
  <div
    class="area__item"
    :class="htmlClasses">
    {{ word.text }}
  </div>
  <div v-if="isLast" class="break"></div>
</template>

<script>
import { mapGetters } from 'vuex';

import { SETTINGS } from '@/config';

export default {
  name: 'Word',
  props: {
    word: Object,
    index: Number
  },
  computed: {
    htmlClasses() {
      let classes = [];

      this.word.status ? classes = [...classes, this.word.status] : null;
      this.word.highlighted ? classes = [...classes, 'highlighted'] : null;

      return classes.join(' ');
    },
    isLast() {
      return (this.index + 1) % SETTINGS.wordsInRow === 0;
    },
    ...mapGetters([
      'currentWord'
    ])
  }
}
</script>

<style lang="sass">
  .area__item
    font-size: 24px

    margin: 5px 0
    padding: 5px

    &.highlighted
      background-color: darken(#fff, 20%)

    &.correct
      color: #1dbb1d
      background-color: rgba(#1dbb1d, .1)

    &.wrong
      color: red
      background-color: rgba(red, .1)
</style>