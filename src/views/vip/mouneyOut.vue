<template>
  <div class="moneyOut">
    <el-card shadow="hover">
      <el-form :inline="true" @submit.native.prevent class="demo-form-inline">
        <el-form-item>
          <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;margin-left: 23px;"><p class="main_header">提现至{{ type }}</p></el-form-item>
      </el-form>
      <div class="main_body">
        <div>
          <div class="inline label">提现金额：&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <el-input class="input" v-model="number">
            <b slot="prefix">￥</b>
          </el-input>&nbsp;&nbsp;&nbsp;&nbsp;<span class="label">元</span> 
          <div class="inline rightText">可提现余额： <span>{{ canoutMoney }}元</span></div>
        </div>
        <div style="margin-top: 70px">
          <div class="inline label top">提现至：</div>
          <div class="inline">
            <div class="inline item" :class="{'achive': type === '微信'}" @click="type='微信'">
              <div class="inline">
                <img src="../../assets/moneyOut/wechart.png" alt="">
              </div>
              <div class="inline">
                <p>微信账户</p>
                <p>{{ wxNickName ? wxNickName : '未绑定' }}</p>
              </div>
              <el-button v-if="(!wxNickName)&&isAuth('/moneyOutInfo/bindAliInfo')" type="text"  class="leftIn" style="vertical-align: bottom;padding-bottom: 0;">
                立即绑定
              </el-button>
            </div>
            <div class="inline item" :class="{'achive': type === '支付宝'}" @click="type='支付宝'">
              <div class="inline">
                <img src="../../assets/moneyOut/aPay.png" alt="">
              </div>
              <div class="inline">
                <p>支付宝账户</p>
                <p>{{ aliAccount ? aliAccount : '未绑定' }}</p>
              </div>
              <el-button v-if="(!aliAccount)&&isAuth('/moneyOutInfo/bindAliInfo')" type="text"  class="leftIn" style="vertical-align: bottom;padding-bottom: 0;" @click="bindAliAccount = true">
                立即绑定
              </el-button>
            </div>
            <div class="inline item" :class="{'achive': type === '银行卡'}" @click="type='银行卡'">
              <div class="inline">
                <img src="../../assets/moneyOut/bank.png" alt="">
              </div>
              <div class="inline">
                <p>银行卡</p>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 70px" v-if="type === '银行卡'">
          <div class="inline top label">选择银行卡：</div>
          <div class="inline" style="border-top: solid 1px #d7d7d7;">
            <div class="table clearfix" v-for="item in bankList" :key="item.id">
              <div class="inline">
                <span class="radio radioChoose" v-if="chooseId === item.id"></span>
                <span class="radio" v-else @click="chooseId = item.id"></span>
              </div>
              <div class="inline">
                <img src="../../assets/moneyOut/gsyh.png" v-if="item.bankCode === 'ICBC'" alt="">
                <img src="../../assets/moneyOut/jsyh.png" v-if="item.bankCode === 'CCB'" alt="">
                <img src="../../assets/moneyOut/jtyh.png" v-if="item.bankCode === 'COMM'" alt="">
                <img src="../../assets/moneyOut/nyyh.png" v-if="item.bankCode === 'ABC'" alt="">
                <img src="../../assets/moneyOut/zsyh.png" v-if="item.bankCode === 'CMB'" alt="">
                <img src="../../assets/moneyOut/zgyzyh.png" v-if="item.bankCode === 'PSBC'" alt="">
                <img src="../../assets/moneyOut/zgyh.png" v-if="item.bankCode === 'BOC'" alt="">
              </div>
              <div class="inline">
                {{ getBankName(item.bankCode) }}
              </div>
              <div class="inline">
                {{ item.cardNum }}
              </div>
              <div class="inline" style="float: right;">
                <el-button type="text" @click="delBank(item.id)">
                  删除
                </el-button>
              </div>
            </div>
            <div class="clearfix" style="width: 100%">
              <el-button type="text" style="float: right;" @click="addBankCard = true">
                <i class="el-icon-plus"/>添加银行卡
              </el-button>
            </div>
          </div>
        </div>
        <el-button @click="mouneyOut" style="margin-top: 60px;">申请提现</el-button>
      </div>
    </el-card>
    <!-- 添加银行卡 -->
    <el-dialog title="添加银行卡" :visible.sync="addBankCard" :modal="true" width="600px">
      <el-form :model="bankForm" @submit.native.prevent :rules="dataRule" :inline="false"  ref="bankForm" label-width="110px" v-if="addBankCard">
        <el-form-item label="持卡人姓名" prop="personName">
          <el-input v-model="bankForm.personName" autocomplete="off" placeholder="请输入持卡人姓名"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="cardNum">
          <el-input v-model="bankForm.cardNum" autocomplete="off" placeholder="请输入银行卡号" @change="getBankName"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" >
          {{ codeBankName }}
        </el-form-item>
        <el-form-item label="银行编码" >
          {{ bankForm.bankCode }}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即提交</el-button>
          <el-button @click="addBankCard = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="绑定支付宝账号" :visible.sync="bindAliAccount" :modal="true" width="600px">
      <el-form :model="aliCcountForm" @submit.native.prevent :rules="dataRule" :inline="false"  ref="aliCcountForm" label-width="110px" v-if="bindAliAccount">
        <el-form-item label="支付宝姓名" prop="realName">
          <el-input v-model="aliCcountForm.realName" autocomplete="off" placeholder="请输入支付宝姓名">
            <svg-icon icon-class="user" slot="prefix" />
          </el-input>
        </el-form-item>
        <el-form-item label="支付宝账号" prop="aliAccount">
          <el-input v-model="aliCcountForm.aliAccount" autocomplete="off" placeholder="请输入支付宝账号" @change="getBankName">
            <svg-icon icon-class="password" slot="prefix"/>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="bindAccount">立即提交</el-button>
          <el-button @click="bindAliAccount = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { bankName, bankCardAttribution } from "../../utils/bankList"
export default {
  data() {
    var int = (rule, value, callback) => {
      if (!/^\+?[1-9][0-9]*$/.test(value)) {
        callback(new Error('请输入正确的整数数值'))
      } else {
        callback()
      }
    }
    return{
      type: '微信',
      number: '',
      page: 1,
      moduleChou: 0,
      canoutMoney: 0,
      size: 10000,
      bankList: [],
      chooseId: '',
      codeBankName: '', // 银行名称
      addBankCard: false,
      wxNickName: '', // 绑定的微信名
      wxOpenId: '', // 绑定的微信OpenId
      aliRealName: '', // 绑定的支付宝名称
      aliAccount: '', // 绑定的支付宝账号
      // 添加银行卡信息
      bankForm: {
        personName: '', // 持卡人姓名
        cardNum: '', // 银行卡号
        bankCode: '', // 银行编号
      },
      aliCcountForm: {
        realName: '',
        aliAccount: ''
      },
      bindAliAccount: false,
      dataRule: {
        personName : [
          { required: true, message: '持卡人姓名不能为空', trigger: 'blur' }
        ],
        cardNum: [
          { required: true, message: '银行卡号不能为空', trigger: 'blur' },
          { validator: int, trigger: 'blur'}
        ],
        realName: [
          { required: true, message: '支付宝账户姓名', trigger: 'blur' }
        ],
        aliAccount: [
          { required: true, message: '支付宝账户不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getBankName(card) {
      const bank = bankName(card)
      return bank
    },
    goBack() {
      window.history.go(-1)
    },
    // 获得金额数据
    getData() {
      const url = this.apiList.money.get
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        if (data.result) {  
          this.canoutMoney = data.data.canOutMoney / 100
          this.moduleChou = data.data.moduleChou / 100
        }
      })
    },
    // 获得绑定信息
    getInfo() {
      const url = this.apiList.moneyOutInfo.getInfo
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.wxNickName = data.data.wxNickName
          this.wxOpenId = data.data.wxOpenId
          this.aliRealName = data.data.aliRealName
          this.aliAccount = data.data.aliAccount
        }
      })
    },
    // 获得银行卡数据
    getBank() {
      this.delBank = ''
      const url = this.apiList.bankCard.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData('', url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.bankList = data.data
        }
      })
    },
    // 删除银行卡
    delBank(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }).then(() => {
        const url = this.apiList.bankCard.del
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData({ bankCardId: id }, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          this.chooseId = ''
          this.getBank()
        })
      })
    },
    // 输入的银行卡号拿到对应的银行类型
    getBankName() {
      const banfInfo = bankCardAttribution(this.bankForm.cardNum)
      if (banfInfo === 'error') {
        this.bankForm.bankCode = '银行卡号错误'
        this.codeBankName =  '银行卡号错误'
      } else {
        this.bankForm.bankCode = banfInfo.bankCode
        this.codeBankName =  banfInfo.bankName
      }
    },
    // 点击提交
    submitForm() {
      this.$refs['bankForm'].validate((valid) => {
        if (valid) {
          if (this.bankForm.bankCode !== '银行卡号错误' ) {
            const url = this.apiList.bankCard.add
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'post',
              data: this.$http.adornData(this.bankForm, url, true)
            }).then(({ data }) => {
              if (data.result) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              }
              this.addBankCard = false
              this.getBank()
            })
          }
        }
      })
    },
    // 绑定支付宝账号
    bindAccount() {
      this.$refs['aliCcountForm'].validate((valid) => {
        if (valid) {
          const url = this.apiList.moneyOutInfo.bindAliInfo
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData(this.aliCcountForm, url, true)
          }).then(({ data }) => {
            if (data.result) {
              this.$message({
                message: '绑定成功',
                type: 'success'
              })
            }
            this.bindAliAccount = false
            this.getInfo()
          })
        }
      })
    },
    // 发起提现申请
    mouneyOut() {
      // 判断数据是否正确
      switch(this.type) {
        case '微信':
          if (!this.wxOpenId) {
            this.$message({
              message: '请先绑定提现微信账号',
              type: 'warning'
            })
            return
          }
          break
        case '支付宝':
          if (!this.aliAccount) {
            this.$message({
              message: '请先绑定提现支付宝账号',
              type: 'warning'
            })
            return
          }
          break
        case '银行卡':
          if (!this.chooseId) {
            this.$message({
              message: '请先绑定提现银行卡',
              type: 'warning'
            })
            return
          }
          break
      }
      // 提现金额
      if (typeof this.number !== 'number') {
        if (parseFloat(this.number)) {
        } else {
          this.$message({
            message: '请输入正确的提现金额',
            type: 'warning'
          })
          return
        }
      }
      if (this.number > this.canoutMoney) {
        this.$message({
          message: '提现金额超出限制',
          type: 'warning'
        })
        return
      }
      // 平台将抽取1%手续费, 是否继续
      this.$confirm(`平台将抽取${this.moduleChou}%手续费, 实到账${Math.round(this.number*(100-this.moduleChou)) /100}元, 是否继续?`, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }).then(() => {    
        const url = this.apiList.moneyApproval.moneyApproval
        let moneyOutType = ''
        switch(this.type) {
          case '微信':
            moneyOutType = 101
            break
          case '银行卡':
            moneyOutType = 1
            break
          case '支付宝':
            moneyOutType = 201
            break
        }
        const formData = {  num: Math.floor(this.number*100), moneyOutType: moneyOutType }
        if (this.type === '银行卡') {
          formData.bankCardId = this.chooseId
        }
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData(formData, url, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '申请提现成功，请等待管理员审批',
              type: 'success'
            })
            this.getData()
          }
        })
      })
    }
  },
  created() {
    if (this.isAuth(this.apiList.money.get)) {
      this.getData()
    }
    if (this.isAuth(this.apiList.bankCard.list)) {
      this.getBank()
    }
    if (this.isAuth(this.apiList.moneyOutInfo.getInfo)) {
      this.getInfo()
    }
  }
}
</script>
<style lang="scss">
.moneyOut{
  .main_body{
    box-sizing: border-box;
    padding: 90px;
    margin: 15px;
    margin-top: 0;
    border: solid 1px #D7D7D7;
    .label{
      font-size: 20px;
      color: #333;
    }
    .input{
      width: 270px;
      height: 54px;
      vertical-align: middle;
      input{
        font-size: 32px;
        color: #333;
        height: 100%;
      }
      .el-input__prefix{
        line-height: 60px;
        b{
          display: inline-block;
          font-size: 20px;
          vertical-align: bottom;
          color: #333;
        }
      }
    }
    .leftIn{
      margin-left: -20px;
      width: 65px;
      margin-bottom: 3px;
    }
    .inline{
      display: inline-block;
      vertical-align: middle;
      .item{
        width: 215px;
        height: 54px;
        border: solid 1px #D7D7D7;
        border-radius: 2px;
        box-sizing: border-box;
        padding: 5px 0 5px 22px;
        cursor: pointer;
        img{
          width: 43px;
          height: 43px;
          vertical-align: middle;
        }
        .inline{
          height: 100%;
          p{
            line-height: 18px;
            margin: 0;
            cursor: pointer;
            margin-top: 4px;
            padding-left: 10px;
            &:nth-child(2){
              font-size: 14px;
              color: #A4A4AC;
              margin-top: 0;
            }
          }
        }
      }
      .achive{
        background: url("../../assets/moneyOut/bgAchive.png");
        background-size: 31px 31px;
        background-position-x: 100%;
        background-position-y: 100%;
        background-repeat: no-repeat;
      }
      .table{
        border: solid 1px #D7D7D7;
        border-top: 0;
        width: 592px;
        height: 54px;
        line-height: 54px;
        padding: 0 20px;
        .inline{
          font-size: 16px;
          .radio{
            display: inline-block;
            width: 19px;
            height: 19px;
            border: solid 1px #d7d7d7;
            border-radius: 100%;
            vertical-align: middle;
          }
          .radioChoose{
            border: none;
            background: url("../../assets/moneyOut/achive.png");
            background-size: 100% 100%;
          }
          &:nth-child(2){
            margin: 0 10px 0 20px; 
            img{
              width: 37px;
              height: 37px;
              vertical-align: middle;
            }
          }
          &:nth-child(3){
            color: #666;
          }
          &:nth-child(4){
            color: #333;
            font-weight: bold;
            margin-left: 40px;
          }
        }
      }
    }
    .top{
      vertical-align: top;
    }
    .rightText{
      font-size: 20px;
      color: #333;
      margin-left: 53px;
      span{
        color: #F68634;
      }
    }
  }
}
</style>