import axios from 'axios'

const rest = axios.create({
    baseURL: 'https://wls-ws-marketplace.herokuapp.com'
})

export default rest