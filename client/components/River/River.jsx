import React from 'react';

import './River.style.less';

class River extends React.Component {
    render() {

        return (

            <tr className='River'>
                <td>{this.props.scalingDate}</td>
                <td>{this.props.name}</td>
                <td>{this.props.hydroPost}</td>
                <td>{this.props.levelToday}</td>
                <td>{this.props.levelDelta}</td>
                <td>{this.props.levelAPPG}</td>
                <td>{this.props.comment}</td>
                <td>
                    <span className='glyphicon glyphicon-pencil River__action-icon' aria-hidden='true' ></span>
                    <span className='glyphicon glyphicon-remove River__action-icon' aria-hidden='true' onClick={this.props.onDelete}></span>
                </td>
            </tr>

        );
    }
} //River

export default River;



// {/*
// <div className='River'>
//     <span className='River__del-icon' onClick={this.props.onDelete}> × </span>
//     {
//         this.props.name
//             ?
//             <h4 className='River__name'>{this.props.name}</h4>
//             :
//             null
//     }
//     <div className='River__text'>{this.props.children}</div>
// </div>
// */}
