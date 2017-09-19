import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import MessageForForm from '../MessageForForm/MessageForForm.jsx';

import './RiverFilter.style.less';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

let optionsYears = [
    { value: '2007',   label: '2007'},
    { value: '2009',   label: '2009'},
    { value: '2010',   label: '2010'},
    { value: '2011',   label: '2011'},
    { value: '2012',   label: '2012'},
    { value: '2013',   label: '2013'},
    { value: '2014',   label: '2014'},
    { value: '2015',   label: '2015'},
    { value: '2016',   label: '2016'},
    { value: '2017',   label: '2017'},
    { value: '2018',   label: '2018'},
    { value: '2019',   label: '2019'},
    { value: '2020',   label: '2020'},
    { value: '2021',   label: '2021'},
    { value: '2022',   label: '2022'},
    { value: '2023',   label: '2023'},
    { value: '2024',   label: '2024'},
    { value: '2025',   label: '2025'},
    { value: '2026',   label: '2026'},
    { value: '2027',   label: '2027'},
];

let optionsRiver = [
    { value: 'Все',   label: 'Все реки'},
    { value: 'Обь',   label: 'Обь'     },
    { value: 'Амня',  label: 'Амня',   },
    { value: 'Казым', label: 'Казым',  }
];

class RiverFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year         : '',
            river        : '',
        };
    } //constructor

    handleRiverSelect(value) {
        if (!value) {
            this.setState({
                river : ''
            });
        } else {
            this.setState({
                river : value.value
            });
        }
    } //handleRiverSelect

    handleYearSelect(value) {
        if (!value) {
            this.setState({
                year : ''
            });
        } else {
            this.setState({
                year : value.value
            });
        }
    } //handleYearSelect

    // handleRiverAdd(e) {
    //     e.preventDefault();

    //     let expression = new RegExp('\\d{4}\\-\\d{2}\\-\\d{2}\\T\\d{2}\\:\\d{2}\\:00.000Z');

    //     this.setState({ scalingDate:
    //         `${
    //             ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName('input')[0].value
    //         }T${
    //             ReactDOM.findDOMNode(this.refs.hoursInput).value
    //         }:${
    //             ReactDOM.findDOMNode(this.refs.minutesInput).value
    //         }:00.000Z`
    //     },
    //     //setState callback
    //     () => {
    //         // проверка на соответсвие строки из инпута, шаблонной регулярке
    //         if ( expression.test(this.state.scalingDate) ) {
    //             const newRiver = {
    //                 id           : this.state.id,
    //                 name         : this.state.name,
    //                 hydroPost    : this.state.hydroPost,
    //                 levelToday   : this.state.levelToday,
    //                 levelDelta   : this.state.levelDelta,
    //                 levelAPPG    : this.state.levelAPPG,
    //                 typeRiver    : this.state.typeRiver,
    //                 scalingDate  : this.state.scalingDate,
    //                 criticalLevelPashtory: this.state.criticalLevelPashtory || 901,
    //                 criticalLevelTugiyany: this.state.criticalLevelTugiyany || 938,
    //                 comment      : this.state.comment
    //             };

    //             // this.props.onRiverAdd(newRiver); 
    //             this.setState({
    //                 id           : '',
    //                 name         : '',
    //                 hydroPost    : '',
    //                 levelToday   : '',
    //                 levelDelta   : '',
    //                 levelAPPG    : '',
    //                 typeRiver    : '',
    //                 scalingDate  : '',
    //                 criticalLevelPashtory: '',
    //                 criticalLevelTugiyany: '',
    //                 comment      : '',
    //                 dateString  : '01-01-1900',
    //                 hours: '08',
    //                 minutes: '00',
    //                 isError: false,
    //                 messageText: '',
    //                 messageClassName: ''
    //             },
    //             () => this.handleDateTimeChange(
    //                 ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName('input')[0].value,
    //                 ReactDOM.findDOMNode(this.refs.hoursInput).value, 
    //                 ReactDOM.findDOMNode(this.refs.minutesInput).value
    //             ));
    //         } else {
    //             this.setState({ 
    //                 scalingDate:
    //                     `${
    //                         ReactDOM.findDOMNode(this.refs.datePicker).getElementsByTagName('input')[0].value
    //                     }T${
    //                         ReactDOM.findDOMNode(this.refs.hoursInput).value
    //                     }:${
    //                         ReactDOM.findDOMNode(this.refs.minutesInput).value
    //                     }:00.000Z`,
    //                 isError: true,
    //                 messageText: 'Дата и время установлены не правильно. Используйте формат: ГГГГ-ММ-ДД чч:мм',
    //                 messageClassName: 'alert-danger'
    //             });
    //             return;
    //         }
    //     }
    //     );

    // }  // handleRiverAdd

    handleClearFilter(e) {
        e.preventDefault();
        this.setState({
            year         : '',
            river        : '',
        });
    } // handleClearFilter

    render() {
        return (
            <div className='RiverEditor'>
                <div className='well bs-component'>
                    <form className='form-horizontal'>
                        <fieldset>
                            <legend>Фильтр</legend>

                            {/* Scaling date */}                                    
                            <div className='form-group'>
                                <label htmlFor='inputDate' className='col-lg-1 control-label'>
                                    Год
                                </label>
                                <div className='col-lg-5'>
                                    <Select
                                        id='YearsSelect'
                                        name='Years'
                                        searchable={false}
                                        value={this.state.year}
                                        onChange={(val) => this.handleYearSelect(val)}
                                        selectValue={this.state.year}
                                        options={optionsYears}
                                        clearable={true}
                                        placeholder={this.state.year !== '' ? this.state.year : 'Select...'}
                                    />
                                    <span className='help-block'>
                                        Фильтр ограничен выбором одного года.
                                    </span>
                                </div>
                                <label htmlFor='RiversSelect' className='col-lg-1 control-label'>
                                    Река
                                </label>
                                <div className='col-lg-5'>
                                    <Select
                                        id='RiversSelect'
                                        name='Rivers'
                                        searchable={false}
                                        value={this.state.river}
                                        onChange={(val) => this.handleRiverSelect(val)}
                                        selectValue={this.state.river}
                                        options={optionsRiver}
                                        clearable={true}
                                        placeholder={this.state.river !== '' ? this.state.river : 'Select...'}
                                    />
                                </div>                                
                            </div>
                            {/* Scaling date */}        

                            {/* Message for Form */}
                            <MessageForForm 
                                isError={this.state.isError} 
                                messageText={this.state.messageText}
                                messageClassName={this.state.messageClassName}
                            />
                            {/* Message for Form */}

                            {/* Buttons group */}                            
                            <div className='form-group'>
                                <div className='col-lg-11 col-lg-offset-1'>
                                    <button 
                                        className='btn btn-default Rivers__Editor_formButton'
                                        onClick={(e) => this.handleClearFilter(e)}
                                    >
                                        Очистить
                                    </button>
                                    <button
                                        className='btn btn-primary Rivers__Editor_formButton'
                                        disabled={(this.state.year && this.state.river)? false : true}
                                        onClick={(e) => this.handleSetFilter(e)}
                                    >
                                        Применить
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
} //RiverFilter

export default RiverFilter;
