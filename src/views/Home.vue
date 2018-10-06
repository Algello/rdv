<template>
    <div class="home">
        <el-input type="textarea" :rows="30" placeholder="Все статьи" @input="initialize" v-model="textarea"
                  class="home__inputarea">
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
                textarea: '',
                resultArray: [],
                keyDivider: ','
            }
        },
        components: {
            HelloWorld
        },
        methods: {
            initialize() { // Данный метод срабатывает каждый раз при изменении текстового поля.
                this.resultArray = [];// Первым делом очищаем наш основной массив от предыдущего использования
                this.keyArray();
                console.log(this.resultArray);
            },
            splitedText() { // Возвращает массив статей, разделенных по слову "статья"
                let formatedText = this.textarea.toLowerCase().trim(); // Мы хотим работать со строкой в нижнем регистре и без пробелов
                let splitedInitialText = split(formatedText, 'статья'); // Вначале разделяем нашу строку на отдельные статьи и превращаем все это в массив.
                splitedInitialText.shift(); // Т.к у нас метод split разделяет по слову "Статья", у нас получается лишний пустой элемент в начале, режем его методом shift.

                return splitedInitialText;
            },
            keyArray() { // Возвращает массив содержащий объекты каждой статьи
                let fromSplitedText = this.splitedText(); // Присваиваем переменной массив со статьями.
                fromSplitedText.forEach((article, i) => {
                    let trimmed = article.trim(); // Обрезаем пустое место в начале и конце строки
                    this.resultArray.push(this.articleNumberAndName(trimmed));
                    this.resultArray[i].keys = this.articleKeys(trimmed);
                });
            },
            articleNumberAndName(a) { // Возвращает массив объектов содержащих имена и номера всех статей
                let resultObj = {};
                let extractBetweenQuotes = /"(.*?)"/i; // Ищет любые символы между двух двойных кавычек
                let extractFirstNumber = /\d+/i; // Находит все числа в заданной строке
                let articleName = a.match(extractBetweenQuotes)[1].trim();
                let articleNumber = a.match(extractFirstNumber)[0];

                resultObj.name = articleName; // Получившиеся значения мы добавляем в изначальный объект
                resultObj.number = articleNumber;
                /*this.resultArray.push(resultObj); // Пушим наш объект в глобальный массив*/
                return resultObj;
            },
            articleKeys(articlesTrimmed) {
                let finalArr = [];
                let withoutHead = function() { // Убираем заголовок и номер стать, оставляем толко ключи
                    let result;
                    result = articlesTrimmed.split('"').pop();
                    return result;
                };
                let extractAllKeys = function() { // Извлекаем все ключи в каждой статье, предварительно разделенные ','
                    let rawString = withoutHead();
                    let keysArr = rawString.split(",");
                    return keysArr;
                };
                return extractAllKeys();
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
