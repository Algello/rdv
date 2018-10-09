<template>
    <span @click="updateArticle" class="tag">{{name}}</span>
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
                console.log(this.$store.state.keysArray[this.$store.state.currentArticle]);
            }
        }
    }
</script>

<style scoped>

</style>