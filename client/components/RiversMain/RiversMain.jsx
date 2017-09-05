import React from 'react';
import {Container} from 'flux/utils';

import RiversStore from '../../data/stores/RiversStore';
import RiversActions from '../../data/actions/RiversActions';

import RiverEditor from '../RiverEditor/RiverEditor.jsx';
import RiversGrid from '../RiversGrid/RiversGrid.jsx';

class RiversMain extends React.Component {

    static getStores() { 
        return [RiversStore]; 
    } 

    static calculateState(prevState) { 
        return RiversStore.getState(); 
    }

    componentWillMount() {
        RiversActions.loadRivers();
    }

    handleRiverDelete(river) {
        RiversActions.deleteRiver(river.id);
    }

    handleRiverAdd(riverData) {
        RiversActions.createRiver(riverData);
    }

    render() {
        return (
            <div className='EddsData__RiversMain'>

                {/* Header */}
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <h2 className='App__header'> Rivers </h2>
                    </div>
                </div>
 
                {/* RiverEditor */}
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <RiverEditor onRiverAdd={this.handleRiverAdd} />
                    </div>
                </div>

                {/* RiversGrid */}
                <div className='row'>
                    <div className='col-lg-12'>
                        <RiversGrid rivers={this.state.rivers} onRiverDelete={this.handleRiverDelete} />
                    </div>
                </div>
        
            </div>
        );
    }

} //RiversMain

export default Container.create(RiversMain);
