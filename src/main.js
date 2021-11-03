import './scss/main.scss'
import * as Vue from 'vue'
import App from './App.vue'
import store from '~/store'

const app = Vue.createApp(App)
app.use(store)
app.mount('#app')

// 아래와 같은 방법으로도 가능
// import { createApp } from 'vue'
// import App from './App.vue'

// const app = createApp(App)
// app.mount('#app')