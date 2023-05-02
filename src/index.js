import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.module.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from "./contexts/reduxStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
	// </React.StrictMode>
);

reportWebVitals();
