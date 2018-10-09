<template>
    <div class="home">
        <div class="tile is-ancestor">
            <div class="tile is-4 is-vertical is-parent">
                <div class="tile is-child box">
                    <p class="title has-text-centered">Статьи</p>
                    <textarea type="textarea" :rows="8" placeholder="Скопируйте статьи в это поле" v-model="textarea"
                              class="textarea home__inputarea">
                    </textarea>
                    <div class="buttons has-addons is-centered">
                        <span class="button is-medium is-outlined is-danger" @click="resultArray = []; textarea = ''">очистить</span>
                        <span class="button is-medium is-outlined is-info" @click="initialize">парсинг</span>
                        <span class="button is-medium is-outlined is-success" :disabled="resultArray.length === 0" @click="commit">далее</span>
                    </div>
                </div>
                <div class="tile is-child box content">
                    <p class="title has-text-centered">Правила форматирования</p>
                    <h6 class="has-text-centered">Для корректного парсинга, важно соблюдать следующую структуру
                        статей:</h6>
                    <div class="box">
                        <p>
                            Статья 1 "задвижка клиновая фланцевая"<br>
                            задвижка клиновая фланцевая<strong>,</strong><br>
                            задвижки клиновые фланцевые гост<strong>,</strong><br>
                            задвижка стальная клиновая фланцевая<strong>,</strong><br>
                            ... <strong>,</strong><br>
                            задвижка стальная клиновая фланцевая цена
                        </p>
                    </div>
                    <blockquote>
                        <p>Отметим, что после каждого <code>ключа</code> должна ставиться запятая, в противном
                            случае корректная работа приложения не гарантируется.</p>
                        <p>После последнего <code>ключа</code>, запятую ставить <strong>не нужно</strong>.</p>
                    </blockquote>
                </div>
            </div>
            <div class="tile is-parent content">
                <div class="tile is-child table-part">
                    <div v-if="!resultArray.length > 0">
                        <p class="title has-text-centered">Предварительный результат парсинга</p>
                        <blockquote>
                            <p>После парсинга в этой части интерфейса отобразиться результат в виде таблицы.</p>
                            <p>Данная таблица является лишь удобным инструментом для быстрой проверки правильности изначального текста статей.</p>
                            <p>Проверив все элементы и убедившись, что все распарсилось правильно, нажмите кнопку далее.</p>
                        </blockquote>
                    </div>
                    <div v-else>
                        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                            <thead>
                            <tr>
                                <th>Номер статьи</th>
                                <th>Заголовок статьи</th>
                                <th>Ключи</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="article in resultArray">
                                <th>{{article.number}}</th>
                                <th>{{article.name}}</th>
                                <th>
                                    <ul>
                                        <li v-for="key in article.keys">{{key}}</li>
                                    </ul>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <transition
                enter-active-class="animated slideInDown"
                leave-active-class="animated slideInUp"
        >
            <div class="notification-container" v-show="showNotification">
                <div class="notification is-info">
                    <button class="delete" @click="showNotification = false"></button>
                    Найдено {{resultArray.length}} статьи(ей)
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    const split = require('lodash.split');

    export default {
        name: 'home',
        data() {
            return {
                textarea: '',
                resultArray: [],
                showNotification: false,
            }
        },
        methods: {
            initialize() { // Данный метод срабатывает каждый раз при изменении текстового поля.
                this.resultArray = [];// Первым делом очищаем наш основной массив от предыдущего использования
                this.keyArray();
                console.log(this.resultArray);
                this.showNotify();
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
                resultObj.unique = articleName;
                return resultObj;
            },
            articleKeys(articlesTrimmed) {
                let finalArr = [];
                let withoutHead = function () { // Убираем заголовок и номер стать, оставляем толко ключи
                    let result;
                    result = articlesTrimmed.split('"').pop();
                    return result;
                };
                let extractAllKeys = function () { // Извлекаем все ключи в каждой статье, предварительно разделенные ','
                    let rawString = withoutHead();
                    let keysArr = rawString.split(",");
                    return keysArr;
                };
                return extractAllKeys();
            },
            showNotify() {
                this.showNotification = true;
                setTimeout(()=>{this.showNotification = false;},4000);
            },
            commit() {
                this.$store.commit('addKeys', this.resultArray);
                this.$router.push('about');
            }
        },

    }
</script>

<style lang="scss" scoped>
    .home {
        position: relative;
    }
    .notification-container {
        width: 250px;
        position: absolute;
        top: 10px;
        left: 50%;
    }
    .table-part {
        background: url(../assets/icons/table-solid.svg);
        background-size: 30% 30%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .animated {
        animation-duration: .75s;
        animation-fill-mode: both;
    }
    .buttons {
        margin-top: 20px;
    }
    @keyframes slideInDown {
        from {
            transform: translateY(-100px);
            visibility: visible;
        }

        to {
            transform: translateY(0);
        }
    }

    .slideInDown {
        animation-name: slideInDown;
    }
    @keyframes slideInUp {
        from {
            transform: translateY(0);
            visibility: visible;
        }

        to {
            transform: translateY(-100px);
        }
    }

    .slideInUp {
        animation-name: slideInUp;
    }
</style>
