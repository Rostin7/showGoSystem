<template>
  <div class="configGroup">
    <el-card shadow="hover">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- <el-tab-pane label="商场分类" name="mall">
          <mall-group />
        </el-tab-pane> -->
        <el-tab-pane label="儿童分类" name="shop">
          <shop-group />
        </el-tab-pane>
       <!-- <el-tab-pane label="美妆分类" name="makeup">
          <makeup-group />
        </el-tab-pane>
        <el-tab-pane label="宠物分类" name="pets">
          <pet-group />
        </el-tab-pane> -->
        <!-- <el-tab-pane label="其他分类" name="other">
          <other-group />
        </el-tab-pane> -->
        <el-tab-pane label="美食分类" name="food">
          <food-group />
        </el-tab-pane>
        <el-tab-pane label="娱乐分类" name="fun">
          <fun-group />
        </el-tab-pane>
        <el-tab-pane label="旅游分类" name="tour">
          <tour-group />
        </el-tab-pane>
       <!-- <el-tab-pane label="大牌分类" name="big">
          <big-group />
        </el-tab-pane> -->
        <el-tab-pane label="电商分类" name="netshop">
          <netshop-group />
        </el-tab-pane>
        <!-- <el-tab-pane label="年货分类" name="nianhuo">
          <nianhuo-group />
        </el-tab-pane>
        <el-tab-pane label="汽车分类" name="carGroup">
          <car-group />
        </el-tab-pane> -->
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
// import CarGroup from './carGroup'
// import BigGroup from './bigPaiGroup'
import NetshopGroup from './shopOlGroup'
// import MallGroup from './mallGroup'
import ShopGroup from './shopGroup'
// import MakeupGroup from './makeupGroup'
// import PetGroup from './petGroup'
// import OtherGroup from './otherGroup'
import FoodGroup from './foodGroup'
import FunGroup from './funGroup'
import TourGroup from './tourGroup'
// import NianhuoGroup from './NianhuoGroup'
export default {
  data() {
    return {
      activeName: 'mall'
    }
  },
  components: {
    // CarGroup,
    // MallGroup,
    ShopGroup,
    // MakeupGroup,
    // PetGroup,
    // OtherGroup,
    FoodGroup,
    FunGroup,
    TourGroup,
    // BigGroup,
    NetshopGroup,
    // NianhuoGroup
  },
  methods: {
    handleClick() {
      console.log('切换数据')
    }
  }
}
</script>
<style lang="">
  
</style>