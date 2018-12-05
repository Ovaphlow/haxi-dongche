export const FilterDeptByRemark = remark => {
  return new Promise((resolve, reject) => {
    fetch(`./api/common/dept/filter/remark/${remark}`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const LoginAction = body => {
  return new Promise((resolve, reject) => {
    fetch('./api/common/user/login', {
      method: 'post',
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}