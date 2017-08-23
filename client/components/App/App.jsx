import React from 'react';
import {Container} from 'flux/utils';

import NotesStore from '../../data/stores/NotesStore';
import NotesActions from '../../data/actions/NotesActions';

import NoteEditor from '../NoteEditor/NoteEditor.jsx';
import NotesGrid from '../NotesGrid/NotesGrid.jsx';

class App extends React.Component {
    
    static getStores() { 
        return [NotesStore]; 
    } 

    static calculateState(prevState) { 
        return NotesStore.getState(); 
    }

    componentWillMount() {
        NotesActions.loadNotes();
    }

    componentDidMount() {
        // NotesStore.addChangeListener(() => this._onChange);
    }

    componentWillUnmount() {
        // NotesStore.removeChangeListener(() => this._onChange);
    }

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    }

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    }

    render() {
        return (
            <div className='App'>

                {/* Header */}
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <h2 className='App__header'> Notes </h2>
                    </div>
                </div>

                {/* NoteEditor */}
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <NoteEditor onNoteAdd={this.handleNoteAdd} />
                    </div>
                </div>

                {/* notesGrid */}
                <div className='row'>
                    <div className='col-lg-12'>
                        <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
                    </div>
                </div>

            </div>
        );
    }

} //App

export default Container.create(App);
