<template>
    <div class="tags">
        <Chip v-for="article in mainArray" :name="article.name"></Chip>
    </div>
</template>

<script>
    import Chip from '@/components/Chip'
    export default {
        name: "Chips",
        computed: {
            mainArray() {
                return this.$store.state.keysArray;
            }
        },
        components: {
            Chip
        }
    }
</script>

<style scoped>

</style>