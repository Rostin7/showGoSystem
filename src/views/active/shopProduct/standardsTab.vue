<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="never">
          <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 0"><p class="main_header">
            <el-button @click="goBack" type='text'><i class="el-icon-d-arrow-left"/>返回上一级</el-button>
            电商商品规格添加</p></el-form-item>
            <el-form-item>
              <el-button v-if="isAuth('/shopProductsku/add')" @click.native = "addModel"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-form>
          <el-table row-key="id" :data="tableList" v-loading="listLoading" element-loading-text="拼命加载中">
            <el-table-column header-align="center" align="center" prop="id" label="Id"/>
            <el-table-column prop="imgUrl" label="主图" align="center" header-align="center">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" alt="" style="max-width: 100%; max-height: 100px;">
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="skuName" label="规格名"/>
            <el-table-column header-align="center" align="center" prop="name" label="规格"/>
            <el-table-column header-align="center" align="center" prop="stock" label="库存"/>
            <el-table-column header-align="center" align="center" prop="price" label="价格"/>
            <el-table-column header-align="center" align="center" prop="resellerPrice" label="分销结算价"/>
            <el-table-column header-align="center" align="center" prop="moduleGetPrice" label="商户结算价"/>
            <el-table-column header-align="center" align="center" prop="firstUserPrice" label="用户首单价">
              <template slot-scope="scope">
                {{scope.row.firstUserPrice == -0.01 ? '暂无': scope.row.firstUserPrice}}
              </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button v-if="(!scope.row.price) && isAuth('/shopProductsku/add')" type="success" size="mini" @click="addModel(scope.row,true)">添加</el-button>
                <el-button
                  v-if="isAuth('/shopProductsku/mod')"
                  size="mini"
                  type="text"
                  @click="submitEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  v-if="isAuth('/shopProductsku/del')"
                  size="mini"
                  type="text"
                  @click="submitDelete(scope.$index, scope.row)"
                  class="danger"
                  >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal="true"  width="38%" top="10vh">
      <standardsDialog :imageShow="imageShow" :productId="productId" :superskuId="superskuId" ref="dialogForm" :formType="formType"
      @success="success" @close="dialogFormVisible = !dialogFormVisible"></standardsDialog>
    </el-dialog>
    <el-dialog :visible.sync="DialogImgVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
 import standardsDialog from './standardsDialog.vue'
export default {
  data() {
   return {
     activityId:'',
     superskuId:'',
     imageShow: true,
     pass:'',
     isadmin: false,
     tableList: [],
     listLoading: true,
     DialogImgVisible: false,
     imgUrl: '',
     dialogTitle: '添加电商商品',
     dialogFormVisible: false,
     formType: 'add'
   }
  },
  components: {
    standardsDialog
  },
  methods: {
    init (val) {
      this.productId = val
      this.getDataList()
    },
    goBack() {
      window.history.go(-1)
    },
    showChanged(){
      this.$emit('showChange',this.show)
    },
    getDataList() {
      this.listLoading = true
      const url = this.apiList.shopProductsku.list
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({ productId: this.productId}, url, true)
      }).then(({ data }) => {
        if (data.result) {
          this.tableList = this.toTree(data.data)
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 数据重组
    toTree(data) {
        let result = []
        data.forEach(item => {
         delete item.children;
        });
        let map = {};
        data.forEach(item => {
         map[item.id] = item;
        });
        data.forEach(item => {
         item.price = item.price/100
         item.resellerPrice = item.resellerPrice/100
         item.moduleGetPrice = item.moduleGetPrice/100
         item.firstUserPrice = item.firstUserPrice/100
         let parent = map[item.superskuId];
         if (parent) {
          (parent.children || (parent.children = [])).push(item);
         } else {
           if(item.superskuId==0){
             result.push(item);
           }
         }
        });
        return result;
       },
    // 点击删除
      submitDelete(index, data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
        ).then(() => {
          const url = this.apiList.shopProductsku.del
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            data: this.$http.adornData({ id: data.id }, url, true)
          }).then(({ data }) => {
            if (data.result) {
              // 删除成功
              this.$message({ type: 'success', message: '删除成功' })
              this.getDataList()
            } else {
            }
          })
        })
      },
      // 点击添加
      addModel(obj, way) {
        if(way){
          this.productId = obj.productId
          this.superskuId = obj.id
          this.imageShow = false
        }else{
          this.superskuId = '0'
          this.imageShow = true
        }
        this.formType = 'add'
        this.dialogTitle = '添加商品规格'
        this.dialogFormVisible = true,
        this.$nextTick(() => {
          this.$refs.dialogForm.init({ way },this.formType)
        })
      },
      // 点击修改
      submitEdit(index, data) {
        if(data.superskuId != 0){
          this.imageShow = false    // 子类
        }else{
          this.imageShow = true
        }
        this.formType = 'edit'
        this.dialogTitle = '编辑商品规格'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.dialogForm.init({ data },this.formType)
        })
      },
      success() {
        this.dialogFormVisible = false
        this.getDataList()
      },
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

