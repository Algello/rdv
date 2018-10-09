<template>
    <div class="content preview">
        <h1>ТЕХНИЧЕСКОЕ ЗАДАНИЕ ({{article.name}})</h1>
        <br>
        <div class="preview-block">
            <p><strong>{{article.keys[0]}}</strong></p>
            <ul>
                <li>{{article.keys[3]}} <span class="requirements">1 абзац – в первом предложении (не с первого слова)</span></li>
                <li>{{article.keys[4]}} <span class="requirements">2 абзац – не в первом предложении (не с первого слова)</span></li>
            </ul>
        </div>
        <br>
        <div class="preview-block">
            <p><strong>{{article.keys[1]}}</strong></p>
            <ul>
                <li>{{article.keys[5]}} <span class="requirements">3 абзац – в первом предложении (не с первого слова)</span></li>
                <li>{{article.keys[6]}} <span class="requirements">4 абзац – не в первом предложении (не с первого слова)</span></li>
            </ul>
        </div>
        <br>
        <div class="preview-block">
            <p><strong>{{article.keys[2]}}</strong></p>
            <ul>
                <li>{{article.keys[7]}} <span class="requirements">5 абзац – в первом предложении (не с первого слова)</span></li>
                <li>{{article.keys[8]}} <span class="requirements">6 абзац – не в первом предложении (не с первого слова)</span></li>
                <li>{{article.keys[9]}} <span class="requirements">7 абзац – не в первом предложении (не с первого слова)</span></li>
            </ul>
        </div>
        <br>
        <hr>
        <div class="rules">
            <ol>
                <li>Нигде больше не использовать слова и производные из них:  <strong>{{article.unique}}</strong></li>
                <li>Один раз по тексту используем фразу: <strong>компания «Региональный Дом Металла»</strong></li>
                <li>Тексты писать от имени компании, используя <strong>«мы», «наши»</strong> и т.д.</li>
                <li>Объем статьи: <strong>2500 символов без пробелов</strong></li>
                <li>Уникальность статьи: <strong>96-100%</strong></li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        article() {
                return this.$store.state.keysArray[this.$store.state.currentArticle];
        }
    }
}
</script>


<style scoped lang="scss">
    .preview {
        margin: 0 auto;
    }
    .requirements {
        font-weight: bold;
        background-color: yellow;
    }
    .preview-block ul li {
        list-style-type: none;
        &:before {
            content: "-";
        }
    }
</style>
