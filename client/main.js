import React from 'react';
import ReactDOM from 'react-dom';

import * as jQuery from 'jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.min';

import App from './components/App/App.jsx';
import NavBar from './components/NavBar/NavBar.jsx';

import './commonless/bootswatchTheme/main.less';

ReactDOM.render(
    <div className='EddsData'>

        <NavBar/>

        {/* Main container */}
        <div className='container'>
        
            {/* Workaround for NavBar height */}
            <div className='page-header'></div>
            {/* Workaround for NavBar height */}
            
            <App />

        </div>
        {/* Main container */}

    </div>,
    document.getElementById('mount-point')
);
