export const Review = body => {
  return new Promise((resolve, reject) => {
    console.info(body)
    fetch(`./api/ledger/11/review/`, {
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

export const ListReview = () => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/11/review/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const Update = (id, body) => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/11/${id}`, {
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
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/11/${id}`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const List = () => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/11/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}

export const Save = body => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/11/`, {
      method: 'POST',
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