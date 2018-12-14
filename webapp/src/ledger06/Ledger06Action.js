export const Update = (id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/06/${id}`, {
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

export const Get = id => {
  return new Promise(( resolve, reject) => {
    fetch(`./api/ledger/06/${id}`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => window.console && console.error(err))
  })
}

export const List = () => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/06/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const Save = body => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/06/`, {
      method: 'POST',
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