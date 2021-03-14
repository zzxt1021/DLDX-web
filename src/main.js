import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import md5 from 'js-md5';
import * as echarts from 'echarts'

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'  //关键代
//axios.defaults.baseURL = ''  //关键代

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh', 
    messages
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
