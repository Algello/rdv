<template>
    <div id="app">
        <img src="./assets/logo.png">
        <div>
            <p>
                If Element is successfully added to this project, you'll see an
                <code v-text="'<el-button>'"></code>
                below
            </p>
            <el-button type="success">el-button</el-button>
            <div>
                <el-radio v-model="radio7" label="1" border>Option A</el-radio>
                <el-radio v-model="radio7" label="2" border>Option B</el-radio>
            </div>

        </div>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        data () {
            return {
                radio7: '1',
                radio8: '1',
                radio9: '1',
                radio10: '1'
            };
        },
        components: {
            HelloWorld
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
