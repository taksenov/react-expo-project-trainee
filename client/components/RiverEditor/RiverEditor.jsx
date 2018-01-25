import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import MessageForForm from '../MessageForForm';

import './RiverEditor.style.less';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

let optionsRiver = [
    {
        value: 'Обь',
        label: 'Обь',
        typeRiver: 'river_01',
        hydroPost: 'с. Полноват',
        name: 'р. Обь'
    },
    {
        value: 'Амня',
        label: 'Амня',
        typeRiver: 'river_03',
        hydroPost: 'с. Казым',
        name: 'р. Амня'
    },
    {
        value: 'Казым',
        label: 'Казым',
        typeRiver: 'river_02',
        hydroPost: 'г. Белоярский',
        name: 'р. Казым'
    }
];

function isNumeric(n) {
    return !isNaN(parseInt(n, 10)) && isFinite(n);
} // isNumeric

class RiverEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            hydroPost: '',
            levelToday: '',
            levelDelta: '',
            levelAPPG: '',
            typeRiver: '',
            scalingDate: '',
            criticalLevelPashtory: '',
            criticalLevelTugiyany: '',
            comment: '',
            dateVisible: moment(),
            dateString: '01-01-1900',
            hours: '08',
            minutes: '00',
            isError: false,
            messageText: '',
            messageClassName: ''
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleMinutesChange = this.handleMinutesChange.bind(this);
        this.handleRiverSelect = this.handleRiverSelect.bind(this);
        this.handleLevelTodayChange = this.handleLevelTodayChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleFormClear = this.handleFormClear.bind(this);
        this.handleRiverAdd = this.handleRiverAdd.bind(this);
    } //constructor

    componentDidMount() {
        this.setState({
            scalingDate: `${
                ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName(
                    'input'
                )[0].value
            }T${ReactDOM.findDOMNode(this.refs.hoursInput).value}:${
                ReactDOM.findDOMNode(this.refs.minutesInput).value
            }:00.000Z`
        });
    } // componentDidMount

    handleCommentChange(event) {
        this.setState({ comment: event.target.value });
    } // handleCommentChange

    handleLevelTodayChange(event) {
        let levelNumbers = event.target.value;
        let expression = new RegExp('\\d*');

        if (!event.target.value) {
            this.setState({
                levelToday: '',
                levelDelta: '',
                levelAPPG: '',
                isError: false,
                messageText: '',
                messageClassName: ''
            });
        } else {
            // проверим, что в инпут введены цифры
            if (expression.test(levelNumbers) && isNumeric(levelNumbers)) {
                // отсечем ввод шестнадцатеричных
                if (
                    levelNumbers.indexOf('x') !== -1 &&
                    levelNumbers.indexOf('X') !== -1
                ) {
                    this.setState({
                        isError: true,
                        messageText: 'Разрешены только цифры',
                        messageClassName: 'alert-warning'
                    });
                } else {
                    this.setState({
                        levelToday: event.target.value,
                        levelDelta: '0',
                        levelAPPG: '0',
                        isError: false,
                        messageText: '',
                        messageClassName: ''
                    });
                }
            } else {
                this.setState({
                    isError: true,
                    messageText: 'Разрешены только цифры',
                    messageClassName: 'alert-warning'
                });
            }
        }
    } //handleLevelTodayChange

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    } //handleNameChange

    handleDateChange(value) {
        this.setState(
            {
                dateVisible: value,
                dateString: value.format('YYYY[-]MM[-]DD')
            },
            () =>
                this.handleDateTimeChange(
                    this.state.dateString,
                    this.state.hours,
                    this.state.minutes
                )
        );
    } //handleDateChange

    handleHoursChange(event) {
        this.setState({ hours: event.target.value }, () =>
            this.handleDateTimeChange(
                this.state.dateString,
                this.state.hours,
                this.state.minutes
            )
        );
    } //handleHoursChange

    handleMinutesChange(event) {
        this.setState({ minutes: event.target.value }, () =>
            this.handleDateTimeChange(
                this.state.dateString,
                this.state.hours,
                this.state.minutes
            )
        );
    } //handleMinutesChange

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
    } //handleDateTimeChange

    handleRiverSelect(value) {
        if (!value) {
            this.setState({
                name: '',
                hydroPost: '',
                typeRiver: '',
                levelToday: '',
                levelDelta: '',
                levelAPPG: '',
                comment: ''
            });
        } else {
            // console.log('Selected: ' +  value);
            this.setState({
                name: value.name,
                hydroPost: value.hydroPost,
                typeRiver: value.typeRiver
            });
        }
    } //handleRiverSelect

    handleRiverAdd(e) {
        e.preventDefault();

        let expression = new RegExp(
            '\\d{4}\\-\\d{2}\\-\\d{2}\\T\\d{2}\\:\\d{2}\\:00.000Z'
        );

        this.setState(
            {
                scalingDate: `${
                    ReactDOM.findDOMNode(
                        this.refs.datePicker
                    ).getElementsByTagName('input')[0].value
                }T${ReactDOM.findDOMNode(this.refs.hoursInput).value}:${
                    ReactDOM.findDOMNode(this.refs.minutesInput).value
                }:00.000Z`
            },
            //setState callback
            () => {
                // проверка на соответсвие строки из инпута, шаблонной регулярке
                if (expression.test(this.state.scalingDate)) {
                    const newRiver = {
                        id: this.state.id,
                        name: this.state.name,
                        hydroPost: this.state.hydroPost,
                        levelToday: this.state.levelToday,
                        levelDelta: this.state.levelDelta,
                        levelAPPG: this.state.levelAPPG,
                        typeRiver: this.state.typeRiver,
                        scalingDate: this.state.scalingDate,
                        criticalLevelPashtory:
                            this.state.criticalLevelPashtory || 901,
                        criticalLevelTugiyany:
                            this.state.criticalLevelTugiyany || 938,
                        comment: this.state.comment
                    };

                    this.props.onRiverAdd(newRiver);
                    this.setState(
                        {
                            id: '',
                            name: '',
                            hydroPost: '',
                            levelToday: '',
                            levelDelta: '',
                            levelAPPG: '',
                            typeRiver: '',
                            scalingDate: '',
                            criticalLevelPashtory: '',
                            criticalLevelTugiyany: '',
                            comment: '',
                            dateString: '01-01-1900',
                            hours: '08',
                            minutes: '00',
                            isError: false,
                            messageText: '',
                            messageClassName: ''
                        },
                        () =>
                            this.handleDateTimeChange(
                                ReactDOM.findDOMNode(
                                    this.refs.datePicker
                                ).getElementsByTagName('input')[0].value,
                                ReactDOM.findDOMNode(this.refs.hoursInput)
                                    .value,
                                ReactDOM.findDOMNode(this.refs.minutesInput)
                                    .value
                            )
                    );
                } else {
                    this.setState({
                        scalingDate: `${
                            ReactDOM.findDOMNode(
                                this.refs.datePicker
                            ).getElementsByTagName('input')[0].value
                        }T${ReactDOM.findDOMNode(this.refs.hoursInput).value}:${
                            ReactDOM.findDOMNode(this.refs.minutesInput).value
                        }:00.000Z`,
                        isError: true,
                        messageText:
                            'Дата и время установлены не правильно. Используйте формат: ГГГГ-ММ-ДД чч:мм',
                        messageClassName: 'alert-danger'
                    });
                    return;
                }
            }
        );
    } // handleRiverAdd

    handleFormClear(e) {
        e.preventDefault();
        this.setState(
            {
                id: '',
                name: '',
                hydroPost: '',
                levelToday: '',
                levelDelta: '',
                levelAPPG: '',
                typeRiver: '',
                scalingDate: '',
                criticalLevelPashtory: '',
                criticalLevelTugiyany: '',
                comment: '',
                dateString: '01-01-1900',
                hours: '08',
                minutes: '00',
                isError: false,
                messageText: ''
            },
            () =>
                this.handleDateTimeChange(
                    ReactDOM.findDOMNode(
                        this.refs.datePicker
                    ).getElementsByTagName('input')[0].value,
                    ReactDOM.findDOMNode(this.refs.hoursInput).value,
                    ReactDOM.findDOMNode(this.refs.minutesInput).value
                )
        );
    } // handleFormClear

    render() {
        return (
            <div className="RiverEditor">
                <div className="well bs-component">
                    <form className="form-horizontal">
                        <fieldset>
                            <legend>Добавить запись</legend>

                            {/* Scaling date */}
                            <div className="form-group">
                                <label
                                    htmlFor="inputDate"
                                    className="col-lg-1 control-label"
                                >
                                    Дата
                                </label>
                                <div className="col-lg-5">
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="YYYY-MM-DD"
                                        selected={this.state.dateVisible}
                                        onChange={this.handleDateChange}
                                        ref="datePicker"
                                    />
                                    <span className="help-block">
                                        Все поля обязательны для заполнения
                                    </span>
                                </div>
                                <label
                                    htmlFor="inputHours"
                                    className="col-lg-1 control-label"
                                >
                                    ЧЧ
                                </label>
                                <div className="col-lg-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputHours"
                                        placeholder="ЧЧ"
                                        value={this.state.hours}
                                        onChange={this.handleHoursChange}
                                        disabled={false}
                                        ref="hoursInput"
                                    />
                                </div>
                                <label
                                    htmlFor="inputMinutes"
                                    className="col-lg-1 control-label"
                                >
                                    ММ
                                </label>
                                <div className="col-lg-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputMinutes"
                                        placeholder="ММ"
                                        value={this.state.minutes}
                                        onChange={this.handleMinutesChange}
                                        disabled={false}
                                        ref="minutesInput"
                                    />
                                </div>
                            </div>
                            {/* Scaling date */}

                            {/* River */}
                            <div className="form-group">
                                <label
                                    htmlFor="RiversSelect"
                                    className="col-lg-1 control-label"
                                >
                                    Река
                                </label>
                                <div className="col-lg-11">
                                    <Select
                                        id="RiversSelect"
                                        name="Rivers"
                                        searchable={false}
                                        value={this.state.name}
                                        onChange={this.handleRiverSelect}
                                        selectValue={this.state.name}
                                        options={optionsRiver}
                                        clearable={true}
                                        placeholder={
                                            this.state.name !== ''
                                                ? this.state.name
                                                : 'Select...'
                                        }
                                    />
                                </div>
                            </div>
                            {/* River */}

                            {/* Hydropost */}
                            <div className="form-group">
                                <label
                                    htmlFor="inputHydroPost"
                                    className="col-lg-1 control-label"
                                >
                                    Гидропост
                                </label>
                                <div className="col-lg-11">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputHydroPost"
                                        placeholder="Гидропост"
                                        value={this.state.hydroPost}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            {/* Hydropost */}

                            {/* Levels scalling */}
                            <div className="form-group">
                                <label
                                    htmlFor="inputLevelToday"
                                    className="col-lg-1 control-label"
                                >
                                    Уровень
                                </label>
                                <div className="col-lg-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputLevelToday"
                                        placeholder="Уровень воды"
                                        value={this.state.levelToday}
                                        disabled={
                                            this.state.name === ''
                                                ? true
                                                : false
                                        }
                                        onChange={this.handleLevelTodayChange}
                                    />
                                </div>
                                <label
                                    htmlFor="inputLevelDelta"
                                    className="col-lg-1 control-label"
                                >
                                    Динамика
                                </label>
                                <div className="col-lg-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputLevelDelta"
                                        placeholder="Динамика"
                                        value={this.state.levelDelta}
                                        disabled={true}
                                    />
                                </div>
                                <label
                                    htmlFor="inputLevelAPPG"
                                    className="col-lg-1 control-label"
                                >
                                    АППГ
                                </label>
                                <div className="col-lg-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputLevelAPPG"
                                        placeholder="АППГ"
                                        value={this.state.levelAPPG}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            {/* Levels scalling */}

                            {/* comment */}
                            <div className="form-group">
                                <label
                                    htmlFor="textComment"
                                    className="col-lg-1 control-label"
                                >
                                    Примечание
                                </label>
                                <div className="col-lg-11">
                                    <textarea
                                        className="RiverEditor__text form-control"
                                        rows={3}
                                        id="textComment"
                                        disabled={
                                            this.state.name === ''
                                                ? true
                                                : false
                                        }
                                        value={
                                            !this.state.comment
                                                ? 'Чисто'
                                                : this.state.comment
                                        }
                                        onChange={this.handleCommentChange}
                                    />
                                </div>
                            </div>
                            {/* comment */}

                            {/* Message for Form */}
                            <MessageForForm
                                isError={this.state.isError}
                                messageText={this.state.messageText}
                                messageClassName={this.state.messageClassName}
                            />
                            {/* Message for Form */}

                            {/* Buttons group */}
                            <div className="form-group">
                                <div className="col-lg-11 col-lg-offset-1">
                                    <button
                                        className="btn btn-default Rivers__Editor_formButton"
                                        onClick={this.handleFormClear}
                                    >
                                        Очистить
                                    </button>
                                    <button
                                        className="btn btn-primary Rivers__Editor_formButton"
                                        disabled={
                                            this.state.name &&
                                            this.state.levelToday
                                                ? false
                                                : true
                                        }
                                        onClick={this.handleRiverAdd}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                            {/* Buttons group */}
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
} //RiverEditor

export default RiverEditor;
