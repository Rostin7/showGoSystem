<template>
<div class="copyValue">
  <input type="text" ref="copyInout" v-model="copyValue" class="input">
  <el-button @click="copyContent" type="text" icon="el-icon-document" >点击复制</el-button>
</div>
</template>
<script>
export default {
  props: {
    copyValue: {}
  },
  methods: {
    copyContent(){
      //获取点击的值
      this.$refs.copyInout.select()
      document.execCommand("Copy")
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.copyValue{
  .input{
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 10px;
    height: 10px;
  }
}
</style>