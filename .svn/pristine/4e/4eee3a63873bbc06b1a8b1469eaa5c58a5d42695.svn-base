<template>
<div class="photoShow">
  <ul class="el-upload-list el-upload-list--picture-card">
    <li class="el-upload-list__item is-ready" v-for="(item, index) in dataList" :key="index"  style="width: 122px;height: 127px; line-height: 127px">
      <img :src="item"  alt style="height: 100%" />
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview">
          <i class="el-icon-zoom-in" @click="handlePictureCardPreview('', item)"></i>
        </span>
        <span clsas="el-upload-list__item-delete">
          <i class="el-icon-delete" @click="handleRemove(item)"></i>
        </span>
      </span>
    </li><upload @fileChange="fileChange" class="avatar-uploader" style="width: 122px;height: 127px; line-height: 127px"><i class="el-icon-plus"></i>
    </upload>
  </ul>
  <el-dialog :visible.sync="dialogVisible" :modal="false">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>
<script>
import sha256 from 'sha256'
import Upload from '../utils/proupload.vue'
export default {
  props: {
    data: {}
  },
  data() {
    return {
      fileList: [],
      dataList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  components: {
    Upload
  },
  methods: {
    getDataList() {
      this.data ? this.dataList = JSON.parse(this.data) : this.dataList = []
    },
    handleRemove(item) {
      const index = this.dataList.indexOf( item )
      this.dataList.splice(index, 1)
      this.$emit('changeData', JSON.stringify(this.dataList))
    },
    handlePictureCardPreview(file, item) {
      this.dialogImageUrl = item
      this.dialogVisible = true
    },
    fileChange(data) {
      this.dataList.push(data)
      this.$emit('changeData', JSON.stringify(this.dataList))
    }
  }
}
</script>
<style lang="scss">
.photoShow{
  p{
    margin-top: 0;
    padding-left: 20px;
    font-size: 12px;
    color: #666;
  }
  .el-upload-list{
    .el-upload-list__item{
      width: 70px;
      height: 70px;
      // margin: 20px;
    }
  }
  .avatar-uploader{
    width: 70px;
    height: 70px;
    line-height: 70px;
    // margin: 20px;
  }
  .avatar-uploader:hover{
    border-color: #E51D27;
  }
  .el-icon-plus{
    font-size: 33px;
    color: #E51D27;
    vertical-align: middle;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions span + span{
    margin-left: 3px;
  }
}
</style>
