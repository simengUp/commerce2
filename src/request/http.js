import instance from './index.js'
/* 登录 */
export function login(user, pass) {
  return instance({
      method: 'post',
      url: "/login",
      data: {
        username: user,
        password: pass
      }
    })
}
/* 请求左侧导航栏 */
export function menus() {
  return instance({
    url: "/menus",
  })
}


export function home() {
  return instance({
    url: "/home",
  })
}
export function mov_now() {
  return instance({
    url: "/movie_now",
  })
}
export function mov_future() {
  return instance({
    url: "/movie_future",
  })
}
export function group() {
  return instance({
    url: "/group",
  })
}
export function stat() {
  return instance({
    url: "reports/type/1"
  })
}
export function order(queryinfo) {
  console.log(queryinfo);
  return instance({
    url: "/orders",
    params:{
      query: queryinfo.query,
      pagenum: queryinfo.pagenum,
      pagesize: queryinfo.pagesize,
    },
  })
}
export function goods(queryinfo) {
  return instance({
    url: "/goods",
    params:{
      query: queryinfo.query,
      pagenum: queryinfo.pagenum,
      pagesize: queryinfo.pagesize,
    },
  })
}

export function logistics() {
  return instance({
    url: "/kuaidi/1106975712662",
  })
}
export function classify() {
  return instance({
    url: "/categories",
  })
}
export function argument(id,many) {
  return instance({
    url: "/categories/"+id,
    params:{
      sel:many
    }
  })
}

export function delete_(id) {
  return instance({
    method: 'delete',
    url: "/goods/"+id,
  })
}

export function reg(user, pass) {
  return instance({
    method: 'post',
    url: "/register",
    data: {
      username: user,
      password: pass
    }
  })
}