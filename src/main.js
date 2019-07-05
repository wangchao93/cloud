import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import animated from 'animate.css'
import echarts from 'echarts'

import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import global_ from './components/global.vue'
Vue.prototype.$echarts = echarts 

Vue.use(animated)

Vue.use(VueAxios,axios);

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.prototype.GLOBAL = global_;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
