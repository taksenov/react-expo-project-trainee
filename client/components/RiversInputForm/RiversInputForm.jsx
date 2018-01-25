import React from 'react';
import { Container } from 'flux/utils';

import RiversStore from '../../data/stores/RiversStore';
import RiversActions from '../../data/actions/RiversActions';

import RiverEditor from '../RiverEditor';
import RiversGrid from '../RiversGrid';

class RiversInputForm extends React.Component {
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
            <div className="EddsData__RiversMain">
                {/* RiverEditor */}
                <div className="row">
                    <div className="col-lg-12">
                        <RiverEditor onRiverAdd={this.handleRiverAdd} />
                    </div>
                </div>

                {/* RiversGrid */}
                <div className="row">
                    <div className="col-lg-12">
                        <RiversGrid
                            rivers={this.state.rivers}
                            onRiverDelete={this.handleRiverDelete}
                        />
                    </div>
                </div>
            </div>
        );
    }
} //RiversMain

export default Container.create(RiversInputForm);
