import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
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
        //TODO: в будущем разобраться и использовать immutable //(return Immutable.OrderedMap();)
        return { notes: [] || null };
    }

    reduce(state, action) {
        switch (action.type) {
            case NotesActionTypes.LOAD_NOTES_REQUEST: {
                _isLoading = true;

                return state;
            }

            case NotesActionTypes.LOAD_NOTES_SUCCESS: {
                _isLoading = false;
                _notes = action.notes.map(formatNote);
                _loadingError = null;

                return (state = { notes: _notes });
            }

            case NotesActionTypes.LOAD_NOTES_FAIL: {
                _loadingError = action.error;

                return state;
            }

            default: {
                return state;
            }
        }
    }
}

export default new NotesStore();
