import axios from 'axios';

const instance = axios.create({
    baseURL:' https://discord-clone123.herokuapp.com'
})

export default instance;