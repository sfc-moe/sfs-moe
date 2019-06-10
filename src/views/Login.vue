<template lang="pug">
#login
  .logo-container
    img.logo(src="/static/logo.png")
  el-form.form(label-position="right", label-width="120px")
    el-form-item(label="CNS 用户名")
      el-input(v-model="username")
    el-form-item(label="CNS 密码")
      el-input(type="password", v-model="password")
    el-form-item.form-center
      span
        i.el-icon-lock
      span.security-note
        | CNS 用户名密码只会被保存在插件本地，不会被发送给任何第三方。
    el-form-item(label="记住密码")
      el-switch(v-model="autoLogin")
    el-form-item
      el-button(type="primary", @click="login")
        | 登录
      el-button(@click="navigate('http://www.sfc.itc.keio.ac.jp/ja/faq_sfc_1.html')")
        | 忘记密码
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as httpm from 'typed-rest-client/HttpClient';
import * as queryString from 'query-string';
import consts from '@/utils/consts';
import SfsAuth from '@/utils/sfs-auth';

@Component({})
export default class Login extends Vue {
  private sfsAuth: SfsAuth = new SfsAuth();
  private http = new httpm.HttpClient(window.navigator.userAgent);
  private username: string = '';
  private password: string = '';
  private autoLogin: boolean = false;

  private navigate(url: string) { window.open(url); }
  private async login() {
    const res = await this.http.post(
      `${consts.SFS_HOST}/login.cgi`,
      queryString.stringify({
        u_login: this.username,
        u_pass: this.password,
        lang: 'ja',
      }),
    );
    const dom = new DOMParser().parseFromString(await res.readBody(), 'text/html');
    const meta = dom.querySelector('meta[http-equiv~="refresh"]');
    if (meta === null) {
      this.$message.error('登录失败，用户名或密码错误。');
      this.username = '';
      this.password = '';
      this.sfsAuth.setProfile(null);
      return;
    }
    if (this.autoLogin) { this.sfsAuth.setProfile({ username: this.username, password: this.password }); }

    // TODO: Tricky Hard-coded rules, require refactoring later.
    const url = meta.attributes.getNamedItem('content')!.nodeValue!.slice(7);
    const params = queryString.parse(new URL(url).search);
    await this.sfsAuth.setToken(params.id as string);
  }

  private async fetchStorage() {
    const profile = await this.sfsAuth.getProfile();
    if (profile !== null) {
      this.username = profile.username;
      this.password = profile.password;
      this.autoLogin = true;
    }
  }

  private mounted() {
    this.fetchStorage();
  }
}
</script>

<style lang="stylus" scoped>
.logo-container
  width 100%
  text-align center
.logo
  width 100px
  height 100px
  margin 0 0 40px 0
.form
  width 90%
.form-center
  text-align center
.security-note
  margin 0 0 0 10px
</style>
