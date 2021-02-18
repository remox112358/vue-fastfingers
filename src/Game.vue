<template>
  <div class="game">
    <h1 class="game__title">FASTFINGERS</h1>
    <Area :words="words" />
    <div class="game__manage">
      <input
        v-show="! showResult"
        @input="updateInputValue"
        ref="input"
        type="text" 
        value=""
        dir="ltr" 
        placeholder="" 
        autocomplete="off" 
        autocorrect="off" 
        autocapitalize="off"
        autofocus="on"
        spellcheck="false">
      <button class="reset" @click="reset(true)">RESET</button>
      <Timer v-show="! showResult" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { getWords } from '@/dictionary';

import { SETTINGS } from '@/config';

import Area from '@/components/Area.vue';
import Timer from '@/components/Timer.vue';

export default {
  name: 'App',
  data: function() {
    return {
      timer: null
    }
  },
  components: {
    Area,
    Timer
  },
  computed: {
    ...mapState([
      'words',
      'leftTime',
      'inputValue',
      'currentWord',
      'timerStarted',
      'result',
      'showResult'
    ]),
    ...mapGetters([
      'leftTimeOutput'
    ])
  },
  methods: {
    reset(isReset = false) {
      this.setResultShow(false);
      this.clear();
      this.stopTimer();
      this.resetCurrentWord();
      this.resetCurrentRow();
      this.setWords(getWords(SETTINGS.wordsCount));

      if (! isReset) {
        this.setResultShow(true);
      } else {
        this.resetResult();
      }
    },
    updateInputValue() {
      this.setInputValue(this.$refs.input.value.trim())
    },
    startTimer() {
      this.setTimerStarted(true);
      this.timer = setInterval(() => {
        this.updateLeftTime();

        if (this.leftTime === 0) {
          this.reset();
          this.stopTimer();
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.setTimerStarted(false);
      this.resetLeftTime();
    },
    handleInput(event) {
      if (event.data === ' ') {
        if (this.$refs.input.value.trim().length) {
          if ((this.currentWord + 1) % SETTINGS.wordsInRow === 0) {
            this.switchCurrentRow();
          }
          
          this.switchCurrentWord();
        }

        this.clear();
      } else {
        this.changeCurrentWordStatus();
      }

      if (! this.timerStarted && this.$refs.input.value.trim().length) {
        this.startTimer();
      }

    },
    clear() {
      this.$refs.input.value = '';
    },
    ...mapActions([
      'setWords',
      'updateLeftTime',
      'resetLeftTime',
      'setInputValue',
      'switchCurrentWord',
      'resetCurrentWord',
      'switchCurrentRow',
      'setTimerStarted',
      'resetCurrentRow',
      'changeCurrentWordStatus',
      'resetResult',
      'setResultShow'
    ])
  },
  mounted() {
    this.$refs.input.addEventListener('input', this.handleInput);

    this.setWords(getWords(SETTINGS.wordsCount));
  }
}
</script> 

<style lang="sass">
  @import '@/sass/style.sass'

  .game
    padding: 20px

    background-color: #fff

    user-select: none

    &__title
      font-size: 32px
      font-weight: 700

    &__manage
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center

      margin-top: 20px
      
      background-color: darken(#fff, 10%)

      padding: 10px 0

      input[type="text"]
        font-family: Barlow Condensed, sans-serif
        font-size: 24px

        width: 350px
        height: 50px

        outline: none

        padding: 5px 15px

      .reset
        font-family: Barlow Condensed, sans-serif
        font-size: 24px
        line-height: 1

        padding: 5px 10px

        border: 2px solid #000
        border-radius: 5px

        color: #000
        background-color: transparent

        margin-left: 20px
        margin-right: 10px

        transition: background-color .3s, color .3s

        &:hover
          color: #fff
          background-color: #000
</style>