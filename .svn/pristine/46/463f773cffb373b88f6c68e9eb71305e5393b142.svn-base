<template>
  <div class="photoShow">
    <ul class="el-upload-list el-upload-list--picture-card">
      <li class="el-upload-list__item is-ready" v-for="item in dataList" :key="item.id">
        <img :src="item.imgUrl"  alt style="height: 100%" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in" @click="handlePictureCardPreview('', item.imgUrl)"></i>
          </span>
          <span clsas="el-upload-list__item-delete">
            <i class="el-icon-delete" @click="handleRemove('', '', item.id)"></i>
          </span>
        </span>
      </li><upload @fileChange="fileChange" class="avatar-uploader" :width="width" :height="height" ><i class="el-icon-plus"></i>
      </upload>
    </ul>
    
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import sha256 from 'sha256'
import Upload from '../../utils/upload.vue'
import moduleList from '../../../utils/module.js'
export default {
  props: {
    data: {},
    label: {}
  },
  data() {
    return {
      fileList: [],
      dataList: [],
      width: moduleList.photoSize[0].width,
      height: moduleList.photoSize[0].height,
      reloadShopList: false,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  components: {
    Upload
  },
  methods: {
    // 获得风采展示数据
    getDataList() {
      this.dataList = this.data
    },
    handleRemove(file, fileList, id) {
      if (id) {
        this.$http({
          url: this.$http.adornUrl(this.apiList.shop.photoShow.del),
          method: 'post',
          data: this.$http.adornData({ id: id }, this.apiList.shop.photoShow.del, true)
        }).then(({ data }) => {
          if (data.result) {
            this.dataList.splice(this.dataList.findIndex(v => v.id === id), 1)
            this.$emit('delSuccess', {label: this.label, id: id})
          }
        }).catch(() => {
          // this.$message.error('未知错误')
        })
      } else {
        this.$http({
          url: this.$http.adornUrl(this.apiList.shop.photoShow.del),
          method: 'post',
          data: this.$http.adornData({ id: file.id }, this.apiList.shop.photoShow.del, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$emit('delSuccess', {label: this.label, id: file.id })
          } else {
            // 删除失败
            this.fileList.push(file)
            
          }
        }).catch(() => {
          // this.$message.error('未知错误')
        })
      }
    },
    handlePictureCardPreview(file, url) {
      this.dialogImageUrl = file ? file.url : url
      this.dialogVisible = true
    },
    fileChange(data) {
      this.addData(data)
    },
    // beforeUpload() {
    //   console.log('beforeUpload')
    // },
    // success() {
    //   console.log('上传成功')
    // },
    change(file, fileList) {
      this.fileList = fileList
    },
    addData(url) {
      this.$http({
        url: this.$http.adornUrl(this.apiList.shop.photoShow.add),
        method: 'post',
        data: this.$http.adornData({ url: url, grouping: this.label }, this.apiList.shop.photoShow.add, true)
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          // 赋予文件id
          // this.dataList.push({imgUrl: url})
          // this.dataList[this.fileList.length - 1].id = data.data
          this.dataList.push({imgUrl: url, id: data.data})
          this.$emit('addSuccess', {
            label: this.label,
            imgUrl: url,
            id: data.data
          })
        } else {
          
        }
      }).catch(() => {
        // this.$message.error('未知错误')
      })
    }
  },
  created() {
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