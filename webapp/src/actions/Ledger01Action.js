export const GetList = () => {
  return new Promise((resolve, reject) => {
    fetch(`./api/ledger/01/`)
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(err => reject(err))
  })
}