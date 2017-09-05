import AppDispatcher from '../dispatcher/AppDispatcher';
import RiversActionTypes from '../actiontypes/RiversActionTypes';

import api from '../../api';

const RiverActions = {
    loadRivers() {
        AppDispatcher.dispatch({
            type: RiversActionTypes.LOAD_RIVERS_REQUEST
        });

        api.listRivers()
            .then(({ data }) => {
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_SUCCESS,
                    rivers: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_FAIL,
                    error: err
                })
            );
    },

    createRiver(river) {
        api.createRiver(river)
            .then(() =>
                this.loadRivers()
            )
            .catch(err =>
                console.error(err)
            );
    },

    deleteRiver(riverId) {
        api.deleteRiver(riverId)
            .then(() =>
                this.loadRivers()
            )
            .catch(err =>
                console.error(err)
            );
    }
};

export default RiverActions;
