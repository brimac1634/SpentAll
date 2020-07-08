import axios from 'axios';
import Cookies from 'universal-cookie';

const axiosConfig = (method, endpoint, data) => {
	const url = process.env.REACT_APP_SERVER;
	const cookies = new Cookies();
	const token = cookies.get('authToken');
	return axios({
		method,
		url: url + endpoint,
		data,
		headers: {
			'x-access-token': 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	})
}

export default axiosConfig