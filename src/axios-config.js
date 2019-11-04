import axios from 'axios';
import Cookies from 'universal-cookie';

const axiosConfig = (method, endpoint, data) => {
	const url = (process.env.NODE_ENV === 'production') 
		? 'https://spentall-server.herokuapp.com'
		: 'http://localhost:5000'
	const cookies = new Cookies();
	const token = cookies.get('authToken')
	return axios({
		method,
		url: url + endpoint,
		data,
		headers: {
			'x-access-token': token,
			'Content-Type': 'application/json'
		}
	})
}

export default axiosConfig