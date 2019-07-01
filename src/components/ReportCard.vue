<template lang="pug">
el-card.report-card(shadow="hover", @click.native="openAssignment", :body-style="{ background: bgColor }")
  p
    | {{ course }}
  p
    | {{ title }}
  p
    | {{ deadline }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import consts from '@/utils/consts';

@Component({})
export default class ReportCard extends Vue {
  @Prop(String) private course!: string;
  @Prop(String) private title!: string;
  @Prop(Date) private deadline!: Date;
  @Prop(String) private href!: string;
  @Prop(String) private bgColor!: string;

  private openAssignment() {
    chrome.tabs.create({ url: `${consts.SFS_HOST}/sfs_class/student/${this.href}` });
  }
}
</script>

<style lang="stylus" scoped>
.report-card
  margin 20px
  cursor pointer
  color #fff
</style>
