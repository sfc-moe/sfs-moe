<template lang="pug">
#timetable
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as queryString from 'query-string';
import ReportCard from '@/components/ReportCard.vue';
import consts from '@/utils/consts';
import converter from '@/utils/converter';
import SfsAuth from '@/utils/sfs-auth';

@Component({})
export default class Timetable extends Vue {
  private sfsAuth: SfsAuth = new SfsAuth();

  private mounted() {
    this.fetchTimetable();
  }

  private async fetchTimetable() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    const query = queryString.stringify({
      id: await this.sfsAuth.getToken(),
      term: converter.getTerm(),
      fix: 1,
      lang: 'ja',
    });

    const decoder = new TextDecoder('euc-jp');
    const res = await fetch(`${consts.SFS_HOST}/sfs_class/student/view_timetable.cgi?${query}`);
    const dom = new DOMParser().parseFromString(await decoder.decode(await res.arrayBuffer()), 'text/html');
    const links = new Set(Array.from(dom.querySelectorAll('td > a')).map((ele) => {
      const a = (ele as HTMLLinkElement);
      return a.href;
    }));
    const timetable = await Promise.all(Array.from(links).map(async (link) => {
      const resAssignment = await fetch(link);
      const bodyStr = decoder.decode(await resAssignment.arrayBuffer());
      const parser = new DOMParser();
      const domAssignment = new DOMParser().parseFromString(bodyStr, 'text/html');

      // Working in Progress
    }));
    loading.close();
  }
}
</script>

<style lang="stylus" scoped>
#timetable
  height 100%
  overflow auto
</style>
