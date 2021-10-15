<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <!-- 为Echarts准备具备大小的dom -->
      <div id="main" style="witch: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
// 导入封装的请求
import { stat } from "../../request/http.js";
import _ from "lodash";
// 导入echarts
import * as echarts from "echarts";
export default {
  props: {},
  data() {
    return {
      // 剩余数据
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  // 此时页面的元素已经被渲染完毕
  async mounted() {
    // 基于准备好的dom 初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 请求数据
    const { data: res } = await stat();
    console.log(res);
    if (res.meta.status !== 200) {
      return this.$message.error("获取这折线图失败！");
    }
    // 准备数据和请求数据合并（merge 是loadsh一个合并两个对象的方法）
    const result = _.merge(res.data, this.options);
    // 展示数据
    myChart.setOption(result);
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
</style>
