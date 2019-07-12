import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './en-us';
import jaJP from './ja-jp';
import koKr from './ko-kr';
import zhCN from './zh-cn';
import zhTW from './zh-tw';
Vue.use(VueI18n);

export default new VueI18n({
  locale: window.localStorage.getItem('language') || navigator.language.toLowerCase(),
  fallbackLocale: 'en-us',
  messages: {
    'en-us': enUS,
    'ko-kr': koKr,
    'ja-jp': jaJP,
    'zh-cn': zhCN,
    'zh-tw': zhTW,
  },
});
