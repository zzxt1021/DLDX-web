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
import * as echarts from 'echarts';
import { Loading } from 'element-ui'

import axios from 'axios'
Vue.prototype.$axios = axios
//axios.defaults.baseURL = '/api'  //关键代
axios.defaults.baseURL = ''  //关键代

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.openLoading = function() {
    const loading = this.$loading({           // 声明一个loading对象
      lock: true,                             // 是否锁屏
      text: '正在加载...',                     // 加载动画的文字
      //spinner: 'el-icon-loading',             // 引入的loading图标
      background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
      target: '.sub-main',                    // 需要遮罩的区域
      body: true,                              
      customClass: 'mask'                     // 遮罩层新增类名
    })
    return loading;
  }
const i18n = new VueI18n({
    locale: 'zh', 
    messages
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
