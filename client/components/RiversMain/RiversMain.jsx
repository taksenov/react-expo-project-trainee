import React from 'react';
import {Container} from 'flux/utils';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import ClsNames from 'classnames';

import RiversInputForm from '../RiversInputForm/RiversInputForm.jsx';
import RiversArchive from '../RiversArchive/RiversArchive.jsx';
import RiversGraf from '../RiversGraf/RiversGraf.jsx';

import RiversStore from '../../data/stores/RiversStore';
import RiversActions from '../../data/actions/RiversActions';

import RiverEditor from '../RiverEditor/RiverEditor.jsx';
import RiversGrid from '../RiversGrid/RiversGrid.jsx';

let activeClass = 'active';
let formCls = false;

class RiversMain extends React.Component {

    render() {
          
        const TabsRiversMenuLink = ({ label, to, activeOnlyWhenExact }) => (
            <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
                <li className={match ? 'active' : ''}>
                    <Link to={to}>{label}</Link>
                </li>
            )}/>
        ); //TabsRiversMenuLink

        return (
            <div className='EddsData__RiversMain'>

                {/* Header */}
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <h2 className='App__header'> Реки </h2>
                    </div>
                </div>
 
                <Router>
                    <div>

                        {/* Tabs */}
                        <ul className='nav nav-tabs'>
                            <TabsRiversMenuLink to='/riversForm' label='Форма ввода' />
                            <TabsRiversMenuLink to='/riversArchive' label='Архив' />
                            <TabsRiversMenuLink to='/riversGraf' label='Графики' />
                        </ul>

                        {/* Tabs Content */}
                        <div id='myTabContent' className='tab-content'>
                            <Route exact path='/riversForm' component={RiversInputForm}/>
                            <Route path='/riversArchive' component={RiversArchive}/>
                            <Route path='/riversGraf' component={RiversGraf}/>
                        </div>
                    
                    </div>
                </Router>

            </div>
        );
    }

} //RiversMain

export default RiversMain;
