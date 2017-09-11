import {ReduceStore} from 'flux/utils';
import RiversActionTypes from '../actiontypes/RiversActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

let _rivers = [];
let _loadingError = null;
let _isLoading = true;
 
function formatRiver(river) {
    return {
        id           : river._id,
        name         : river.name,
        hydroPost    : river.hydroPost || 'Полноват',
        levelToday   : river.levelToday,
        levelDelta   : river.levelDelta || 0,
        levelAPPG    : river.levelAPPG || 0,
        typeRiver    : river.typeRiver,
        scalingDate  : river.scalingDate || new Date(),
        criticalLevelPashtory: river.criticalLevelPashtory,
        criticalLevelTugiyany: river.criticalLevelTugiyany,
        comment      : river.comment || 'Чисто',
    };
}

class RiversStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return { rivers: [] || null };
    }

    reduce(state, action) {
        switch(action.type) {

        case RiversActionTypes.LOAD_RIVERS_REQUEST: {
            _isLoading = true;

            return state;
        }

        case RiversActionTypes.LOAD_RIVERS_SUCCESS: {
            _isLoading = false;
            _rivers = action.rivers.map( formatRiver );
            _loadingError = null;

            return state = { rivers: _rivers };
        }

        case RiversActionTypes.LOAD_RIVERS_FAIL: {
            _loadingError = action.error;

            return state;
        }

        default: {
            return state;
        }

        }
    }
}

export default new RiversStore();
 
