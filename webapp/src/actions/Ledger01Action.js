export const Stats = () => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/01/stats`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const ReturnItem = body => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/01/return/${body.id}`, {
      method: 'PUT',
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

export const ReturnList = () => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/01/return/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const Save = body => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/01/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json)
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const GetList = () => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/01/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}