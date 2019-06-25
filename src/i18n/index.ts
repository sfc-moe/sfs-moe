import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './en-us';
import zhCN from './zh-cn';
import jaJP from './ja-jp';
Vue.use(VueI18n);

export default new VueI18n({
  locale: window.localStorage.getItem('language') || navigator.language.toLowerCase(),
  fallbackLocale: 'en-us',
  messages: {
    'en-us': enUS,
    'zh-cn': zhCN,
    'ja-jp': jaJP,
  },
});
