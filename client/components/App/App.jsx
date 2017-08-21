import React from 'react';
import {Container} from 'flux/utils';

// import NotesStore from '../../stores/NotesStore';
// import NotesActions from '../../actions/NotesActions';

import NotesStore from '../../data/stores/NotesStore';
import NotesActions from '../../data/actions/NotesActions';

// import AppContainer from '../../containers/AppContainer';

import NoteEditor from '../NoteEditor/NoteEditor.jsx';
import NotesGrid from '../NotesGrid/NotesGrid.jsx';

// function getStateFromFlux() {
//     return {
//         isLoading: NotesStore.isLoading(),
//         notes: NotesStore.getNotes()
//     };
// }

class App extends React.Component {

    //IDEA: читай вот тут про store и его состояние https://metanit.com/web/react/5.1.php
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         notes: []
    //     };
    //     console.log('App: Initial this.state.notes', this.state.notes);
    // }
    
    static getStores() { 
        return [NotesStore]; 
    } 

    static calculateState(prevState) { 
        return { 
            notes: NotesStore.getState(),
        }; 
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
                    <div className='col-lg-12 text-center'>
                        <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
                    </div>
                </div>

            </div>
        );
    }

    // _onChange() {
    //     this.setState(getStateFromFlux());
    // }

} //App

export default Container.create(App);
