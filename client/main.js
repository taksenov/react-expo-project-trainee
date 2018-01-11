// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// BOOTSTRAP3 SUPPORT
import * as jQuery from 'jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './commonless/bootswatchTheme/main.less';

//ANIMATE-CSS SUPPORT
import './commonless/animateCSS/animate.min.css';

//PRINT-CSS SUPPORT
import './commonless/bootswatchTheme/printversion.less';

// COMPONENTS
import App from './components/App/App.jsx';

const appHistory = createBrowserHistory();

// RENDER
ReactDOM.render(
    <Router history={appHistory}>
        <App />
    </Router>,
    document.getElementById('mount-point')
);
