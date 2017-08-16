import React from 'react';

import NoteEditor from '../NoteEditor/NoteEditor.jsx';
import NotesGrid from '../NotesGrid/NotesGrid.jsx';

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <h2 className='App__header'> Notes </h2>
                    </div>
                </div>
                <NoteEditor />
                <NotesGrid />
            </div>
        );
    }
} //App

export default App;
