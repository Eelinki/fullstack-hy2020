import Axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = Axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = Axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = Axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteItem = (id) => {
  const request = Axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteItem }