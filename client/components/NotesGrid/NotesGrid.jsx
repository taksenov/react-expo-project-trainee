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

        // let i = 0;
        // for (let elem of this.props.notes) {
        //     console.log(elem);
        //     i++
        // console.log(this.props.notes.valueSeq());
        console.log([...this.props.notes]);
        // }
        // this.props.notes.valueSeq().map(note =>
        //     console.log(note)
        // );

        // console.log('Masonry this.props.notes', this.props.notes);


    //[...props.todos.values()].reverse().

        return (
            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    this.props.notes.valueSeq().map(note =>
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
