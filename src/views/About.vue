<template>
    <div class="about">
        <div class="column">
            <div class="box">
                <Chips></Chips>
            </div>
            <div class="columns">
                <div class="column is-4">
                    <div class="box">
                        <article-editor v-if="this.$store.state.currentArticle !== null"></article-editor>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Chips from '@/components/Chips.vue'
    import ArticleEditor from '@/components/ArticleEditor.vue'
    export default {
        components: {
            Chips,
            ArticleEditor
        },
        computed: {
            currentArticle() {
                return this.$store.state.keysArray[this.$store.state.currentArticle];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .no-dots {
        list-style-type: none;
    }
</style>

