<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">
            <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
            电商商品订单管理</p></el-form-item>
          </el-form>
          <el-table :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="id" label="Id"/>
            <el-table-column prop="avatar" label="主图" align="center" header-align="center">
              <template slot-scope="scope">
                <img :src="scope.row.avatar" alt="" style="max-width: 100%; max-height: 100px;">
              </template>
            </el-table-column>
            <el-table-column prop="orderState" :label="filterState" header-align="center" align="center" :filter-multiple="false" column-key="useState"
              :filters="[
                { text: '待发货', value: 1 },
                { text: '待收货', value: 101 },
                { text: '待退款', value: 201 }]">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.orderState == 301 || scope.row.orderState == 401">取消失效</el-button>
                  <el-button type="text" v-else-if="scope.row.orderState == 101">待支付</el-button>
                  <el-button type="text" v-else-if="scope.row.orderState == 10000 || scope.row.orderState == 401">支付成功</el-button>
                  <el-button type="text" v-else-if="scope.row.orderState == 10100">已发货</el-button>
                  <el-button type="text" v-else-if="scope.row.orderState == 15000 || scope.row.orderState == 15100">订单确认</el-button>
                  <el-button type="text" v-else-if="scope.row.orderState == 10200">退款中</el-button>
                  <el-button type="text" v-else-if="scope.row.orderState == 10400">退款成功</el-button>
                  <el-button type="text" v-else-if="scope.row.orderState == 10500">退款退货成功</el-button>
                </template>
              </el-table-column>
            <el-table-column header-align="center" align="center" prop="orderTitle" label="商品名"/>
            <el-table-column header-align="center" align="center" prop="sendPrice" label="运费"/>
            <el-table-column header-align="center" align="center" prop="realPayPrice" label="实际付款"/>
            <el-table-column header-align="center" align="center" prop="userName" label="用户名"/>
            <el-table-column header-align="center" align="center" prop="payTime" :formatter="formatDate" label="下单时间"/>
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <!-- 校验时间 -->
                <template>
                  <el-button type="danger" plain size="mini" v-if="((scope.row.orderState == 301 || 
                    scope.row.orderState == 401) && isAuth('/shopProductOrder/moduleCloseOrder'))"
                    @click="closeOrder(scope.row)" class="block block-center">
                      关闭订单
                  </el-button>
                  <el-button type="warning" size="mini" v-else-if="scope.row.orderState == 101" class="block block-center">
                    等待支付
                  </el-button>
                </template>
                
                <el-button type="success" plain size="mini" v-if="scope.row.orderState == 10000 || 
                scope.row.orderState == 401 && isAuth('/shopProductOrder/sendOrder')" class="block block-center" @click="editLogistics(scope.row,-1)">
                  订单发货
                </el-button>
                <el-button type="success" plain size="mini" v-if="scope.row.orderState == 10100 && isAuth('/shopProductOrder/modSendOrder')"
                 class="block block-center" @click="editLogistics(scope.row,scope.$index)">
                  物流修改
                </el-button>
                  <!-- 校验时间 -->
                <el-button type="success" plain size="mini" v-if="scope.row.orderState == 15000 || 
                scope.row.orderState == 15100 && isAuth('/shopProductOrder/moduleSureOrder')" class="block block-center" @click="getCommodity(scope.row)">
                  确认收货
                </el-button>
                <el-button type="danger" plain size="mini" v-if="scope.row.orderState == 10000 || scope.row.orderState == 401 || 
                  scope.row.orderState == 15000 || scope.row.orderState == 15100
                  && isAuth('/shopProductOrder/refundAfterSendOrder')" class="block block-center" @click="handPayBack(scope.row)">
                  无理由退款
                </el-button>
                <el-button type="danger" plain size="mini" v-if="scope.row.orderState == 10200
                && isAuth('/shopProductOrder/refundOrder')" class="block block-center" @click="payBack(scope.row)">
                  处理退款
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 物流编辑/发货模态框 -->
    <el-dialog
      :title="formIndex > -1 ? '物流编辑':'订单发货'"
      :visible.sync="dialogFormVisible"
      width="40%">
     <el-form @submit.native.prevent :model="logisticsForm" ref="logisticsForm" label-width="100px">
      <el-form-item label="物流号" required>
        <el-input v-model="logisticsForm.sendingCode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="物流公司名" required>
        <el-input v-model="logisticsForm.sendingComName" autocomplete="off"></el-input>
      </el-form-item>
     </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendOrEdit(logisticsForm)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 处理退款申请模态框 -->
    <el-dialog
    title="处理退款申请"
    :visible.sync="dealPayBackVisible"
    width="40%">
    <el-form @submit.native.prevent :model="payBackForm" ref="payBackForm" label-width="150px">
      <el-form-item label="退款金额">
        <el-input v-model="payBackForm.msg" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="同意退款与否">
        <el-radio-group v-model="payBackForm.agreeOrNot">
          <el-radio-button :label="true">同意</el-radio-button>
          <el-radio-button :label="false">拒绝</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dealPayBackVisible = false">取 消</el-button>
      <el-button type="primary" @click="certainPayBack(payBackForm)">确 定</el-button>
    </span>
  </el-dialog>
    <!--工具条-->
    <el-pagination
      layout="total, prev, pager, next"
      background
      :page-size="pageSize"
      :total="total"
      style="text-align:center;"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
 
  data() {
     var trim = (rule, value, callback) => {
      callback()
    }
    return {
      formIndex:Number,
      logisticsForm:{
          sendingCode:'',
          sendingComName:''
      },
      payBackForm:{
        msg: '',
        agreeOrNot: true
      },
      useState: '',
      filterState:'筛选订单状态',
      orderId:'',
      productId:'',
      total: 0,
      page: 1,
      pageSize: 10,
      tableList: [],
      listLoading: true,
      dialogTitle: '添加电商商品',
      dialogFormVisible: false,
      dealPayBackVisible: false,
      formType: 'add'
    }
  },
  methods: {
    // 格式化表格显示时间
        formatDate(row) {
            if(row.payTime){
              let date = new Date(row.payTime);
                let Y = date.getFullYear() + '-';
                let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
                let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
                let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
                let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
                let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return Y + M + D + h + m + s;
              }
        },
        //获取当前时间
        getNowFormatDate() {    
            var date=new Date(time)
                var year=date.getFullYear()
                /* 在日期格式中，月份是从0开始的，因此要加0
                 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                 * */
                var month= date.getMonth()+1<10 ? "0"+String((date.getMonth()+1)) : String(date.getMonth()+1)
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate()
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours()
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes()
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds()
                // 拼接
                return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
        },
        init (val) {
          this.productId = val
          this.getDataList()
        },
        goBack() {
          window.history.go(-1)
        },
        getDataList() {
          this.listLoading = true
          const url = this.apiList.shopProductOrder.list
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData({ productId:this.productId,page:this.page,size:10,orderState:0}, url, true)
          }).then(({ data }) => {
            if (data.result) {
              // for(var i in data.data.records){
              //   let remainTime = this.dealJudge(data.data.records[i].createdAt) //剩余的时间戳，需转化成分钟单位
              //   // console.log(222222,remainTime)
              //   // this.$set(data.data.records[i],show,true)
              // }
              // var list = data.data
              // list = list.map((item,index) =>item[index].show = true)
              this.tableList = data.data.records
              this.total = data.data.total
            }
            this.listLoading = false
          }).catch(() => {
            this.listLoading = false
          })
        },
        // 新增数组属性
        // dealJudge(data) {
        //   var nowTime = this.getNowFormatDate()
        //   console.log(22333,nowTime)
        //   var createTime = data
        //   console.log(nowTime,createTime)
        //    // //定义两个变量time1,time2分别保存开始和结束时间
        //   var time1="2017-12-02 12:25";
        //   var time2="2017-12-03 12:35";
        //   // //判断开始时间是否大于结束日期
        
        //   //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
        //   var begin1 = time1.substr(0,10).split("-");
        //   var end1 = time2.substr(0,10).split("-");
        //   //将拆分的数组重新组合，并实例成化新的日期对象
        //   var date1=new Date(begin1[1] + - + begin1[2] + - + begin1[0]);
        //   var date2=new Date(end1[1] + - + end1[2] + - + end1[0]);
        //   //得到两个日期之间的差值m，以分钟为单位
        //   //Math.abs(date2-date1)计算出以毫秒为单位的差值
        //   //Math.abs(date2-date1)/1000得到以秒为单位的差值
        //   //Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
        //   var m=parseInt(Math.abs(date2-date1)/1000/60);
        //   //小时数和分钟数相加得到总的分钟数
        //   //createTime.substr(11,2)截取字符串得到时间的小时数
        //   //parseInt(createTime.substr(11,2))*60把小时数转化成为分钟
        //   var min1=parseInt(time1.substr(11,2))*60+parseInt(time1.substr(14,2));
        //   var min2=parseInt(time2.substr(11,2))*60+parseInt(time2.substr(14,2));
        //   //两个分钟数相减得到时间部分的差值，以分钟为单位
        //   var n=min2-min1;
        //   //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
        //   var minutes=m+n;
        //   console.log('finalValue',minutes)
        // },
      // 关闭订单
        closeOrder(data) {
          this.$confirm('此操作将永久关闭该订单, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
          ).then(() => {
            const url = this.apiList.shopProductOrder.closeOrder
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'post',
              data: this.$http.adornData({ orderId: data.id }, url, true)
            }).then(({ data }) => {
              if (data.result) {
                // 删除成功
                this.$message({ type: 'success', message: '关闭订单成功！' })
                this.getDataList()
              } else {
              }
            })
          })
        },
        //确认发货/确认修改物流
        sendOrEdit(data){
          if(data.sendingCode == '' || data.sendingComName == ''){
            this.$message({ type: 'warning', message: '请先完善信息填写！' })
            return
          }
          let msg = this.formIndex > 0 ? '修改物流' : '确认发货'
          let url = this.formIndex > 0 ? this.apiList.shopProductOrder.edit : this.apiList.shopProductOrder.sendGoods
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'post',
              data: this.$http.adornData({ orderId: this.orderId,sendingCode: data.sendingCode,sendingComName: data.sendingComName }, url, true)
            }).then(({ data }) => {
              if (data.result) {
                 this.dialogFormVisible = false
                this.getDataList()
                this.$message({ type: 'success', message: `${msg}成功！` })
              }else{
                 this.dialogFormVisible = false
              } 
            })
        },
        // 点击发货/物流修改
        editLogistics(data,index){
          this.dialogFormVisible = true
          if(!index){   //发货
            this.formIndex = index
            this.logisticsForm = {
              sendingCode:'',
              sendingComName:'',
            }
          }else{  //修改
            this.formIndex = index
            this.orderId = data.id
            this.logisticsForm.sendingCode = data.sendingCode 
            this.logisticsForm.sendingComName = data.sendingComName
          }
        },
        // 确认收货
        getCommodity(data){
          this.$refs['logisticsForm'].validate((valid) => {
           url = this.apiList.shopProductOrder.getCommodity
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'post',
              data: this.$http.adornData({ orderId: data.id}, url, true)
            }).then(({ data }) => {
              if (data.result) {
                this.$message({ type: 'success', message: `确认收货成功！` })
                this.getDataList()
              }
            })
          })
        },
        // 处理退款
        payBack(data){
           this.dealPayBackVisible = true
           this.orderId = data.id
        },
        // 确定退款
        certainPayBack(payBackForm){
          let url = this.apiList.shopProductOrder.dealPayBack
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData({ orderId: this.orderId ,msg: payBackForm.msg,agree: payBackForm.agreeOrNot}, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: `确认退款成功！` })
              this.getDataList()
            }
          })
        },
        // 无理由退款
        handPayBack(data){
          let url = this.apiList.shopProductOrder.handPayBack
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData({ orderId: data.id ,refundPrice: data.realPayPrice}, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({ type: 'success', message: `无理由退款成功！` })
              this.getDataList()
            }
          })
        },
        // 分页组件切换
        handleCurrentChange(value) {
          this.page = value
          this.getDataList()
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
      }
  }
</script>

