<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      sizeOptions: [
        { label: '默认字号', value: 'default' },
        { label: '中等字号', value: 'medium' },
        { label: '小型字号', value: 'small' },
        { label: '超小字号', value: 'mini' }
      ]
    }
  },
  computed: {
    size() {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size
      this.$store.dispatch('app/setSize', size)
      this.refreshView()
      this.$message({ 
        message: 'Switch Size Success',
        type: 'success'
      })
    },
    refreshView() {
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)
      const { fullPath } = this.$route
      // this.$nextTick(() => {
      //   this.$router.replace({
      //     path: '/redirect' + fullPath
      //   })
      // })
      setTimeout(() => {
        window.loacation.reload()
      }, 600)
    }
  }

}
</script>
