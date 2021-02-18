import { createStore } from 'vuex';
import { SETTINGS } from '@/config';

export const store = createStore({

  state: {
    words: [],
    currentWord: 0,
    currentRow: 1,
    timerStarted: false,
    leftTime: SETTINGS.time,
    inputValue: '',
    result: 0,
    showResult: false
  },

  getters: {
    leftTimeOutput: state => {
      let minutes = Math.floor(state.leftTime / 60);
      let seconds = minutes === 0 ? state.leftTime : state.leftTime % (60 * minutes);

      return minutes.toString() + ':' + (seconds < 10 ? String('0' + seconds) : seconds.toString());
    },
    currentRowTopPosition: state => {
      return String(((state.currentRow - 1) * 49) * -1) + "px";
    }
  },

  mutations: {
    setWords: (state, words) => state.words = words,
    updateLeftTime: state => state.leftTime--,
    resetLeftTime: state => state.leftTime = SETTINGS.time,
    setTimerStarted: (state, isStarted) => state.timerStarted = isStarted,
    setInputValue: (state, newValue) => state.inputValue = newValue,
    switchCurrentWord: state => state.currentWord++,
    resetCurrentWord: state => state.currentWord = 0,
    switchCurrentRow: state => state.currentRow++,
    resetCurrentRow: state => state.currentRow = 1,
    changeCurrentWordStatus: (state, status) => state.words[state.currentWord].status = status,
    updateResult: state => state.result++,
    resetResult: state => state.result = 0,
    setResultShow: (state, show) => state.showResult = show
  },

  actions: {
    setWords: (context, payload) => { 
      const words = payload.map((word, index) => {
        return {
          text: word,
          status: null,
          highlighted: index === context.state.currentWord ? true : null
        }
      });

      context.commit('setWords', words);
    },
    updateLeftTime: context => {
      context.commit('updateLeftTime');
    },
    resetLeftTime: context => {
      context.commit('resetLeftTime');
    },
    setTimerStarted: (context, payload) => {
      context.commit('setTimerStarted', payload);
    },
    setInputValue: (context, payload) => {
      context.commit('setInputValue', payload);
    },
    switchCurrentWord: context => {
      let currentWord = context.state.words[context.state.currentWord];
      let nextWord    = context.state.words[context.state.currentWord + 1];
      let status;

      currentWord.highlighted = false;
      nextWord.highlighted = true;

      if (currentWord.text === context.state.inputValue) {
        status = 'correct';
        context.commit('updateResult');
      } else {
        status = 'wrong';
      }

      currentWord.status = status;

      context.commit('switchCurrentWord');
    },
    resetCurrentWord: context => {
      context.commit('resetCurrentWord');
    },
    switchCurrentRow: context => {
      context.commit('switchCurrentRow');
    },
    resetCurrentRow: context => {
      context.commit('resetCurrentRow');
    },
    changeCurrentWordStatus: context => {
      let currentWord = context.state.words[context.state.currentWord].text;
      let status = null;

      if (context.state.inputValue.length) {
        if (currentWord.slice(0, context.state.inputValue.length) !== context.state.inputValue) {
          status = 'wrong';
        }
      }

      context.commit('changeCurrentWordStatus', status);
    },
    updateResult: context => {
      context.commit('updateResult');
    },
    resetResult: context => {
      context.commit('resetResult');
    },
    setResultShow: (context, payload) => {
      context.commit('setResultShow', payload);
    }
  }

})