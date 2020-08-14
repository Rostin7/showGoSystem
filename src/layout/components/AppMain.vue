<template>
  <!-- <section class="app-main isIndex" :class="{'isIndex': key == '/dashboard'}"> -->
  <section class="app-main isIndex">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 58px);
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px;
  background: #eee;
  min-width: 1200px;
}
.isIndex{
  // padding: 0;
  background: url('../../assets/index/mainIndexBg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // padding-right: 0;
}

.fixed-header+.app-main {
  padding-top: 58px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
