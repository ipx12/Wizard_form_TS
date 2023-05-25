import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './components/app/App';

import './style/style.scss'
import './style/fonts.scss'
import './style/buttons.scss'

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);


