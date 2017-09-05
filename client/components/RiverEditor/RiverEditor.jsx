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
            criticalLevelPashtory: this.state.criticalLevelPashtory || 901,
            criticalLevelTugiyany: this.state.criticalLevelTugiyany || 938,
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

            <div>

                <div className="row">
                
                    <div className='col-lg-12'>

                        <div className='well bs-component'>
                            <form className='form-horizontal'>
                                <fieldset>
                                    <legend>Legend</legend>
                                    <div className='form-group'>
                                        <label htmlFor='inputEmail' className='col-lg-2 control-label'>Email</label>
                                        <div className='col-lg-10'>
                                            <input type='text' className='form-control' id='inputEmail' placeholder='Email' />
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='inputPassword' className='col-lg-2 control-label'>Password</label>
                                        <div className='col-lg-10'>
                                            <input type='password' className='form-control' id='inputPassword' placeholder='Password' />
                                            <div className='checkbox'>
                                                <label>
                                                {/*    
                                                    <input type='checkbox'> Checkbox </input>
                                                */}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='textArea' className='col-lg-2 control-label'>Textarea</label>
                                        <div className='col-lg-10'>
                                            <textarea className='form-control' rows='3' id='textArea'></textarea>
                                            <span className='help-block'>A longer block of help text that breaks onto a new line and may extend beyond one line.</span>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='col-lg-2 control-label'>Radios</label>
                                        <div className='col-lg-10'>
                                            <div className='radio'>
                                                <label>
                                                {/*
                                                    <input type='radio' name='optionsRadios' id='optionsRadios1' value='option1' checked=''>
                                                        Option one is this
                                                    </input>
                                                */}    
                                                </label>
                                            </div>
                                            <div className='radio'>
                                                <label>
                                                {/*
                                                    <input type='radio' name='optionsRadios' id='optionsRadios2' value='option2'>
                                                        Option two can be something else
                                                    </input>
                                                    */}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='select' className='col-lg-2 control-label'>Selects</label>
                                        <div className='col-lg-10'>
                                            <select className='form-control' id='select'>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                            <br />
                                            <select multiple='' className='form-control'>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='col-lg-10 col-lg-offset-2'>
                                            <button type='reset' className='btn btn-default'>Cancel</button>
                                            <button type='submit' className='btn btn-primary'>Submit</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>                 
                        </div>  

                    </div>

                </div>

          

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
            
            </div>


        );
    }
} //RiverEditor

export default RiverEditor;
