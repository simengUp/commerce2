<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <el-row>
        <el-col>
            <el-button type="primary">添加分类</el-button>
        </el-col>
        <!-- 表格区域 -->


        <!-- 分页区域 -->
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        // 查询条件
        querInfo:{
            type:3,
            pagenum:1,
            pagesize:5,
        },
        // 商品分类的数据列表 默认为空
        catelist:[],
    };
  },
  created() {
      this.getCataList()
  },
  methods: {
    //   获取商品分类数据
    getCataList(){
        
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>
