<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <!-- 搜索添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <!-- clearable表示情况 clear的点击事件是清空列表时触发 -->
            <!-- 上面v-model和下面的点击事件绑定 -->
            <el-button slot="append" icon="el-icon-search" @click="getUserList">
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 列表区域 -->
      <el-table :data="userlist" border stripe>
        <!-- 添加序列号  加上标签和type的值为index就可 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column label="电话" prop="mobile"> </el-table-column>
        <el-table-column label="角色" prop="role_name"> </el-table-column>
        <el-table-column label="状态">
          <!-- 插槽与开关绑定布尔值实现 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 分配按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="55%"
      @close="addDialogClosed"
    >
      <!-- 内容区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emile">
          <el-input v-model="addForm.emile"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="55%"
      @close="aditDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="提示" :visible.sync="setRoleDialogVisible" width="55%">
      <div>
        <p>当前用户：{{ userInfo.username }}</p>
        <p>当前角色：{{ userInfo.role_name }}</p>
        <p>
          分配新的角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRolsInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  users,
  usersState,
  userss,
  usersss,
  userssss,
  usersssss,
  rolesse,
} from "../../request/http";
export default {
  props: {},
  data() {
    //校验手机号邮箱   与下面的表单验证相辅助
    //验证邮箱规则
    var checkEmile = (rule, value, cb) => {
      //验证邮箱的正则
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) {
        //合法邮箱
        return cb();
      }

      cb(new Error("请输入合法邮箱"));
    };
    //验证手机号规则
    var checkMobile = (rule, value, cb) => {
      //验证手机的正则
      const regMobile =
        /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;

      if (regMobile.test(value)) {
        //合法手机号
        return cb();
      }

      cb(new Error("请输入合法手机号"));
    };

    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        //页码 当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      // 添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        emile: "",
        mobile: "",
      },

      // 添加用户表单规则验证
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        emile: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: checkEmile, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      //控制修改按钮显示与隐藏
      editDialogVisible: false,
      //查询到的用户信息对象
      editForm: {},
      //修改表单的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: checkEmile, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,

      // 需要被分配的角色的用户信息
      userInfo: [],
      // 所有角色的数据列表
      rolesList: [],
      // 已选择的角色id值
      selectedRoleId:'',
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await users(this.queryInfo);
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败");
      }
      this.userlist = res.data.users;
      this.total = res.data.total;
      // console.log(res);
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize);
      //显示当前每页显示的个数
      this.queryInfo.pagesize = newSize;
      //调取事件
      this.getUserList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      //赋值
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //监听swith开关的状态的改变
    async userStateChanged(userinfo) {
      //此不要加this  this指向当前页面的data 当前没用 直接用
      const { data: res } = await usersState(userinfo);
      // console.log(userinfo);
      if (res.meta.status != 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户状态成功");
    },
    //监听添加用户对话框关闭事件 关闭清空重置表单
    addDialogClosed() {
      this.$refs.addFormRules.resetFields();
    },
    //点击按钮  添加用户
    addUser() {
      // console.log(this.addForm);
      this.$refs.addFormRules.validate(async (valid) => {
        // console.log(valid);
        //如果验证失败直接返回出去 不走添加路径
        if (!valid) return;
        const { data: res } = await userss(this.addForm);
        // console.log(res);
        if (res.meta.status !== 201) {
          this.$message.error("添加用户失败！");
        }

        this.$message.success("添加用户成功！");
        //隐藏添加用户对话框
        this.addDialogVisible = false;
        //重新获取用户列表信息
        this.getUserList();
      });
    },
    //展示用户的对话框修改用户信息
    async showEditDialog(id) {
      // console.log(id);
      const { data: res } = await usersss(id);
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("查询用户信息失败！");
      }
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    aditDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //修改用户信息提交按钮
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        // 发起修改用户信息的数据请求
        // 把数组传过去 那边请求接收 url里面包含id
        const { data: res } = await userssss(this.editForm);
        // console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("更新用户信息失败！");
        }
        // 关闭对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.getUserList();
        // 提示修改成功
        this.$message.success("更新用户信息成功！");
      });
    },
    // 删除用户事件根据id删除
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      // 当点击确认删除时返回值是字符串confirm
      // 当点击取消删除时返回值是字符串cancel
      // console.log(confirmResult);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await usersssss(id);
      // console.log(id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除用户失败！");
      }
      this.$message.success("删除用户成功！");
      //重新获取用户列表信息
      this.getUserList();
    },
    //
    async setRole(userInfo) {
      this.userInfo = userInfo;

      // 展示对话框前 获取所有角色的列表
      const { data: res } = await rolesse;
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！");
      }

      this.rolesList = res.data;
      // this.$message.success("获取角色列表成功！");

      this.setRoleDialogVisible = true;
    },
    saveRolsInfo(){
      if(!this.selectedRoleId){
        return this.$message.error('请选择要分配的角色')
      }
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>
