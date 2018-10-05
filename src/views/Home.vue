<template>
  <div class="home">
    <el-input type="textarea" :rows="30" placeholder="Все статьи" @input="initialize" v-model="textarea" class="home__inputarea">
    </el-input>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
const split = require('lodash.split');

export default {
  name: 'home',
  data() {
    return {
      textarea: ''
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    initialize() { // Данный метод срабатывает каждый раз при изменении текстового поля.
      this.keyArray();
    },
    splitedText() {
      let splitedInitialText = split(this.textarea, 'Статья'); // Вначале разделяем нашу строку на отдельные статьи и превращаем все это в массив.
      splitedInitialText.shift(); // Т.к у нас метод split разделяет по слову "Статья", у нас получается лишний пустой элемент в начале, режем его методом shift.
      return splitedInitialText;
    },
    keyArray() {
      let fromSplitedText = this.splitedText();
      fromSplitedText.forEach((article)=>{
        let testForQuotes = /"(.*?)"/i; // Ищет любые символы между двух двойных кавычек
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    max-width: 1600px;
    margin: 0 auto;
    text-align: center;
  }

  .home__inputarea {
    width: 80%;
  } 
</style>
