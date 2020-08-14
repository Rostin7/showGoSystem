<template>
<div class="photoShow">
  <ul class="el-upload-list el-upload-list--picture-card">
    <li class="el-upload-list__item is-ready" v-for="item in dataList" :key="item.id">
      <img :src="item.imgUrl"  alt style="height: 100%" />
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview">
          <i class="el-icon-zoom-in" @click="handlePictureCardPreview('', item)"></i>
        </span>
        <span clsas="el-upload-list__item-delete">
          <i class="el-icon-delete" @click="handleRemove(item)"></i>
        </span>
      </span>
    </li><upload @fileChange="fileChange" class="avatar-uploader" :width="width" :height="height" v-show = "dataList.length < 8"><i class="el-icon-plus"></i>
    </upload>
  </ul>
  <p>建议尺寸：640 x 640 像素，最多可上传8张图片。 </p>
  <el-dialog :visible.sync="dialogVisible" :modal="false">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>
<script>
import sha256 from 'sha256'
import Upload from '../../utils/proupload.vue'
import moduleList from '../../../utils/module.js'
export default {
  props: {
    activityId: {},
    activityType: {}
  },
  data() {
    return {
      fileList: [],
      dataList: [],
      width: moduleList.photoSize[0].width,
      height: moduleList.photoSize[0].height,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  components: {
    Upload
  },
  methods: {
    getDataList() {
      const url = this.apiList.shop.activePhotoShow.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ activityType: this.activityType, activityId: this.activityId }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = data.data
        }
      }).catch(() => {
      })
    },
    handleRemove(item) {
      const url = this.apiList.shop.activePhotoShow.del
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ id: item.id }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getDataList()
        }
      }).catch(() => {
      })
    },
    handlePictureCardPreview(file, item) {
      this.dialogImageUrl = file ? file.url : item.imgUrl
      this.dialogVisible = true
    },
    fileChange(data) {
      const url = this.apiList.shop.activePhotoShow.add
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ activityType: this.activityType, activityId: this.activityId, url: data }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.getDataList()
        }
      }).catch(() => {
      })
    }
  },
  mounted() {
    this.getDataList()
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
      margin: 20px;
    }
  }
  .avatar-uploader{
    width: 70px;
    height: 70px;
    line-height: 70px;
    margin: 20px;
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
