<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryinfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage"> 添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 订单列表 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="商品名称"
          prop="goods_name"
          width=""
        ></el-table-column>
        <el-table-column label="商品价格" prop="goods_price" width="95px">
        </el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px">
        </el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <!-- 修改-->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <!-- 删除-->
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入请求
import { goods } from "../../request/http.js";
import { delete_ } from "../../request/http.js";


export default {
  props: {},
  data() {
    return {
      // 传参参数
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      //   商品列表呢
      goodslist: [],
      total: 0,
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await goods(this.queryinfo);
      console.log(res);
      this.goodslist = res.data.goods;
      this.total = res.data.total;
    },
    // 下边的分页器
    handleSizeChange(newSize) {
      this.queryinfo.pagesize = newSize;
      this.goodslist();
    },

    handleCurrentChange(newPage) {
      this.queryinfo.pagenum = newPage;
      this.goodslist();
    },
    async remove(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除");
      }

      const { data: res } = await delete_(id);
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("删除失败啦～");
      }
      this.$message.success("删除成功")
      this.getGoodsList()
    },
    goAddpage(){
      this.$router.push("./goods/add")
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>
