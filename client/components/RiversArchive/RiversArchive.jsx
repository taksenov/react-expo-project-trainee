import React from 'react';
import {Container} from 'flux/utils';

import RiversStore from '../../data/stores/RiversStore';
import RiversActions from '../../data/actions/RiversActions';

import RiverFilter from '../RiverFilter/RiverFilter.jsx';
import RiversGrid from '../RiversGrid/RiversGrid.jsx';

class RiversArchive extends React.Component {

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

    handleFilterRiversWithYear(year) {
        RiversActions.setFilterRiversWithYear(year);
    }

    handleFilterRivers(year,river) {
        RiversActions.setFilterRiversWithYearRiver(year,river);
    }

    render() {
        return (
            <div className='EddsData__RiversMain'>

                {/* RiverEditor */}
                <div className='row'>
                    <div className='col-lg-12'>
                        <RiverFilter 
                            onRiversFilterWithYear={this.handleFilterRiversWithYear} 
                            onRiversFilterWithYearRiver={this.handleFilterRivers} 
                        />
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

export default Container.create(RiversArchive);
