
<template>
  <span class="wl-quote" :class=" {'wl-quote-animated': quoteAnim} " @click="changeQuote">
    {{quotes[quoteNum]}}
  </span>
</template>

<script>
export default {
  data() {
    return {
      quotes: ['Impossible becomes possible when you want it bad enough', 'It takes as much energy to wish as it does to plan', 'Never stop believing that your dreams are eternal', 'Life is too short to be wishing for things that have been proven by many to be achievable'],
      quoteNum: 0,
      quoteAnim: false
    }
  },
  methods: {
    changeQuote() {
      this.quoteAnim = true;
      this.quoteNum = (this.quoteNum + 1) % 4; // resets to 0

      setTimeout(() => {
        this.quoteAnim = false;
      }, 600);
    }
  }
}
</script>
