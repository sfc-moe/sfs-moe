<template lang="pug">
#login
  .logo-container
    img.logo(src="/static/logo.png")
  el-form.form(label-position="right", label-width="150px")
    el-form-item(:label="$t('cnsUsername')")
      el-input(v-model="username")
    el-form-item(:label="$t('cnsPassword')")
      el-input(type="password", v-model="password")
    el-form-item.form-center
      span
        i.el-icon-lock
      span.security-note
        | {{ $t('passwordSecurity') }}
    el-form-item(:label="$t('rememberPassword')")
      el-switch(v-model="autoLogin")
    el-form-item
      el-button(type="primary", @click="login")
        | {{ $t('login') }}
      el-button(@click="navigate('http://www.sfc.itc.keio.ac.jp/ja/faq_sfc_1.html')")
        | {{ $t('forgetPassword') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as queryString from 'query-string';
import consts from '@/utils/consts';
import SfsAuth from '@/utils/sfs-auth';

@Component({})
export default class Login extends Vue {
  private sfsAuth: SfsAuth = new SfsAuth();
  private username: string = '';
  private password: string = '';
  private autoLogin: boolean = false;

  private navigate(url: string) { window.open(url); }
  private async login() {
    const res = await fetch(`${consts.SFS_HOST}/login.cgi`, {
      method: 'POST',
      body: queryString.stringify({
        u_login: this.username,
        u_pass: this.password,
        lang: 'ja',
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const dom = new DOMParser().parseFromString(await res.text(), 'text/html');
    const meta = dom.querySelector('meta[http-equiv~="refresh"]');
    if (meta === null) {
      this.$message.error(this.$t('loginFailed') as string);
      return;
    }
    if (this.autoLogin) { this.sfsAuth.setProfile({ username: this.username, password: this.password }); }

    // TODO: Tricky Hard-coded rules, require refactoring later.
    const url = meta.attributes.getNamedItem('content')!.nodeValue!.slice(7);
    const params = queryString.parse(new URL(url).search);
    await this.sfsAuth.setToken(params.id as string);

    // Get if the timetable is fixed
    const query = queryString.stringify({
      id: (params.id as string),
      type: 's',
      mode: 1,
      lang: 'ja',
    });

    const decoder = new TextDecoder('euc-jp');
    const resTimetable = await fetch(`${consts.SFS_HOST}/portal_s/s01.cgi?${query}`);
    const domTimetable = new DOMParser().parseFromString(
      await decoder.decode(await resTimetable.arrayBuffer()), 'text/html');
    const frame = domTimetable.querySelector('#frame_set');
    const frameUrl = frame!.attributes.getNamedItem('src')!.nodeValue;
    const frameParams = queryString.parse(frameUrl!);
    const fix = (frameParams.fix as string);
    await this.sfsAuth.setFix(fix);

    this.$router.push('/assignments');
  }

  private async fetchStorage() {
    const profile = await this.sfsAuth.getProfile();
    if (profile !== null) {
      this.username = profile.username;
      this.password = profile.password;
      this.autoLogin = true;
    }
  }

  private async autoLoginTrigger() {
    await this.fetchStorage();
    if (this.autoLogin) {
      await this.login();
    }
  }

  private mounted() {
    this.autoLoginTrigger();
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
