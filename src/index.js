import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './components/scroll-to-top/scroll-to-top.component';

import './index.css';
import App from './App';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ScrollToTop />
			<App />
		</BrowserRouter>
  	</Provider>
, document.getElementById('root'));

serviceWorker.register()