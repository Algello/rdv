<template>
    <div class="content">
        <h4>Статья №{{moddedArticle.number}}: {{moddedArticle.name}}</h4>
        <hr>
        <p class="heading">{{headings[0]}}</p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys1" class="dragArea" :options="{group:'keys'}">
                <li class="heading" v-for="element in keys1">{{element}}</li>
            </draggable>
        </ul>
        <p class="heading">{{headings[1]}}</p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys2" class="dragArea" :options="{group:'keys'}">
                <li class="heading" v-for="element in keys2">{{element}}</li>
            </draggable>
        </ul>
        <p class="heading">{{headings[2]}}</p>
        <ul class="no-dots">
            <draggable @update="keysMoved" @add="keysMoved" v-model="keys3" class="dragArea" :options="{group:'keys'}">
                <li class="heading" v-for="element in keys3">{{element}}</li>
            </draggable>
        </ul>
        <hr>
        <p class="is-size-7">Нигде больше не использовать слова и производные из них: <strong>{{moddedArticle.unique}}</strong></p>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    data() {
        return {
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
        headings() {
            return this.moddedArticle.keys.slice(0,3);
        },
        firstKeys() {
            return this.moddedArticle.keys.slice(3,5);
        },
        secondKeys() {
            return this.moddedArticle.keys.slice(5,7);
        },
        thirdKeys() {
            return this.moddedArticle.keys.slice(7,10);
        },
        id() {
            return this.$store.state.currentArticle;
        }
    },
    methods: {
        update() {
            this.myId = this.id;
            this.keys1 = this.firstKeys;
            this.keys2 = this.secondKeys;
            this.keys3 = this.thirdKeys;
        },
        keysMoved(e) {
            console.log(e);
        }
    },
    mounted() {
        this.update();
    },
    updated() {
        if(this.myId != this.id) {
            this.update();
        }
    }

}
</script>
