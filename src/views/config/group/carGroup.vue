<!-- 城市管理员进 -->
<template>
  <div class="module_listMuodule">
   <!-- <el-row :gutter="20">
      <el-col :span="8">
        <el-button @click.native = "addModel" type=""><i class="el-icon-plus"></i>添加分类</el-button>
        <el-tree ref="expandMenuList" class="expand-tree"
          v-if="isLoadingTree"
          :data="setTree"
          node-key="id"
          highlight-current
          :props="defaultProps"
          :expand-on-click-node="false"
          :render-content="renderContent"
          :default-expanded-keys="defaultExpandKeys"
          @node-click="handleNodeClick">
        </el-tree>
      </el-col>
      <el-col :span="16">
     
      </el-col>
    </el-row> -->
    <!-- 添加城市弹窗 -->
    <!-- <el-dialog title="添加汽车分类" :visible.sync="dialogFormVisible" :modal="true" width="35%">
      <el-form @submit.native.prevent :model="dialogForm" :rules="dataRule" :inline="false"  ref="dialogForm" label-width="100px">
        <el-form-item label="分类名称"  prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAdd()" :loading="loading">添加</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
// import TreeRender from '@/components/treeMen'
// import { treeDataTranslate } from '@/utils/getTree'
export default {
  data() {
    return {
      // setTree: [],
      // defaultProps: {
      //   children: 'children',
      //   label: 'name'
      // },
      // dialogForm: {
      //   name: ''
      // },
      // dialogFormVisible: false,
      // isShoeDetail: true, // 是否显示城市详情
      // loading: false,
      // apendId: null, // 新增节点开始id
      // name: '',
      // non_maxexpandId: 0, // 新增节点开始id(不更改)
      // isLoadingTree: false, // 是否加载节点树
      // defaultExpandKeys: [], // 默认展开节点列表
      // // 正则验证
      // dataRule: {
      //   name: [
      //     { required: true, message: '分类名不能为空', trigger: 'blur' }
      //   ]
      // }
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    // 初始化
    // init() {
    //   this.getdataList()// 初始化数据填充
    //   this.isLoadingTree = true
    // },
    // getdataList() {
    //   // 请求数据
    //   const url = this.apiList.config.car.listNextAll
    //   this.listLoading = true
    //   this.$http({
    //     url: this.$http.adornUrl(url),
    //     method: 'post',
    //     data: this.$http.adornData({ id: 0 }, url, true)
    //   }).then(({ data }) => {
    //     if (data.result) {
    //       // 修改数组内容
    //       this.setTree = treeDataTranslate(data.data)
    //       // 默认数组展开
    //       this.setTree.map((a) => {
    //         this.defaultExpandKeys.push(a.id)
    //       })
    //     } else {
    //       // this.$message({ message: data.msg, type: 'warning' })
    //       // this.$store.dispatch('LogOut')
    //     }
    //     this.listLoading = false
    //   }).catch((res) => {
    //     // this.$message(res)
    //   })
    // },
    // submitDelete(index, data) {
    //   // 点击确认删除
    //   this.$confirm('此操作将永久删除该分类及对应信息, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger' }
    //   ).then(() => {
    //     this.$http({
    //       url: this.$http.adornUrl(this.apiList.config.car.del),
    //       method: 'post',
    //       data: this.$http.adornData({ id: data.id }, this.apiList.config.car.del, true)
    //     }).then(({ data }) => {
    //       if (data.result) {
    //         // 删除成功
    //         this.$message({ type: 'success', message: '删除成功' })
    //         // 删除当前列表
    //         this.dataList.splice(index, 1)
    //       } else {
    //         // this.$message({ message: data.msg, type: 'warning' })
    //         // this.$store.dispatch('LogOut')
    //       }
    //     })
    //   }).catch(() => {
    //     // this.$message.error('未知错误')
    //   })
    // },
    // addModel() {
    //   this.dialogForm = {
    //     name: '',
    //     phone: ''
    //   }
    //   this.dialogFormVisible = true
    // },
    // // 点击提交
    // submitFormAdd() {
    //   let moduleId = this.apendId
    //   // 判断如果是点击添加的子节点则修改为对应的id，否则变为最高层级
    //   if (!this.apendId) {
    //     moduleId = this.non_maxexpandId
    //   }
    //   this.loading = true
    //   this.$http({
    //     url: this.$http.adornUrl(this.apiList.config.car.add),
    //     method: 'post',
    //     data: this.$http.adornData({ name: this.dialogForm.name, superId: moduleId }, this.apiList.config.car.add, true)
    //   }).then(({ data }) => {
    //     if (data.result) {
    //       // 数据获取成功刷新树
    //       this.$message({ message: '添加成功', type: 'success' })
    //       this.init()
    //     } else {
    //       // 弹出错误提示
    //       // this.$message({ message: data.msg, type: 'warning' })
    //       // this.$store.dispatch('LogOut')
    //     }
    //     this.loading = false
    //     this.dialogFormVisible = false
    //   }).catch(({ data }) => {
    //     // this.$message({ message: data, type: 'danger' })
    //   })
    //   this.apendId = 0
    // },
    // renderContent(h, { node, data, store }) { // 加载节点
    //   const that = this
    //   return h(TreeRender, {
    //     props: {
    //       DATA: data,
    //       NODE: node,
    //       STORE: store,
    //       isEditNode: false,
    //       maxexpandId: that.non_maxexpandId
    //     },
    //     on: {
    //       nodeAdd: (s, d, n) => that.handleAdd(s, d, n),
    //       nodeEdit: (s, d, n) => that.handleEdit(s, d, n),
    //       nodeDel: (s, d, n) => that.handleDelete(s, d, n)
    //     }
    //   })
    // },
    // // 点击某一个城市的增删改
    // handleNodeClick(d, n, s) {
    //   this.name = d.name
    //   // this.isShoeDetail = false
    //   this.apendId = d.id
    //   // this.$nextTick(() => {
    //   //   this.isShoeDetail = true
    //   // })
    //   this.$refs['cityDetai'].init(d.id, d.name)
    // },
    // handleAdd(s, d, n) {
    //   this.apendId = d.id
    //   this.dialogForm = {
    //     name: ''
    //   }
    //   this.dialogFormVisible = true
    // },
    // handleEdit(s, d, n) {},
    // handleDelete(s, d, n) {
    //   this.$confirm('此操作将永久删除该分组及对应的信息, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
    //   ).then(() => {
    //     this.$http({
    //       url: this.$http.adornUrl(this.apiList.config.car.del),
    //       method: 'post',
    //       data: this.$http.adornData({ id: d.id }, this.apiList.config.car.del, true)
    //     }).then(({ data }) => {
    //       if (data.result) {
    //         // 删除成功
    //         this.$message({ type: 'success', message: '删除成功' })
    //         this.getdataList()
    //         // 如果删除的是当前详情页的节点，则删除对应的详情页
    //         if (this.apendId === d.id) {
    //           this.$refs['cityDetai'].init(this.$cookie.get('moduleId'), '')
    //         }
    //       } else {
    //         // 删除失败
    //         // this.$message.error(data.msg)
    //       }
    //     })
    //   }).catch(() => {
    //     // this.$message.error('未知错误')
    //   })
    // }
  }
}
</script>
<style>
/* .warn-content {
    background: rgba(66,185,131,.1);
    border-radius: 2px;
    padding: 16px;
    padding: 1rem;
    line-height: 1.6rem;
    word-spacing: .05rem
}

.warn-content a {
    color: #42b983;
    font-weight: 600
}

.expand{
  width:100%;
  height:100%;
  overflow:hidden;
}
.expand>div{
  height:85%;
  padding-top:20px;
  width:50%;
  margin:20px auto;
  max-width:400px;
  overflow-y:auto;
}
.expand>div::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  border-radius:5px;
}
.expand>div::-webkit-scrollbar-thumb{
  background-color:rgba(50, 65, 87, 0.5);
  outline:1px solid slategrey;
  border-radius:5px;
}
.expand>div::-webkit-scrollbar{
  width:10px;
}
.expand-tree{
  border:none;
  margin-top:10px;
}
.expand-tree .el-tree-node.is-current,
.expand-tree .el-tree-node:hover{
  overflow:hidden;
}
.expand-tree .is-current>.el-tree-node__content .tree-btn,
.expand-tree .el-tree-node__content:hover .tree-btn{
  display:inline-block;
}
.expand-tree .is-current>.el-tree-node__content .tree-label{
  font-weight:600;
  white-space:normal;
} */
</style>