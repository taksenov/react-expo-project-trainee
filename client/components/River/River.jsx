import React from 'react';

import './River.style.less';

class River extends React.Component {
    render() {

        return (
            <div className='River'>
                <span className='River__del-icon' onClick={this.props.onDelete}> × </span>
                {
                    this.props.name
                        ?
                        <h4 className='River__name'>{this.props.name}</h4>
                        :
                        null
                }
                <div className='River__text'>{this.props.children}</div>
            </div>
        );
    }
} //River

export default River;
