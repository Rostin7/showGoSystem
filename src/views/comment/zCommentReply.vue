<template>
  <div class="commentDetail">
    <el-card>
      <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="15">
        <el-col :span="18">
          <div class="header">
            <h2>{{ dataDetail.title }}</h2>
            <p class="clearFloat clearfix">
              <span class="right"><svg-icon icon-class="点赞" />{{ dataDetail.zanNum }}</span>
              <span class="right" @click="dialogFormVisible = true"><svg-icon icon-class="回复" />{{ dataDetail.smallNum }}</span>
            </p>
          </div>
          <div>
            {{ dataDetail.content }}
          </div>
          <div class="imgContainer">
            <p v-for="(item, index) in dataDetail.imgs" :key="index"><img :src="item" alt=""></p>
          </div>
          <!-- 回帖 -->
          <fieldset class="layui-field-title" style="margin-top: 30px;">
            <legend>回帖</legend>
          </fieldset>
          <div class="return">
            <return-child v-for="item in dataList" :key="item.id" :parentId="commentId" :commentId="item.id" @delSelf="delSelf(item.id)" :data="item"/>
          </div>
          <p class="loadMore" @click="getNext" v-if="page < totlePage">加载更多<i class="el-icon-arrow-down" /></p>
          <p class="loadMore" v-else >暂无更多</p>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="提交" :visible.sync="dialogFormVisible" :modal="true" width="600px">
      <return-form :commentId="commentId" :type="100" :toUid="dataDetail.toUid" v-if="dialogFormVisible" @cancel="dialogFormVisible=false" @success="success"/>
    </el-dialog>
  </div>
</template>
<script>
import { treeDataTranslate } from '@/utils/getTree.js'
import ReturnChild from './zReturnChild'
import ReturnForm from './zReturrnForm'
export default {
  data() {
    return{
      commentId: '',
      dialogFormVisible: false,
      page: 1,
      pageSize: 10,
      totlePage: 1,
      dataDetail: {
        toUid: '',
        title: '',
        content: '',
        imgs: [],
        avatar: '',
        name: '',
        zanNum: '',
        zaned: '',
        smallNum: ''
      },
      dataList: []
    }
  },
  components: {
    ReturnChild,
    ReturnForm
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    // 初始化帖子数据
    init(id) {
      this.commentId = id
      const url = this.apiList.zComment.detail
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ commentId: id }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataDetail.title = data.data.title
          this.dataDetail.content = data.data.content
          this.dataDetail.imgs = data.data.imgUrls ? JSON.parse(data.data.imgUrls) : []
          this.dataDetail.avatar = data.data.avatar ? data.data.avatar : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559642438899&di=58a3bd432d00cf75b5e8db0143fe03ed&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg'
          this.dataDetail.name = data.data.name ? data.data.name : '众享乐用户'
          this.dataDetail.zanNum = data.data.zanNum
          this.dataDetail.zaned = data.data.zaned
          this.dataDetail.mallNum = data.data.mallNum
          this.dataDetail.smallNum = data.data.replyNum
          this.dataDetail.toUid = data.data.fromUid
        }
      })
    },
    getDataList() {
      const url = this.apiList.zComment.returnList
       this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ commentId: this.commentId, page: this.page, size: this.pageSize,replyType: 100 }, url, true)
      }).then(({ data }) => {
        const DataList = treeDataTranslate(data.data.records, 'id', 'replyId')
        this.dataList = this.dataList.concat(DataList)
        this.totlePage = data.data.pages
      })
    },
    success() {
      this.dialogFormVisible = false
      // this.getChildList()
      this.dataList = []
      this.getDataList()
    },
    getNext() {
      this.page++
      this.getDataList()
    },
    delSelf(id) {
      const _idx = this.dataList.findIndex( item => item.id === id)
      if (_idx !== -1) {
        this.dataList.splice(_idx, 1)
      }
    }
  },
  created() {
    const url = window.location.href
    let id = []
    if (url.indexOf('/') > -1) {
      id = url.split('/')
    }
    if (id && id.length) {
      this.init(id[id.length -1 ])
    } else {
      this.$message({
        message: '非法路径',
        type: 'waring'
      })
      setTimeout(() => {
        this.goBack()
      }, 1000)
    }
    if (this.isAuth(this.apiList.zComment.return.list)) {
      this.getDataList()
    }
  }
}
</script>
<style lang="scss">
.commentDetail{
  .clearFloat{
    .right{
      float: right;
      margin-right: 20px;
      padding: 0 3px 0 15px;
      font-size: 22px;
      color: #999;
    }
    svg{
      padding-right: 3px;
    }
  }
  .layui-field-title{
    margin: 10px 0 20px;
    border-width: 1px 0 0;
    border-color: #e6e6e6;
    text-align: center;
    legend{
      margin-left: 20px;
      padding: 0 10px;
      font-size: 20px;
      font-weight: 300;
      line-height: 20px;
    }
  }
  .return{
    margin-bottom: 30px;
  }
  .loadMore{
    text-align: center;
    color: #999;
    cursor: pointer;
  }
} 
</style>