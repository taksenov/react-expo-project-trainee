import React from 'react';
import Masonry from 'react-masonry-component';

import River from '../River/River.jsx';

import './RiversGrid.style.less';

class RiversGrid extends React.Component {
    render() {
        const masonryOptions = {
            itemSelector: '.River',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };

        return (
            <Masonry
                className='RiversGrid'
                options={masonryOptions}
            >
                {
                    this.props.rivers.map(river =>
                        <River
                            key={river.id}
                            name={river.name}
                            onDelete={this.props.onRiverDelete.bind(null, river)}
                        >
                            {river.comment}
                        </River>
                    )
                }
            </Masonry>
        );
    }
} //RiversGrid

export default RiversGrid;
