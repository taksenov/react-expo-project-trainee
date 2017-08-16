import React from 'react';
import ReactDOM from 'react-dom';

import * as jQuery from 'jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.min';

import App from './components/App/App.jsx';

import './commonless/bootswatchTheme/main.less';

ReactDOM.render(
    <App />,
    document.getElementById('mount-point')
);
