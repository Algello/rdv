<template>
    <h1>hello from {{article.name}}</h1>
</template>

<script>
import {Article} from "../assets/Classes/article"
    export default {
        name: "TestComponent",
        data() {
            return {
                article: new Article(`Статья 1 "задвижка клиновая фланцевая"
ключ 1,
ключ 2,
ключ 3,
ключ 4,
ключ 5,
ключ 6,
ключ 7,
ключ 8,
ключ 9,
ключ 10`)
            }
        }
    }
</script>

<style scoped>

</style>