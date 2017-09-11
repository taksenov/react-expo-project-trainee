import React from 'react';
import ClsNames from 'classnames';

class MessageForForm extends React.Component {
    render() {
        let messageClass = 'alert ';

        return (

            <div className='MessageForForm'>
                {
                    this.props.isError
                        ?
                        <div className='form-group'>
                            <div className={messageClass += this.props.messageClassName}>
                                {this.props.messageText}
                            </div>
                        </div>
                        :
                        null
                }
            </div>

        );
    }
} // MessageForForm

export default MessageForForm
