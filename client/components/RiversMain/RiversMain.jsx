import React from 'react';
import {Container} from 'flux/utils';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import RiversInputForm from '../RiversInputForm/RiversInputForm.jsx';
import RiversArchive from '../RiversArchive/RiversArchive.jsx';

import RiversStore from '../../data/stores/RiversStore';
import RiversActions from '../../data/actions/RiversActions';

import RiverEditor from '../RiverEditor/RiverEditor.jsx';
import RiversGrid from '../RiversGrid/RiversGrid.jsx';

class RiversMain extends React.Component {

    // static getStores() { 
    //     return [RiversStore]; 
    // } 

    // static calculateState(prevState) { 
    //     return RiversStore.getState(); 
    // }

    // componentWillMount() {
    //     RiversActions.loadRivers();
    // }

    // handleRiverDelete(river) {
    //     RiversActions.deleteRiver(river.id);
    // }

    // handleRiverAdd(riverData) {
    //     RiversActions.createRiver(riverData);
    // }

    render() {
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
                    
                        <ul className='nav nav-tabs'>
                            <li className=''>
                                <Link to='/rivers/form'>Форма ввода</Link>
                            </li>
                            <li className=''>
                                <Link to='/rivers/archive'>Архив</Link>
                            </li>
                            <li className=''>
                                <Link to='/rivers/form2'>Графики</Link>
                            </li>
                        </ul>

                        <div id='myTabContent' className='tab-content'>
                            <Route exact path='/rivers/form' component={RiversInputForm}/>
                            <Route path='/rivers/archive' component={RiversArchive}/>
                            <Route path='/rivers/form2' component={RiversInputForm}/>
                        </div>
                    
                    </div>
                </Router>

            </div>
        );
    }

} //RiversMain

export default RiversMain;
