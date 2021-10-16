<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <!-- 提示区 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->

      <el-steps
        :space="200"
        :active="acttiveindex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品照片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 侧边栏 -->
      <el-form
        :model="addForm"
        :rules="addFormRouter"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          :tab-position="'left'"
          v-model="acttiveindex"
          :before-leave="beforeTableave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price" type="numder">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight" type="numder">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number" type="numder">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                :options="catelist"
                :props="cateProps"
                expand-trigger="hover"
                v-model="addForm.goods_cat"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品照片" name="3">商品照片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { classify } from "../../request/http.js";
import { argument } from "../../request/http.js";

export default {
  props: {},
  data() {
    return {
      acttiveindex: "0",
    //   添加商品列表的数据对象
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
      },
      addFormRouter: {
        goods_name: [
          {
            required: true,
            message: "商品名称",
            trigger: "blur",
          },
        ],
        goods_price: [
          {
            required: true,
            message: "商品价格",
            trigger: "blur",
          },
        ],
        goods_weight: [
          {
            required: true,
            message: "商品重量",
            trigger: "blur",
          },
        ],
        goods_number: [
          {
            required: true,
            message: "商品数量",
            trigger: "blur",
          },
        ],
        goods_cat: [
          {
            required: true,
            message: "选择商品分类",
            trigger: "blur",
          },
        ],
      },
      //全部商品分类
      catelist: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
    //   动态参数列表数据
      manytabdata:[]
    };
  },
  created() {
    this.getCatList();
  },
  methods: {
    //   全部商品分类
    async getCatList() {
      const { data: res } = await classify();
      this.catelist = res.data;
      // console.log(res);
    },
    handleChange() {
      console.log(this.addForm.goods_cat);
      if (this.addForm.goods_cat.length != 3) {
        this.addForm.goods_cat = [];
      }
    },
    beforeTableave(activename, oldactivename) {
      if (oldactivename === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error(" 请选着商品分类");
        return false;
      }
    },
    async tabClicked() {
      if (this.acttiveindex === "1") {
        const { data: res } = await argument(this.addForm.goods_cat[2], "many");
        console.log(res);
        this.manytabdata=res.data
      }
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>