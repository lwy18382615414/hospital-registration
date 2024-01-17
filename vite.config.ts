import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
//引入node提供的内置模块path:
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        })
    ],
    //src文件夹配置别名
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src')
        }
    },
    //配置代理跨域
    server: {
        proxy: {
            '/api': {
                target: 'http://syt.atguigu.cn',
                changeOrigin: true,
            }
        }
    }
})
