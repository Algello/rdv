<template>
    <div class="content">
        <h4>Статья №{{number}}:
            <span><input class="change-input" type="text"
                         v-model="name"
            ></span>
        </h4>
        <hr>
        <p class="heading">
            <span><input class="change-input--heading" type="text"
                         v-model="headings[0]"
            ></span>
        </p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys1" class="dragArea" :options="{group:'keys'}">
                <li class="heading box" v-for="(element, index) in keys1"><input class="change-input--heading"
                                                                                 v-model="keys1[index]"><span><img
                        class="drag-icon"
                        src="../assets/icons/grip-horizontal-solid.svg" alt="drag&drop"></span></li>
            </draggable>
        </ul>
        <p class="heading">
            <span><input class="change-input--heading" type="text"
                         v-model="headings[1]"
            ></span>
        </p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys2" class="dragArea" :options="{group:'keys'}">
                <li class="heading box" v-for="(element, index) in keys2"><input class="change-input--heading"
                                                                                 v-model="keys2[index]"><span><img
                        class="drag-icon"
                        src="../assets/icons/grip-horizontal-solid.svg" alt="drag&drop"></span></li>
            </draggable>
        </ul>
        <p class="heading">
            <span><input class="change-input--heading" type="text"
                         v-model="headings[2]"
            ></span>
        </p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys3" class="dragArea" :options="{group:'keys'}">
                <li class="heading box" v-for="(element, index) in keys3"><input class="change-input--heading"
                                                                                 v-model="keys3[index]"><span><img
                        class="drag-icon"
                        src="../assets/icons/grip-horizontal-solid.svg" alt="drag&drop"></span></li>
            </draggable>
        </ul>
        <hr>
        <p class="is-size-7">Нигде больше не использовать слова и производные из них: <strong>{{unique}}</strong></p>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        data() {
            return {
                name: '',
                number: '',
                unique: '',
                headings: [],
                keys1: [],
                keys2: [],
                keys3: [],
                myId: null
            }
        },
        components: {
            draggable
        },
        computed: {
            moddedArticle() {
                return this.$store.state.keysArray[this.$store.state.currentArticle]
            },
            id() {
                return this.$store.state.currentArticle;
            },
            updatedArticle() {
                return {
                    keys: this.headings.concat(this.keys1, this.keys2, this.keys3),
                    name: this.name,
                    number: this.number,
                    unique: this.unique
                }
            }
        },
        methods: {
            update() {
                this.myId = this.id;
                this.name = this.moddedArticle.name;
                this.number = this.moddedArticle.number;
                this.unique = this.moddedArticle.unique;
                this.headings = this.moddedArticle.keys.slice(0,3);
                this.keys1 = this.moddedArticle.keys.slice(3, 5);
                this.keys2 = this.moddedArticle.keys.slice(5, 7);
                this.keys3 = this.moddedArticle.keys.slice(7, 10);
            },
            keysMoved(e) {

            }
        },
        watch: {
            moddedArticle(val) {
                this.update();
            },
            updatedArticle(val) {
                this.$store.commit('articleUpdate', val);
            }
        },
        mounted() {
            this.update();
        }
    }
</script>

<style lang="scss" scoped>
    .change-input {
        padding: 0;
        margin: 0;
        display: inline-block;
        width: 60%;
        color: #363636;
        font-size: 1em;
        font-weight: 600;
        line-height: 1.125;
        border: none;
        border-bottom: 2px solid #209cee;
        outline: none;
        &:focus {
            outline: none;
        }
    }

    .change-input--heading {
        margin: 0;
        padding: 0;
        display: block;
        font-size: 11px;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: 400;
        border: none;
        border-bottom: 1px solid #209cee;
        outline: none;
        width: 40%;
        &:focus {
            outline: none;
        }
    }

    li.heading {
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
        &:active {
            cursor: grabbing;
            cursor: -moz-grabbing;
            cursor: -webkit-grabbing;
        }
    }

    li input.change-input--heading {
        width: 90%;
        height: 30px;
    }
    .drag-icon {
        width: 20px;
        height: 20px;
    }
    li.heading.box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

