import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ipc } from '@/utils/ipcRenderer'

const app = createApp(App)
app.provide("$ipc",ipc)
console.log(ipc, 'ipcipc')

app.use(store).use(router)
.mount('#app')
