import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteNumber = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}
const updateNumber = (id, updateObject) => {
    console.log(id, updateObject);
    return axios.put(`http://localhost:3001/persons/${id}`, updateObject)
}

export default { getAll, create, deleteNumber, updateNumber }
