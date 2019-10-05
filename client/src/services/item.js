import axios from 'axios'
const baseUrl = '/api/items'

const searchItems = async searchString => {
    const response = await axios.get(`${baseUrl}?q=${searchString}`)
    return response.data
}

const getItem = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export default { searchItems, getItem }