import React from 'react';

import NoteEditor from '../NoteEditor/NoteEditor.jsx';
import NotesGrid from '../NotesGrid/NotesGrid.jsx';

class App extends React.Component {
    handleNoteAdd(data) {
        console.log(data);
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
                        <NotesGrid />
                    </div>
                </div>
            
            </div>
        );
    }
} //App

export default App;
