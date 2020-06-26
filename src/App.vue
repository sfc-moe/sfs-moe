<template lang="pug">
#app
  el-container
    el-aside.aside(width="70px")
      el-menu.menu(:collapse="true")
        //- el-menu-item(index="1", v-if="!($route.path === '/login')", @click="$router.push('/timetable')")
        //-   i.el-icon-date
        //-   span(slot="title")
        //-     | {{ $t('timetable')}}
        el-menu-item(index="2", v-if="!($route.path === '/login')", @click="$router.push('/assignments')")
          i.el-icon-document
          span(slot="title")
            | {{ $t('assignments') }}
        //- el-menu-item(index="3", v-if="!($route.path === '/login')", @click="$router.push('/timetable')")
        //-   i.el-icon-guide
        //-   span(slot="title")
        //-     | {{ $t ('bustimer')}}
        el-menu-item(index="4", @click="navigate('https://vu.sfc.keio.ac.jp/sfc-sfs/')")
          i.el-icon-user
          span(slot="title")
            | {{ $t('goToSfs') }}
        el-menu-item(index="5", @click="navigate('https://wellness.sfc.keio.ac.jp/')")
          i.el-icon-baseball
          span(slot="title")
            | {{ $t('goToWellness') }}
        el-menu-item(index="6", @click="logOut")
          i.el-icon-key
          span(slot="title")
            | {{ $t('logOut') }}
        el-submenu(index="7")
          template(slot="title")
            i.el-icon-chat-line-square
            span(slot="title")
              | Language
          el-menu-item-group
            span(slot="title")
              | Language
            el-menu-item(@click="setLang('ja-jp')")
              | 日本語
            el-menu-item(@click="setLang('en-us')")
              | English
            el-menu-item(@click="setLang('hi-in')")
              | हिन्दी
            el-menu-item(@click="setLang('ko-kr')")
              | 한국어 (WIP)
            el-menu-item
              | ภาษาไทย (WIP)
            el-menu-item
              | Tiếng việt (WIP)
            el-menu-item(@click="setLang('zh-cn')")
              | 简体中文
            el-menu-item(@click="setLang('zh-tw')")
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
          a(:href="organizationLink" @click.prevent="navigate(organizationLink)")
            | sfc.moe
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import consts from '@/utils/consts';
import SfsAuth from '@/utils/sfs-auth';

@Component({})
export default class Home extends Vue {
  private sfsAuth: SfsAuth = new SfsAuth();

  private data() { return { organizationLink: consts.ORGANIZATION_LINK}; }

  private navigate(url: string) { window.open(url); }

  private setLang(lang: string) {
    this.$i18n.locale = lang;
    window.localStorage.setItem('language', lang);
  }

  private async logOut() {
    await this.sfsAuth.setProfile(null);
    this.$router.push('/login');
  }
}
</script>

<style lang="stylus">

#app
  color #2c3e50
  width 700px
  height 600px
  overflow-y scroll
  @media screen and (min-height: 601px)
    width 100%
    height 100vh

body
  margin 0
  padding 0
  width 700px
  height 600px
  font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  @media screen and (min-height: 601px)
    width 100%
    height 100vh

.aside
  height 600px
  position fixed
  @media screen and (min-height: 601px)
    height 100vh

.main
  margin-left 70px

.menu
  height 100%

.footer
  padding 0
  text-align center

.logo
  width 20px
  height 20px
  vertical-align middle
  margin 0 10px 0 0
</style>
