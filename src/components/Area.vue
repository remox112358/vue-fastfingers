<template>
  <div class="game__area">
    <div class="area__row" :style="{ top: currentRowTopPosition }">
      <Word v-for="(word, index) in words" :key="index" :word="word" :index="index" />
    </div>
    <div v-show="showResult" class="overlay">
      YOUR RESULT IS:&nbsp;<span class="result" :class="getResultColor">{{ result }}</span>&nbsp;WPM
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import { SETTINGS } from '@/config';

import Word from '@/components/Word.vue';

export default {
  name: 'Area',
  components: {
    Word
  },
  props: {
    words: Array,
  },
  computed: {
    getResultColor() {
      let className = '';
      let result = this.result;

      if (result < SETTINGS.levels.low) {
        className = 'low';
      } else if (result < SETTINGS.levels.medium) {
        className = 'medium';
      } else if (result < SETTINGS.levels.high) {
        className = 'high';
      } else {
        className = 'ultra';
      }

      return className;
    },
    ...mapState([
      'result',
      'showResult'
    ]),
    ...mapGetters([
      'currentRowTopPosition'
    ])
  }
}
</script>

<style lang="sass">
  .game__area
    position: relative

    width: 800px
    height: 100px

    border: 2px dashed #000

    padding: 0 10px

    overflow: hidden

    .overlay
      position: absolute
      top: 0
      left: 0
      z-index: 2

      display: flex
      align-items: center
      justify-content: center

      width: 100%
      height: 100%

      font-size: 32px
      font-weight: bold
      text-transform: uppercase

      backdrop-filter: blur(3px)

      .result
        &.low
          color: #ea0707
        &.medium
          color: #ffb100
        &.high
          color: #00c100
        &.ultra
          color: #8502fd

    .area__row
      display: flex
      flex-direction: row
      align-items: center
      flex-wrap: wrap

      position: relative
      z-index: 1
</style>