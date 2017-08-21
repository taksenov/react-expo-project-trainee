import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import NotesActionTypes from '../actiontypes/NotesActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

let _notes = [];
let _loadingError = null;
let _isLoading = true;

function formatNote(note) {
    return {
        id: note._id,
        title: note.title,
        text: note.text,
        color: note.color || '#ffffff',
        createdAt: note.createdAt
    };
}

class NotesStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch(action.type) {
            
            case NotesActionTypes.LOAD_NOTES_REQUEST: {
                _isLoading = true;
    
                return state;
            }
    
            case NotesActionTypes.LOAD_NOTES_SUCCESS: {
                _isLoading = false;
                _notes = action.notes.map( formatNote );
                _loadingError = null;
                
                return state.set(_notes);
            }
    
            case NotesActionTypes.LOAD_NOTES_FAIL: {
                _loadingError = action.error;
    
                return state;
            }
    
            default: {
                console.log('No such handler');
            }
    
        }
    }
}

export default new NotesStore();












// const CHANGE_EVENT = 'change';





// const TasksStore = Object.assign({}, EventEmitter.prototype, {
//     isLoading() {
//         return _isLoading;
//     },

//     getNotes() {
//         return _notes;
//     },

//     emitChange() {
//         this.emit(CHANGE_EVENT);
//     },

//     addChangeListener(callback) {
//         this.on(CHANGE_EVENT, callback);
//     },

//     removeChangeListener(callback) {
//         this.removeListener(CHANGE_EVENT, callback);
//     }
// });

// AppDispatcher.register(function(action) {
//     switch(action.type) {

//         case NotesActionTypes.LOAD_NOTES_REQUEST: {
//             _isLoading = true;

//             TasksStore.emitChange();
//             break;
//         }

//         case NotesActionTypes.LOAD_NOTES_SUCCESS: {
//             _isLoading = false;
//             _notes = action.notes.map( formatNote );
//             _loadingError = null;

//             TasksStore.emitChange();
//             break;
//         }

//         case NotesActionTypes.LOAD_NOTES_FAIL: {
//             _loadingError = action.error;

//             TasksStore.emitChange();
//             break;
//         }

//         default: {
//             console.log('No such handler');
//         }

//     }
// });

// export default TasksStore;
