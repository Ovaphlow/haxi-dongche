export const ReviewDetail02Pjsy = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/02/${id}/p_jsy`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const ReviewDetail02Qc = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/02/${id}/qc`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const RemoveDetail02 = (master_id, id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/02/${id}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const UpdateDetail02 = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/02/${id}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetDetail02 = (master_id, id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/02/${id}`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const SaveDetail02 = (master_id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/02`, {
      method: 'post',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetDetail02Qty = master_id => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/02/qty`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const ListDetail02 = master_id => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/02/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const UpdateDetail01ReviewQc = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/01/${id}/qc`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const UpdateDetail01ReviewPbz = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/01/${id}/p_bz`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const RemoveDetail01 = (master_id, id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/01/${id}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const UpdateDetail01 = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/01/${id}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetDetail01 = (master_id, id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/01/${id}`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const SaveDetail01 = (master_id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/01`, {
      method: 'post',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetDetail01Qty = (master_id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/01/qty`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const ListDetail01 = master_id => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/01/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetDetail = id => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${id}`)
    .then(res => res.json())
    .then(response => {
      resolve(response)
    })
    .catch(err => reject(err))
  })
}