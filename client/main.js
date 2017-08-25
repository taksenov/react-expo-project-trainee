// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// BOOTSTRAP3 SUPPORT
import * as jQuery from 'jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './commonless/bootswatchTheme/main.less';

// COMPONENTS
import App from './components/App/App.jsx';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('mount-point')
);
