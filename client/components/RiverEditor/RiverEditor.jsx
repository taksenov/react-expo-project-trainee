import React from 'react';
 
import './RiverEditor.style.less';

class RiverEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id           : '',
            name         : '',
            hydroPost    : '',
            levelToday   : '',
            levelDelta   : '',
            levelAPPG    : '',
            typeRiver    : '',
            scalingDate  : '',
            criticalLevelPashtory: '',
            criticalLevelTugiyany: '',
            comment      : ''
        };
    }

    handleCommentChange(event) {
        this.setState({ comment: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleRiverAdd() {
        const newRiver = {
            id           : this.state.id,
            name         : this.state.name,
            hydroPost    : this.state.hydroPost || 'Полноват',
            levelToday   : this.state.levelToday,
            levelDelta   : this.state.levelDelta,
            levelAPPG    : this.state.levelAPPG,
            typeRiver    : this.state.typeRiver,
            scalingDate  : this.state.scalingDate,
            criticalLevelPashtory: this.state.criticalLevelPashtory,
            criticalLevelTugiyany: this.state.criticalLevelTugiyany,
            comment      : this.state.comment     

        };

        this.props.onRiverAdd(newRiver);
        this.setState({
            id           : '',
            name         : '',
            hydroPost    : '',
            levelToday   : '',
            levelDelta   : '',
            levelAPPG    : '',
            typeRiver    : '',
            scalingDate  : '',
            criticalLevelPashtory: '',
            criticalLevelTugiyany: '',
            comment      : ''
        });
    }

    render() {
        return (
            <div className='RiverEditor'>
                <input
                    type='text'
                    className='RiverEditor__title'
                    placeholder='Enter river name'
                    value={this.state.name}
                    onChange={(e) => this.handleNameChange(e)}
                />
                <textarea
                    placeholder='Enter comment text'
                    rows={5}
                    className='RiverEditor__text'
                    value={this.state.comment}
                    onChange={(e) => this.handleCommentChange(e)}
                />
                <div className='RiverEditor__footer'>
                    <button
                        className='RiverEditor__button'
                        disabled={!this.state.name}
                        onClick={() => this.handleRiverAdd()}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
} //RiverEditor

export default RiverEditor;
