import React from 'react';
import Masonry from 'react-masonry-component';

import Note from '../Note/Note.jsx';

import './NotesGrid.style.less';

class NotesGrid extends React.Component {
    render() {
        const masonryOptions = {
            itemSelector: '.Note',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };
 
        return (
            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    this.props.notes.map(note =>
                        <Note
                            key={note.id}
                            title={note.title}
                            onDelete={this.props.onNoteDelete.bind(null, note)}
                            color={note.color}
                        >
                            {note.text}
                        </Note>
                    )
                }
            </Masonry>
        );
    }
} //NotesGrid

export default NotesGrid;
