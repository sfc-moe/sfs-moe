import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './en-us';
import hiIn from './hi-in';
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
    'hi-in': hiIn,
    'ja-jp': jaJP,
    'ko-kr': koKr,
    'zh-cn': zhCN,
    'zh-tw': zhTW,
  },
});
