import {createApp} from 'vue'
import App from '@/App.vue'
import '@/style/reset.scss'
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './index.scss'
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import 'virtual:svg-icons-register'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')
