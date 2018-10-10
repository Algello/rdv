<template>
    <div class="content">
        <h4>Статья №{{number}}: 
        <span @dblclick = "name.edit = true"
         v-show="name.edit == false">{{name.val}}
         </span>
        <span><input class="change-input" type="text"
         v-show="name.edit == true"
          v-model="name.val"
          v-on:blur= "name.edit=false;"
        @keyup.enter = "name.edit=false;"
          ></span>
        </h4>
        <hr>
        <p class="heading">
            <span @dblclick = "headings[0].edit = true"
         v-show="headings[0].edit == false">{{headings[0].val}}</span>
        <span><input class="change-input--heading" type="text"
         v-show="headings[0].edit == true"
          v-model="headings[0].val"
          v-on:blur= "headings[0].edit=false;"
        @keyup.enter = "headings[0].edit=false;"
          ></span>
        </p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys1" class="dragArea" :options="{group:'keys'}">
                <li class="heading" v-for="(element, index) in keys1">{{element}} <input v-model="keys1[index]"></li>
            </draggable>
        </ul>
        <p class="heading">
            <span @dblclick = "headings[1].edit = true"
         v-show="headings[1].edit == false">{{headings[1].val}}</span>
        <span><input class="change-input--heading" type="text"
         v-show="headings[1].edit == true"
          v-model="headings[1].val"
          v-on:blur= "headings[1].edit=false;"
        @keyup.enter = "headings[1].edit=false;"
          ></span>
        </p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys2" class="dragArea" :options="{group:'keys'}">
                <li class="heading" v-for="element in keys2">{{element}}</li>
            </draggable>
        </ul>
        <p class="heading">
            <span @dblclick = "headings[2].edit = true"
         v-show="headings[2].edit == false">{{headings[2].val}}</span>
        <span><input class="change-input--heading" type="text"
         v-show="headings[2].edit == true"
          v-model="headings[2].val"
          v-on:blur= "headings[2].edit=false;"
        @keyup.enter = "headings[2].edit=false;"
          ></span>
        </p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys3" class="dragArea" :options="{group:'keys'}">
                <li class="heading" v-for="element in keys3">{{element}}</li>
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
            name: {
                val: '',
                edit: false
            },
            number: '',
            unique: '',
            headings: [
                {
                    val: '',
                    edit: false
                },
                {
                    val: '',
                    edit: false
                },
                {
                    val: '',
                    edit: false
                }
            ],
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
                keys: this.keys1.concat(this.keys2, this.keys3),

            }
        }
    },
    methods: {
        update() {
            this.myId = this.id;
            this.name.val = this.moddedArticle.name;
            this.number = this.moddedArticle.number;
            this.unique = this.moddedArticle.unique;
            this.headings.forEach((e,i)=>{
                e.val = this.moddedArticle.keys[i];
            });
            this.keys1 = this.moddedArticle.keys.slice(3,5);
            this.keys2 = this.moddedArticle.keys.slice(5,7);
            this.keys3 = this.moddedArticle.keys.slice(7,10);
        },
        keysMoved(e) {
            
        }
    },
    watch: {
        moddedArticle(val) {
            this.update();
        }
    },
    mounted() {
        this.update();
    },
    updated() {
        
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
</style>

