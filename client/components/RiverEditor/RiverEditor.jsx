import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import './RiverEditor.style.less';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

let optionsRiver = [
    { value: 'Обь',   label: 'Обь',   typeRiver: 'river_01', hydroPost: 'с. Полноват',   name: 'р. Обь' },
    { value: 'Казым', label: 'Казым', typeRiver: 'river_02', hydroPost: 'г. Белоярский', name: 'р. Казым' },
    { value: 'Амня',  label: 'Амня',  typeRiver: 'river_03', hydroPost: 'с. Казым',      name: 'р. Амня' }
];

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
            comment      : '',
            dateVisible  : moment(),
            dateString  : '01-01-1900',
            hours: '09',
            minutes: '00'

        };
    }

    componentDidMount() {
        this.setState({ scalingDate:
            `${
                ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName('input')[0].value
            }T${
                ReactDOM.findDOMNode(this.refs.hoursInput).value
            }:${
                ReactDOM.findDOMNode(this.refs.minutesInput).value
            }:00.000Z`
        });
    } // componentDidMount

    handleCommentChange(event) {
        this.setState({ comment: event.target.value });
    } // handleCommentChange

    handleLevelTodayChange(event) {
        if (!event.target.value) {
            this.setState({
                levelToday   : '',
                levelDelta   : '',
                levelAPPG    : '',
            });
        } else {
            this.setState({
                levelToday   : event.target.value,
                levelDelta   : '0',
                levelAPPG    : '0',
            });
        }

    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleDateChange(value) {
        this.setState(
            {
                dateVisible: value,
                dateString: value.format('YYYY[-]MM[-]DD')
            },
            () => this.handleDateTimeChange(this.state.dateString, this.state.hours, this.state.minutes)
        );
    }

    handleHoursChange(event) {
        this.setState(
            { hours: event.target.value },
            () => this.handleDateTimeChange(this.state.dateString, this.state.hours, this.state.minutes)
        );
    }

    handleMinutesChange(event) {
        this.setState({ minutes: event.target.value },
            () => this.handleDateTimeChange(this.state.dateString, this.state.hours, this.state.minutes)
        );
    }

    /**
     * Set state template string for scalingDate
     * 
     * @param {any} date 
     * @param {any} hours 
     * @param {any} minutes 
     * @memberof RiverEditor
     * 
     * @return setState {templateString} = 'YYYY-MM-DDThh:mm:00.000Z'
     */
    handleDateTimeChange(date, hours, minutes) {
        this.setState({ scalingDate: `${date}T${hours}:${minutes}:00.000Z` });
    }

    handleRiverSelect(value) {
        if (!value) {
            this.setState({
                name         : '',
                hydroPost    : '',
                typeRiver    : '',
                levelToday   : '',
                levelDelta   : '',
                levelAPPG    : '',
                comment      : ''
            });
        } else {
            // console.log('Selected: ' +  value);
            this.setState({
                name         : value.name,
                hydroPost    : value.hydroPost,
                typeRiver    : value.typeRiver
            });
        }
    }

    handleRiverAdd() {

        let expression = new RegExp('\\d{4}\\-\\d{2}\\-\\d{2}\\T\\d{2}\\:\\d{2}\\:00.000Z');

        this.setState({ scalingDate:
            `${
                ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName('input')[0].value
            }T${
                ReactDOM.findDOMNode(this.refs.hoursInput).value
            }:${
                ReactDOM.findDOMNode(this.refs.minutesInput).value
            }:00.000Z`
        },
        //setState callback
        () => {
            // проверка на соответсвие строки из инпута, шаблонной регулярке
            if ( expression.test(this.state.scalingDate) ) {
                console.log('RegExp-success');
                console.log('expression', expression);
                console.log('this.state.scalingDate', this.state.scalingDate);
                
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
                    comment      : '',
                    dateString  : '01-01-1900',
                    hours: '09',
                    minutes: '00'
                },
                () => this.handleDateTimeChange(
                    ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName('input')[0].value,
                    ReactDOM.findDOMNode(this.refs.hoursInput).value, 
                    ReactDOM.findDOMNode(this.refs.minutesInput).value
                ));
            } else {
                // TODO: сделать вывод сообщения об ошибке
                console.log('Дата и время установлены не правильно');
                this.setState({ scalingDate:
                    `${
                        ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName('input')[0].value
                    }T${
                        ReactDOM.findDOMNode(this.refs.hoursInput).value
                    }:${
                        ReactDOM.findDOMNode(this.refs.minutesInput).value
                    }:00.000Z`
                });
                return;
            }
        }
        );

    }  // handleRiverAdd

    handleFormClear() {
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
            comment      : '',
            dateString  : '01-01-1900',
            hours: '09',
            minutes: '00'
        },
        () => this.handleDateTimeChange(
            ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName('input')[0].value,
            ReactDOM.findDOMNode(this.refs.hoursInput).value, 
            ReactDOM.findDOMNode(this.refs.minutesInput).value
        ));
    } // handleFormClear

    render() {
        return (

            <div>

                <div className='row'>

                    <div className='col-lg-12'>

                        <div className='well bs-component'>
                            <form className='form-horizontal'>
                                <fieldset>
                                    <legend>Измерения уровня воды в реке</legend>

                                    <div className='form-group'>
                                        <label htmlFor='inputDate' className='col-lg-1 control-label'>
                                            Дата
                                        </label>
                                        <div className='col-lg-5'>

                                            <DatePicker
                                                className='form-control'
                                                dateFormat='YYYY-MM-DD'
                                                selected={this.state.dateVisible}
                                                onChange={(value) => this.handleDateChange(value)}
                                                ref='datePicker'
                                            />
                                            <span className='help-block'>
                                                Все поля обязательны для заполнения
                                            </span>
                                        </div>
                                        <label htmlFor='inputHours' className='col-lg-1 control-label'>
                                            ЧЧ
                                        </label>
                                        <div className='col-lg-2'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='inputHours'
                                                placeholder='ЧЧ'
                                                value={this.state.hours}
                                                onChange={(e) => this.handleHoursChange(e)}
                                                disabled={false}
                                                ref='hoursInput'
                                            />
                                        </div>
                                        <label htmlFor='inputMinutes' className='col-lg-1 control-label'>
                                            ММ
                                        </label>
                                        <div className='col-lg-2'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='inputMinutes'
                                                placeholder='ММ'
                                                value={this.state.minutes}
                                                onChange={(e) => this.handleMinutesChange(e)}
                                                disabled={false}
                                                ref='minutesInput'
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='RiversSelect' className='col-lg-1 control-label'>
                                            Река
                                        </label>
                                        <div className='col-lg-11'>
                                            <Select
                                                id='RiversSelect'
                                                name='Rivers'
                                                searchable={false}
                                                value={this.state.name}
                                                onChange={(val) => this.handleRiverSelect(val)}
                                                selectValue={this.state.name}
                                                options={optionsRiver}
                                                clearable={true}
                                                placeholder={this.state.name !== '' ? this.state.name : 'Select...'}
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='inputHydroPost' className='col-lg-1 control-label'>
                                            Гидропост
                                        </label>
                                        <div className='col-lg-11'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='inputHydroPost'
                                                placeholder='Гидропост'
                                                value={this.state.hydroPost}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='inputLevelToday' className='col-lg-1 control-label'>
                                            Уровень
                                        </label>
                                        <div className='col-lg-3'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='inputLevelToday'
                                                placeholder='Уровень воды'
                                                value={this.state.levelToday}
                                                disabled={ this.state.name === '' ? true : false }
                                                onChange={(e) => this.handleLevelTodayChange(e)}
                                            />
                                        </div>
                                        <label htmlFor='inputLevelDelta' className='col-lg-1 control-label'>
                                            Динамика
                                        </label>
                                        <div className='col-lg-3'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='inputLevelDelta'
                                                placeholder='Динамика'
                                                value={this.state.levelDelta}
                                                disabled={true}
                                            />
                                        </div>
                                        <label htmlFor='inputLevelAPPG' className='col-lg-1 control-label'>
                                            АППГ
                                        </label>
                                        <div className='col-lg-3'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='inputLevelAPPG'
                                                placeholder='АППГ'
                                                value={this.state.levelAPPG}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='textComment' className='col-lg-1 control-label'>
                                            Примечание
                                        </label>
                                        <div className='col-lg-11'>
                                            <textarea
                                                className='RiverEditor__text form-control'
                                                rows={3}
                                                id='textComment'
                                                disabled={this.state.name === '' ? true : false}
                                                value={!this.state.comment ? 'Чисто' : this.state.comment}
                                                onChange={(e) => this.handleCommentChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='alert alert-danger'>
                                            Так будет выглядеть сообщение об ошибке
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='col-lg-11 col-lg-offset-1'>
                                            <button 
                                                className='btn btn-default Rivers__Editor_formButton'
                                                onClick={() => this.handleFormClear()}
                                            >
                                                Очистить
                                            </button>
                                            <button
                                                className='btn btn-primary Rivers__Editor_formButton'
                                                disabled={(this.state.name && this.state.levelToday)? false : true}
                                                onClick={() => this.handleRiverAdd()}
                                            >
                                                Сохранить
                                            </button>
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
