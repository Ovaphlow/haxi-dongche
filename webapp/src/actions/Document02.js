export const GetSchedule = id => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/schedule/${id}`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetLatestScheduleList = () => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/schedule/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetLatestScheduleListByDept = dept => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/schedule/dept/${dept}/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const ReviewDetail04Qc = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/04/${id}/qc`, {
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

export const ReviewDetail04Pbz = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/04/${id}/p_bz`, {
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

export const RemoveDetail04 = (master_id, id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/04/${id}`, {
      method: 'delete',
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const UpdateDetail04 = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/04/${id}`, {
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

export const GetDetail04 = (master_id, id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/04/${id}`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const SaveDetail04 = (master_id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/04`, {
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

export const GetDetail04Qty = master_id => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/04/qty`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const ListDetail04 = master_id => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/04/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const ReviewDetail03Pjsy = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/03/${id}/p_jsy`, {
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

export const ReviewDetail03Qc = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/03/${id}/qc`, {
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

export const RemoveDetail03 = (master_id, id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/03/${id}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const UpdateDetail03 = (master_id, id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/03/${id}`, {
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

export const GetDetail03 = (master_id, id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/03/${id}`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const SaveDetail03 = (master_id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/03`, {
      method: 'post',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetDetail03Qty = (master_id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/03/qty`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const ListDetail03 = (master_id) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/${master_id}/detail/03/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

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

export const SaveDocument02Schedule = body => {
  return new Promise((resolve, reject) => {
    fetch(`./api/document/02/schedule/`, {
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