<template>
  <div class="itemDetail">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="活动介绍" name="first">
        <quill-editor ref="shopDetailInfo" :pro_content="fullText"  @contentChange="fullText_contentChange"/>
      </el-tab-pane>
      <el-tab-pane label="活动奖品" name="second">
        <quill-editor ref="shopDetailInfo1" :pro_content="prizeFullText"  @contentChange="prizeFullText_contentChange"/>
      </el-tab-pane>
      <el-tab-pane label="注意事项" name="third">
        <kv-edit v-if="render" :activityType="501" :activityId="activityPlanId"></kv-edit>
      </el-tab-pane>
      <el-tab-pane label="风采展示" name="fourth">
        <photo-show :photoList="photos" ref="photoshow"/>
        <!-- <quill-editor ref="shopDetailInfo3" :pro_content="photoFullText"  @contentChange="photoFullText_contentChange"/> -->
      </el-tab-pane>
    </el-tabs>
    <div class="margin_left" v-show="activeName !== 'third'">
      <el-button type="primary" @click="submit">提交修改</el-button>
    </div>
  </div>
</template>
<script>
import quillEditor from '../../utils/editor'
import PhotoShow from './PhotoShow.vue'
import kvEdit from '../utils/kv_.vue'
export default {
  data() {
    return {
      activityPlanId: 0,
      activeName: 'first',
      fullText: '',
      prizeFullText: '',
      attenFullText: '',
      photos: '',
      render: false
    }
  },
  components: {
    quillEditor,
    PhotoShow,
    kvEdit
  },
  methods: {
    init({ data }) {
      const activityPlanId = data.activityId
      this.activityPlanId = data.activityId
      this.render = true
      const url = this.apiList.shop.activityPlan.detail
      console.log(activityPlanId)
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({id: activityPlanId}, url, true)
      }).then(({ data }) => {
        this.fullText = data.data.fullText
        this.prizeFullText = data.data.prizeFullText
        this.attenFullText = data.data.attenFullText
        this.photos = data.data.photos ? data.data.photos : '[]'
      })
    },
    // 修改活动介绍页面
    fullText_contentChange(data) {
      this.fullText = data
    },
    // 修改活动介绍页面
    prizeFullText_contentChange(data) {
      this.prizeFullText = data
    },
    // 修改活动介绍页面
    attenFullText_contentChange(data) {
      this.attenFullText = data
    },
    // 修改活动介绍页面
    // photoFullText_contentChange(data) {
    //   this.photoFullText = data
    // },
    // 点击提交
    submit() {
      const url = this.apiList.shop.activityPlan.edit
      const formData = {
        id: this.activityPlanId,
        fullText: this.fullText,
        prizeFullText: this.prizeFullText,
        attenFullText: this.attenFullText,
        photos: JSON.stringify(this.$refs.photoshow.dataList)
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(formData, url, true),
      }).then(({ data }) => {
        if (data.result) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          // this.$message(data.msg)
        }
        this.$emit('close')
      })
    }
  }
}
</script>
<style lang="scss">
.itemDetail{
  .margin_left{
    margin-top: 16px;
    text-align: right;
  }
}
</style>