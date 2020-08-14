<template>
  <div class="returnChild">
    <div class="detail-about detail-about-reply">
      <a class="fly-avatar" >
        <img :src="avatar">
      </a>
      <div class="fly-detail-user">
        <a class="fly-link">
          <cite>{{ userName ? userName :  '众享乐用户' }}</cite>
        </a>
      </div>
      <div class="detail-hits">
        <span>{{ createdTime }}</span>
      </div>
      <div style="position: absolute; right: 15px; top: 0;">
        <el-button
          size="mini"
          type="text"
          class="danger"
          v-if="isAuth('/zComment/deleteReplyA')"
          @click="delComment(commentId, true)"
        >
          删除
        </el-button>
      </div>
    </div>
    <div class="detail-body layui-text jieda-body photos">
      {{ content }}
    </div>
    <div class="jieda-reply clearfix">
      <span type="reply" @click="returnMessage">
        <svg-icon icon-class="回复" />
        回复
      </span>
      <!-- <span class="jieda-zan " type="zan">
        <svg-icon icon-class="点赞" />
        <em>{{ zanNum }}</em>
      </span> -->
    </div>
    <!-- 回复 -->
    <div class="clearfix" v-if="dataList.length > 0">
      <div class="right returnContainer">
        <ul>
          <li v-for="item in dataList" :key="item.id" class="lzl_single_post j_lzl_s_p first_no_border">
            <a  target="_blank" class="j_user_card lzl_p_p" >
              <img :src="item.cuserEntity.avatar ? item.cuserEntity.avatar : defaultImg">
            </a>
            <div class="lzl_cnt">
              <a class="at j_user_card" alog-group="p_author" target="_blank" >{{ item.cuserEntity.name ?item.cuserEntity.name :'众享乐用户' }}</a>:&nbsp;
              <span class="lzl_content_main" data-username="undefined">{{ item.response }}</span>
              <div class="lzl_content_reply">
                <span class="lzl_jb" style="display: none;">
                  <a href="###" class="user-jubao-button">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </a>
                </span>
                <span class="lzl_op_list j_lzl_o_l"></span>
                <span class="lzl_time">{{ item.createdAt }}</span>
              </div>
            </div>
            <div style="position: absolute; right: 0px; top: 0;">
              <el-button
                size="mini"
                type="text"
                class="danger"
                v-if="isAuth('/smallComment/del')"
                @click="delComment(item.id)"
              >
                删除
              </el-button>
            </div>
          </li>
        </ul>
        <el-pagination
          small
          v-if="total > 5"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total"
          :page-size="5">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="提交" :visible.sync="dialogFormVisible" :modal="true" width="600px">
      <return-form :type="returnType" :commentId="parentId" :superSmallCommentId="commentId"  v-if="dialogFormVisible" @cancel="dialogFormVisible=false" @success="success"/>
    </el-dialog>
  </div>
</template>
<script>
import ReturnForm from './returrnForm'
export default {
  props: {
    data: {},
    commentId: {},
    parentId: {}
  },
  data() {
    return{
      returnType: 101,
      dialogFormVisible: false,
      defaultImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559642438899&di=58a3bd432d00cf75b5e8db0143fe03ed&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
      userName: '',
      avatar: '',
      createdAt: '',
      dataList: [],
      content: '',
      zanNum: 0,
      page: 1,
      pageSize: 5,
      total: 0,
      createdTime: '',
      // parentId: 0
    }
  },
  components: {
    ReturnForm
  },
  methods: {
    // 回复帖子的回复
    returnMessage() {
      this.dialogFormVisible = true
    },
    success() {
      this.dialogFormVisible = false
      this.getChildList()
    },
    // 修改页码
    handleCurrentChange(val) {
      this.page = val
      this.getChildList()
    },
    getChildList() {
      const url = this.apiList.zComment.replayList
       this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ replyId: this.commentId, page: this.page, size: this.pageSize }, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.dataList = data.data.records
          this.total = data.data.total
        }
      })
    },
    // 删除帖子
    delComment(data, self=false) {
      const url = this.apiList.zComment.del
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ responseId: data }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({ type: 'success', message: '删除成功' })
            if (self) {
              this.$emit('delSelf')
            } else {
              this.getChildList()
            }
          }
        })
      })
    }
  },
  created() {
    
    // 获得头像和名字
    this.userName = this.data.cuserEntity.name ? this.data.cuserEntity.name : '众享乐用户'
    this.avatar = this.data.cuserEntity.avatar ? this.data.cuserEntity.avatar : this.defaultImg
    // THIS.zanNum = 
    this.content = this.data.response
    this.createdTime = this.data.createdAt
    this.getChildList()
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.returnChild{
  position: relative;
  padding: 20px 0 10px;
  border-bottom: 1px dotted #DFDFDF;
  .danger{
    color: #e51d27;
  }
  .el-pagination{
    .el-pager{
      .number{
        line-height: 2px;
        border: 0;
        background-color: transparent;
        &:last-child{
          line-height: 2px;
        }
      }
    }
    button{
      background-color: transparent!important;
    }
  }
  
  .detail-about{
    position: relative;
    line-height: 20px;
    padding: 15px 15px 15px 75px;
    font-size: 13px;
    background-color: #f8f8f8;
    color: #999;
  }
  .detail-about-reply{
    padding: 0 0 0 55px;
    background: none;
    .fly-avatar{
      position: absolute;
      left: 0;
      top: 0;
      img {
        display: block;
        width: 45px;
        height: 45px;
        margin: 0;
        border-radius: 2px;
      }
    }
    .fly-detail-user{
      white-space: nowrap;
      overflow: hidden;
      a{
        padding-right: 10px;
        font-size: 14px;
        color: #01AAED;
        cite{
          font-style: normal;
        }
      }
    }
    .detail-about .detail-hits {
      position: relative;
      top: 5px;
      line-height: 20px;
    }
  }
  .detail-body{
    margin: 20px 0 0;
    min-height: 306px;
    line-height: 26px;
    font-size: 16px;
    color: #333;
    word-wrap: break-word;
  }
  .jieda-body{
    margin: 25px 0 20px;
    min-height: 0;
    line-height: 24px;
    font-size: 14px;
  }
  .jieda-reply{
    margin-bottom: 15px;
    span {
      float: right;
      padding-right: 20px;
      color: #999;
      cursor: pointer;
      em{
        font-style: normal;
      }
    }
  }
  .right{
    float: right;
    border-left: 1px solid #f0f1f2;
    border-right: 1px solid #f0f1f2;
    padding: 4px 15px 14px;
    margin-right: 5px;
    margin-left: 0;
    background: #f7f8fa;
    width: 95%;
  }
  .returnContainer{
    ul{
      padding-left: 0;
    }
    li{
      list-style: none;
      padding-top: 10px;
      margin-top: 0;
      border-top: 0;
      border-bottom: 1px #d7d7d7 dotted;
      position: relative;
      &:last-child{
        border-bottom: 0;
      }
      .lzl_p_p {
        float: left;
        width: 32px;
        height: 32px;
        border: 1px #ccc solid;
        padding: 1px;
        box-sizing: content-box;
        img{
          width: 32px;
          height: 32px;
        }
      }
      .lzl_cnt {
        margin-left: 45px;
        zoom: 1;
        word-wrap: break-word;
        word-break: break-all;
        .at{
          color: #2d64b3;
          outline: 0;
          position: relative;
          zoom: 1;
          &:link{
            text-decoration: none;
          }
        }
        .lzl_content_main {
          color: #333;
          font-size: 14px;
          line-height: 20px;
          word-wrap: break-word;
          word-break: break-word;
        }
        .lzl_content_reply{
          padding-top: 5px;
          text-align: right;
          font-size: 12px;
          font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
          color: #333;
          line-height: 22px;
          .lzl_time {
            color: #999;
          }
        }
      }
    }
  }
}
</style>