import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Stars from './Stars'

ReactDOM.render(<Stars />, document.getElementById('root'));
registerServiceWorker();

