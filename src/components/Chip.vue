<template>
    <span @click="updateArticle" class="tag" :class="isActive">{{name}}</span>
</template>

<script>
    export default {
        name: "Chip",
        props: {
            name:{type:String},
            index: {type:Number}
            },
        methods: {
            updateArticle() {
                this.$store.commit('updateCurrentArticle', this.index);
            }
        },
        computed: {
            isActive() {
                if(this.index === this.$store.state.currentArticle) {
                    return 'is-info';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .tag {
        cursor: pointer;
        transition: all .3s;
    }
</style>