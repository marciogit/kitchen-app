import axios from 'axios';

const api = axios.create({
	baseURL: "http://192.168.24.139:3333"
})

export default api;