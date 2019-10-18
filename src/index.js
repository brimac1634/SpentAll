import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import Cookies from 'universal-cookie';

import './index.css';
import App from './App';

const cookies = new Cookies();
const token = cookies.get('authToken')

axios.defaults.baseURL = (process.env.NODE_ENV === 'production') 
	? ''
	: 'http://localhost:5000'
axios.defaults.headers.common['x-access-token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
  	</Provider>
, document.getElementById('root'));
