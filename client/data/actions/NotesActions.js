import AppDispatcher from '../dispatcher/AppDispatcher';
import NotesActionTypes from '../actiontypes/NotesActionTypes';

import api from '../../api';
 
const NoteActions = {
    loadNotes() {
        AppDispatcher.dispatch({
            type: NotesActionTypes.LOAD_NOTES_REQUEST
        });

        api.listNotes()
            .then(({ data }) => {
                AppDispatcher.dispatch({
                    type: NotesActionTypes.LOAD_NOTES_SUCCESS,
                    notes: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: NotesActionTypes.LOAD_NOTES_FAIL,
                    error: err
                })
            );
    },

    createNote(note) {
        api.createNote(note)
            .then(() =>
                this.loadNotes()
            )
            .catch(err =>
                console.error(err)
            );
    },

    deleteNote(noteId) {
        api.deleteNote(noteId)
            .then(() =>
                this.loadNotes()
            )
            .catch(err =>
                console.error(err)
            );
    }
};

export default NoteActions;
