<template lang="pug">
#app
  el-container
    el-aside.aside(width="70px")
      el-menu.menu(:collapse="true")
        el-menu-item(index="1")
          i.el-icon-date
          span(slot="title")
            | {{ $t('timetable') }}
        el-menu-item(index="2")
          i.el-icon-document
          span(slot="title")
            | {{ $t('assignments') }}
        el-menu-item(index="3", @click="navigate('https://vu.sfc.keio.ac.jp/sfc-sfs/')")
          i.el-icon-user
          span(slot="title")
            | {{ $t('goToSfs') }}
        el-menu-item(index="4", @click="navigate('http://wellness.sfc.keio.ac.jp/')")
          i.el-icon-baseball
          span(slot="title")
            | {{ $t('goToWellness') }}
        el-menu-item(index="5")
          i.el-icon-key
          span(slot="title")
            | 登出
        el-submenu(index="6")
          template(slot="title")
            i.el-icon-chat-line-square
            span(slot="title")
              | Language
          el-menu-item-group
            span(slot="title")
              | Language
            el-menu-item
              | 日本語 (WIP)
            el-menu-item(@click="setLang('en-us')")
              | English
            el-menu-item
              | हिंदी (WIP)
            el-menu-item
              | 한국어 (WIP)
            el-menu-item
              | ภาษาไทย
            el-menu-item
              | Tiếng việt (WIP)
            el-menu-item(@click="setLang('zh-cn')")
              | 简体中文
            el-menu-item
              | 繁體中文
            el-menu-item(@click="navigate('https://t.me/joinchat/BZajARWmEBaqW-4jpYXzJA')")
              | Contribute Your Language...
    el-container
      el-main.main
        router-view
      el-footer.footer
        img.logo(src="/static/logo.png")
        span.footer-span
          | Made with ❤️️ by 
          a(href="https://github.com/keio-moe")
            | keio.moe
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  private navigate(url: string) { window.open(url); }
  private setLang(lang: string) {
    this.$i18n.locale = lang;
    window.localStorage.setItem('language', lang);
  }
}
</script>

<style lang="stylus">
#app
  color #2c3e50
  width 800px
  height 600px

body
  margin 0
  font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.aside
  height 600px
  position fixed

.main
  margin-left 70px
  height: 600px

.menu
  height 100%

.footer
  text-align center

.logo
  width 20px
  height 20px
  vertical-align middle
  margin 0 10px 0 0
</style>
