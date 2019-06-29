<template lang="pug">
#assignments
  .upcoming
    h2
      | {{ $t('upcoming') }}
    report-card(
      v-for="a in assignmentsUpcoming",
      key="a.link",
      bg-color="#1862ff",
      :course="a.course",
      :title="a.title",
      :href="a.link"
      :deadline="a.deadline")
  .missed
    h2
      | {{ $t('missed') }}
    report-card(
      v-for="a in assignmentsMissed",
      key="a.link",
      bg-color="#212121",
      :course="a.course",
      :title="a.title",
      :href="a.link"
      :deadline="a.deadline")
  .finished
    h2
      | {{ $t('finished') }}
    report-card(
      v-for="a in assignmentsFinished",
      key="a.link",
      bg-color="#1ed280",
      :course="a.course",
      :title="a.title",
      :href="a.link"
      :deadline="a.deadline")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as queryString from 'query-string';
import ReportCard from '@/components/ReportCard.vue';
import consts from '@/utils/consts';
import converter from '@/utils/converter';
import SfsAuth from '@/utils/sfs-auth';

interface Assignment {
  course: string;
  submitted: boolean;
  deadline: Date;
  title: string;
  link: string;
}

@Component({
  components: {
    'report-card': ReportCard,
  },
})
export default class Assignments extends Vue {
  private sfsAuth: SfsAuth = new SfsAuth();
  private assignments: Assignment[] = [];

  private mounted() {
    this.fetchAssignments();
  }

  private get assignmentsUpcoming(): Assignment[] {
    return this.assignments
      .filter((a) => a.submitted === false)
      .filter((a) => a.deadline >= new Date(Date.now()))
      .sort((d1, d2) => d1.deadline.getTime() - d2.deadline.getTime());
  }

  private get assignmentsMissed(): Assignment[] {
    return this.assignments
      .filter((a) => a.submitted === false)
      .filter((a) => a.deadline < new Date(Date.now()))
      .sort((d1, d2) => d1.deadline.getTime() - d2.deadline.getTime())
      .reverse();
  }

  private get assignmentsFinished(): Assignment[] {
    return this.assignments
      .filter((a) => a.submitted === true)
      .sort((d1, d2) => d1.deadline.getTime() - d2.deadline.getTime())
      .reverse();
  }

  private async fetchAssignments() {
    const loading = this.$loading({
      lock: true,
      text: this.$t('loading') as string,
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
    const assignments = await Promise.all(Array.from(links).map(async (link) => {
      const resAssignment = await fetch(link);
      const bodyStr = decoder.decode(await resAssignment.arrayBuffer());
      const parser = new DOMParser();
      const domAssignment = new DOMParser().parseFromString(bodyStr, 'text/html');
      const reportLinks = Array.from(domAssignment.querySelectorAll('a[target="report"]')).map((ele) => {
        const a = ele as HTMLLinkElement;
        const deadline = a.parentElement!.textContent!.match(/deadline: (.*?)\/(.*?) (.*?):(.*?),/)!;

        return {
          course: domAssignment.querySelector('h3.one')!.textContent!.split('\n')[1],
          submitted: !(a.parentElement!.textContent!.includes('未提出')),
          deadline: converter.getTermDeadline(
            Number(deadline[1]), Number(deadline[2]), Number(deadline[3]), Number(deadline[4])),
          title: a.innerText,
          link: a.getAttribute('href')!,
        };
      });
      return reportLinks;
    }));

    this.assignments = assignments.flat();
    loading.close();
  }
}
</script>

<style lang="stylus" scoped>
#assignments
  height 100%
  overflow auto
</style>
