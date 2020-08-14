<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
html,body{ 
  -ms-text-size-adjust:none;
  -webkit-text-size-adjust:none;
}
  .ql-snow .ql-picker-label::before{
    vertical-align: top;
  }
  .ql-snow .ql-color-picker .ql-picker-label svg, .ql-snow .ql-icon-picker .ql-picker-label svg {
    vertical-align: top;
  }

</style>
