import instance from "./index.js";
/* 登录 */
export function login(user, pass) {
  return instance({
    method: "post",
    url: "/login",
    data: {
      username: user,
      password: pass,
    },
  });
}
/* 请求左侧导航栏 */
export function menus() {
  return instance({
    url: "/menus",
  });
}

/*--------------  用户管理  -----------*/

/* 请求用户数据 */
export function users(queryInfo) {
  return instance({
    url: "/users",
    params: queryInfo,
  });
}

/* 监听用户状态权限 */
export function usersState(userinfo) {
  return instance({
    url: `users/${userinfo.id}/state/${userinfo.mg_state}`,
    method: "put",
  });
}

/* 添加用户 */
export function userss(addForm) {
  return instance({
    url: "/users",
    method: "post",
    data: addForm,
  });
}

/* 修改用户信息1 */
export function usersss(id) {
  return instance({
    url: `/users/${id}`,
    method: "get",
    data: id,
  });
}

/* 修改用户信息2 */
export function userssss(editForm) {
  return instance({
    url: `/users/${editForm.id}`,
    method: "put",
    data: editForm,
  });
}

/* 删除用户信息 */
export function usersssss(id) {
  return instance({
    url: `/users/${id}`,
    method: "delete",
    //  data: id,
  });
}

/* 删除用户信息 */
export function rolesse() {
  return instance({
    url: "roles",
    method: "get",
    //  data: id,
  });
}

/* ----------- 权限管理-------------    */
// 获取权限列表
export function rights() {
  return instance({
    url: "/rights/list",
    method: "get",
  });
}

// 获取角色列表
export function roles() {
  return instance({
    url: "/roles",
    method: "get",
    // data: addForm,
  });
}
// 删除三级权限
export function roless(role, rightid) {
  return instance({
    url: `/roles/${role.id}/rights/${rightid}`,
    method: "delete",
  });
}

// 获取权限列表
export function rightss() {
  return instance({
    url: "/rights/tree",
    method: "get",
  });
}

// 分配角色权限
export function rolesid({ roleId }) {
  return instance({
    url: `roles/${roleId}/rights`,
    method: "post",
  });
}

export function mov_now() {
  return instance({
    url: "/movie_now",
  });
}
export function mov_future() {
  return instance({
    url: "/movie_future",
  });
}
export function group() {
  return instance({
    url: "/group",
  });
}

export function reg(user, pass) {
  return instance({
    method: "post",
    url: "/register",
    data: {
      username: user,
      password: pass,
    },
  });
}
