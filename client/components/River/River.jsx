import React from 'react';

import './River.style.less';

class River extends React.Component {

    render() {

        return (

            <tr className='River'>
                <td>
                    <span className='hidden-md hidden-lg'>
                        {this.props.scalingDate}
                    </span>
                    <input
                        type='text'
                        className='form-control hidden-xs hidden-sm'
                        placeholder='ГГГГ-ММ-ДД чч:мм'
                        value={this.props.scalingDate}
                        disabled={true}
                    />
                </td>
                <td>
                    <span className='hidden-md hidden-lg'>
                        {this.props.name}
                    </span>                
                    <input
                        type='text'
                        className='form-control hidden-xs hidden-sm'
                        placeholder='123'
                        value={this.props.name}
                        disabled={true}
                    />                    
                </td>
                <td>
                    <span className='hidden-md hidden-lg'>
                        {this.props.hydroPost}
                    </span>                
                    <input
                        type='text'
                        className='form-control hidden-xs hidden-sm'
                        placeholder='123'
                        value={this.props.hydroPost}
                        disabled={true}
                    />                    
                </td>
                <td>
                    <span className='hidden-md hidden-lg'>
                        {this.props.levelToday}
                    </span>                
                    <input
                        type='text'
                        className='form-control hidden-xs hidden-sm'
                        placeholder='123'
                        value={this.props.levelToday}
                        disabled={true}
                    />                    
                </td>
                <td>
                    <span className='hidden-md hidden-lg'>
                        {this.props.levelDelta}
                    </span>                
                    <input
                        type='text'
                        className='form-control hidden-xs hidden-sm'
                        placeholder='123'
                        value={this.props.levelDelta}
                        disabled={true}
                    />                    
                </td>
                <td>
                    <span className='hidden-md hidden-lg'>
                        {this.props.levelAPPG}
                    </span>                
                    <input
                        type='text'
                        className='form-control hidden-xs hidden-sm'
                        placeholder='123'
                        value={this.props.levelAPPG}
                        disabled={true}
                    />                    
                </td>
                <td>
                    <span className='hidden-md hidden-lg'>
                        {this.props.comment}
                    </span>                
                    <input
                        type='text'
                        className='form-control hidden-xs hidden-sm'
                        placeholder='123'
                        value={this.props.comment}
                        disabled={true}
                    />                    
                </td>
                <td>
                    <span className='glyphicon glyphicon-pencil River__action-icon hidden-xs hidden-sm' aria-hidden='true' onClick={()=>console.log('Edit River')}></span>
                    <span className='glyphicon glyphicon-remove River__action-icon' aria-hidden='true' onClick={this.props.onDelete}></span>
                </td>
            </tr>

        );
    }
} //River

export default River;
