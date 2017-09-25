import React from 'react';
import ReactDOM from 'react-dom';
import {Doughnut, Line} from 'react-chartjs-2';

import RiversStore from '../../data/stores/RiversStore';
import RiversActions from '../../data/actions/RiversActions';

import RiversGrid from '../RiversGrid/RiversGrid.jsx';
import AppConstants from '../../data/constants/AppConstants';

import api from '../../api';

class RiversCharts extends React.Component {

    static getStores() { 
        return [RiversStore]; 
    } 

    static calculateState(prevState) { 
        return RiversStore.getState(); 
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: '',
                datasets: ''
            },
            dataRetroObLast3Years: {
                labels: '',
                datasets: ''
            },
            data2017Year: {
                labels: '',
                datasets: ''
            },

        };
    } //constructor

    handlePreparationForChart(chartData) {
        if ( arguments.length === 0 ) return;

        let firstDate = chartData[0].scalingDate;
        let lastDate = chartData[chartData.length-1].scalingDate;
        let dataYear = firstDate.substr(0,4);
        let scalingRangeStart = dataYear + AppConstants.CHARTS_SCALING_RANGE_START;        
        let scalingRangeEnd = dataYear + AppConstants.CHARTS_SCALING_RANGE_END;           
        let scalingDaysBefore = (Date.parse(firstDate)-Date.parse(scalingRangeStart)) / AppConstants.ONE_DAY_MS;
        let scalingDaysAfter  = (Date.parse(scalingRangeEnd)-Date.parse(lastDate)) / AppConstants.ONE_DAY_MS;
        let levelBefore = [];
        let levelRealScalling = [];
        let levelAfter = [];
        let workingLevelArrayForCharts = [];

        levelBefore.length = scalingDaysBefore;
        levelAfter.length = scalingDaysAfter;
        for (let i of chartData) {
            levelRealScalling.push(i.levelToday);
        }
        workingLevelArrayForCharts = workingLevelArrayForCharts.concat(levelBefore,levelRealScalling,levelAfter);
        
        return workingLevelArrayForCharts;

    } //handlePreparationForChart

    componentWillMount() {

        let date = new Date();
        let year = date.getFullYear();
        let lastYear = year-1;
        let lastTwoYear = year-2;

        // IDEA: Получить данные для графика Ретроспектива по реке Обь за последние три года
        api.getRiverData(year,'river_01')
            .then(({ data }) => {
                this.setState(
                    {
                        dataRiverNowYear: {
                            label: `р. Обь - ${year} год`,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                            borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                            pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.handlePreparationForChart(data)
                        }    
                    }
                );
            })
            .catch(err => console.error('Error when recieve ChartRiverData', err));

        // api.getRiverData(lastYear,'river_01')
        //     .then(({ data }) => {
        //         this.setState(
        //             {
        //                 dataRiverLastYear: {
        //                     label: `р. Обь - ${lastYear} год`,
        //                     fill: false,
        //                     lineTension: 0.1,
        //                     backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
        //                     borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
        //                     borderCapStyle: 'butt',
        //                     borderDash: [],
        //                     borderDashOffset: 0.0,
        //                     borderJoinStyle: 'miter',
        //                     pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
        //                     pointBackgroundColor: '#fff',
        //                     pointBorderWidth: 1,
        //                     pointHoverRadius: 5,
        //                     pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
        //                     pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
        //                     pointHoverBorderWidth: 2,
        //                     pointRadius: 1,
        //                     pointHitRadius: 10,
        //                     data: this.handlePreparationForChart(data)
        //                 }    
        //             }
        //         );
        //     })
        //     .catch(err => console.error('Error when recieve ChartRiverData', err));
            
        // api.getRiverData(lastTwoYear,'river_01')
        //     .then(({ data }) => {
        //         this.setState(
        //             {
        //                 dataRiverLastTwoYear: {
        //                     label: `р. Обь - ${lastTwoYear} год`,
        //                     fill: false,
        //                     lineTension: 0.1,
        //                     backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
        //                     borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
        //                     borderCapStyle: 'butt',
        //                     borderDash: [],
        //                     borderDashOffset: 0.0,
        //                     borderJoinStyle: 'miter',
        //                     pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
        //                     pointBackgroundColor: '#fff',
        //                     pointBorderWidth: 1,
        //                     pointHoverRadius: 5,
        //                     pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
        //                     pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
        //                     pointHoverBorderWidth: 2,
        //                     pointRadius: 1,
        //                     pointHitRadius: 10,
        //                     data: this.handlePreparationForChart(data)
        //                 }    
        //             }
        //         );
        //     })
        //     .catch(err => console.error('Error when recieve ChartRiverData', err));

        // api.getRiverData(2007,'river_01')
        //     .then(({ data }) => {
        //         this.setState(
        //             {
        //                 dataRiverLast2007Year: {
        //                     label: `р. Обь - ${2007} год`,
        //                     fill: false,
        //                     lineTension: 0.1,
        //                     backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
        //                     borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
        //                     borderCapStyle: 'butt',
        //                     borderDash: [],
        //                     borderDashOffset: 0.0,
        //                     borderJoinStyle: 'miter',
        //                     pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
        //                     pointBackgroundColor: '#fff',
        //                     pointBorderWidth: 1,
        //                     pointHoverRadius: 5,
        //                     pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
        //                     pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
        //                     pointHoverBorderWidth: 2,
        //                     pointRadius: 1,
        //                     pointHitRadius: 10,
        //                     data: this.handlePreparationForChart(data)
        //                 }    
        //             }
        //         );
        //     })
        //     .catch(err => console.error('Error when recieve ChartRiverData', err));

        // IDEA: Получить данные для графика Ретроспектива по реке Обь за последние три года


    } // componentWillMount
    
    componentDidMount() {
        this.setState(
            {
                dataRetroObLast3Years: {
                    labels: AppConstants.CHARTS_LABELS,
                    datasets: [
                        this.state.dataRiverNowYear,
                        this.state.dataRiverLastYear,
                        this.state.dataRiverLastTwoYear,
                        this.state.dataRiverLast2007Year,
                        {
                            label: 'кр. уровень Тугияны',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(255, 10, 10, 1)',
                            borderColor: 'rgba(255, 10, 10, 1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(255, 10, 10, 1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(255, 10, 10, 1)',
                            pointHoverBorderColor: 'rgba(255, 10, 10, 1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: AppConstants.CHARTS_CRITICAL_LEVEL_TUGIYANY_LINE
                        },  
                        {
                            label: 'кр. уровень Пашторы',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(255, 75, 10, 1)',
                            borderColor: 'rgba(255, 75, 10, 1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(255, 75, 10, 1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(255, 75, 10, 1)',
                            pointHoverBorderColor: 'rgba(255, 75, 10, 1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: AppConstants.CHARTS_CRITICAL_LEVEL_PASHTORY_LINE
                        },  
                    ]   
                },
                // data2017Year: {
                //     labels: AppConstants.CHARTS_LABELS,
                //     datasets: [
                //         this.state.dataRiverNowYear,
                //         this.state.dataRiverLast2007Year,
                //         {
                //             label: 'кр. уровень Тугияны',
                //             fill: false,
                //             lineTension: 0.1,
                //             backgroundColor: 'rgba(255, 10, 10, 1)',
                //             borderColor: 'rgba(255, 10, 10, 1)',
                //             borderCapStyle: 'butt',
                //             borderDash: [],
                //             borderDashOffset: 0.0,
                //             borderJoinStyle: 'miter',
                //             pointBorderColor: 'rgba(255, 10, 10, 1)',
                //             pointBackgroundColor: '#fff',
                //             pointBorderWidth: 1,
                //             pointHoverRadius: 5,
                //             pointHoverBackgroundColor: 'rgba(255, 10, 10, 1)',
                //             pointHoverBorderColor: 'rgba(255, 10, 10, 1)',
                //             pointHoverBorderWidth: 2,
                //             pointRadius: 1,
                //             pointHitRadius: 10,
                //             data: AppConstants.CHARTS_CRITICAL_LEVEL_TUGIYANY_LINE
                //         },  
                //         {
                //             label: 'кр. уровень Пашторы',
                //             fill: false,
                //             lineTension: 0.1,
                //             backgroundColor: 'rgba(255, 75, 10, 1)',
                //             borderColor: 'rgba(255, 75, 10, 1)',
                //             borderCapStyle: 'butt',
                //             borderDash: [],
                //             borderDashOffset: 0.0,
                //             borderJoinStyle: 'miter',
                //             pointBorderColor: 'rgba(255, 75, 10, 1)',
                //             pointBackgroundColor: '#fff',
                //             pointBorderWidth: 1,
                //             pointHoverRadius: 5,
                //             pointHoverBackgroundColor: 'rgba(255, 75, 10, 1)',
                //             pointHoverBorderColor: 'rgba(255, 75, 10, 1)',
                //             pointHoverBorderWidth: 2,
                //             pointRadius: 1,
                //             pointHitRadius: 10,
                //             data: AppConstants.CHARTS_CRITICAL_LEVEL_PASHTORY_LINE
                //         },  
                //     ]   
                // },                    
            }
        );
    } // componentDidMount

    render() {
        return (
            <div className='EddsData__RiversMain'>

                <div>
                    <span>
                        <h3>График: р.Обь ретроспектива за последние 3 года плюс 2007 год</h3>
                    </span>
                </div>

                <div className='row'>
                    <div className='col-lg-12'>
                        <Line data={this.state.dataRetroObLast3Years} />
                    </div>
                </div>

 

            </div>
        );
    }

} //RiversMain

export default RiversCharts;
















    // this.setState(
    //     {
    //         data: {
    //             labels: AppConstants.CHARTS_LABELS,
    //             datasets: [
    //                 {
    //                     label: 'р. Обь',
    //                     fill: false,
    //                     lineTension: 0.1,
    //                     backgroundColor: 'rgba(75,192,192,0.4)',
    //                     borderColor: 'rgba(75,192,192,1)',
    //                     borderCapStyle: 'butt',
    //                     borderDash: [],
    //                     borderDashOffset: 0.0,
    //                     borderJoinStyle: 'miter',
    //                     pointBorderColor: 'rgba(75,192,192,1)',
    //                     pointBackgroundColor: '#fff',
    //                     pointBorderWidth: 1,
    //                     pointHoverRadius: 5,
    //                     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //                     pointHoverBorderColor: 'rgba(220,220,220,1)',
    //                     pointHoverBorderWidth: 2,
    //                     pointRadius: 1,
    //                     pointHitRadius: 10,
    //                     data: [185,185,186,188,190,191,196,199,202,202,210,224,238,254,270,294,318,338,359,380,409,437,457,473,496,517,545,576,610,637,683,704,710,725,757,755,753,752,750,752,752,753,753,754,757,756,756,755,755,755,759,759,759,760,760,761,761,761,762,762,762,763,763,764,764,764,764,763,763,764,764,764,761,760,759,758,769,768,767,765,764,763,762,760,758,755,751,748,745,741,737,732,727,720,712,704,696,684,674,665,657,649,649,637,613,602,602,592,580,571,560,550,542,532,522,517,509,503,496,490,484,479,474,470,462,458,452,452,452,446,442,438,434,429,427,423,419,417,415,411,407,402,399,395,394,391,390,389,385,382,380,378,385,381,377,373,373,372,376,375,374,372,372,371,371,371,370,371,372,372,370,371,376,376,377,382,387,390,390,392,392,392,392,392,392,392,391,393,391,388,385,382,381,377,374,371,363,360,357,354,351,345,341,343,341,340,339,337,338,336,334,333,332,328,324,322,317,312,310,330,350,352]
    //                 },
    //                 {
    //                     label: 'р. Амня',
    //                     fill: false,
    //                     lineTension: 0.1,
    //                     backgroundColor: 'rgba(75,192,192,0.4)',
    //                     borderColor: 'rgba(85,134,192,1)',
    //                     borderCapStyle: 'butt',
    //                     borderDash: [],
    //                     borderDashOffset: 0.0,
    //                     borderJoinStyle: 'miter',
    //                     pointBorderColor: 'rgba(75,192,192,1)',
    //                     pointBackgroundColor: '#fff',
    //                     pointBorderWidth: 1,
    //                     pointHoverRadius: 5,
    //                     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //                     pointHoverBorderColor: 'rgba(220,220,220,1)',
    //                     pointHoverBorderWidth: 2,
    //                     pointRadius: 1,
    //                     pointHitRadius: 10,
    //                     data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,420,374,339,318,305,298,313,330,329,307,290,276,265,255,251,245,240,236,233,231,229,225,222,219,217,217,218,220,225,225,224,221,218,216,213,210,208,207,207,206,205,203,201,199,198,198,198,198,198,200,206,238,281,301,320,320,306,295,279,258,240,229,221,218,216,213,210,207,203,201,200,198,196,195,193,191,189,189,189,191,192,192,192,192,192,191,190,189,188,188,188,187,186,185,185,185,185,185,185,185,185,185,185,185,186,188,189,189,189,189,189,188,189,191,192,198,209,210,210,211,211,210,209,209,207,207,206,205,294,203,201,201,200,200,200,201,202,203,204,204,204,203,202,200,198,197,197,196,196,196,196,196,196,196,195,195,196,196,196,195,195,195,195,196,196,197,197,197,197,197,197,197,197,198,199,200,199,197,198,197,197,197,197,196,195,193,187,198,0,0,0,0,0,0,0,0,0]
    //                 },
    //                 {
    //                     label: 'кр. уровень Тугияны',
    //                     fill: false,
    //                     lineTension: 0.1,
    //                     backgroundColor: 'rgba(255, 10, 10, 1)',
    //                     borderColor: 'rgba(255, 10, 10, 1)',
    //                     borderCapStyle: 'butt',
    //                     borderDash: [],
    //                     borderDashOffset: 0.0,
    //                     borderJoinStyle: 'miter',
    //                     pointBorderColor: 'rgba(255, 10, 10, 1)',
    //                     pointBackgroundColor: '#fff',
    //                     pointBorderWidth: 1,
    //                     pointHoverRadius: 5,
    //                     pointHoverBackgroundColor: 'rgba(255, 10, 10, 1)',
    //                     pointHoverBorderColor: 'rgba(255, 10, 10, 1)',
    //                     pointHoverBorderWidth: 2,
    //                     pointRadius: 1,
    //                     pointHitRadius: 10,
    //                     data: AppConstants.CHARTS_CRITICAL_LEVEL_TUGIYANY_LINE
    //                 },  
    //                 {
    //                     label: 'кр. уровень Пашторы',
    //                     fill: false,
    //                     lineTension: 0.1,
    //                     backgroundColor: 'rgba(255, 75, 10, 1)',
    //                     borderColor: 'rgba(255, 75, 10, 1)',
    //                     borderCapStyle: 'butt',
    //                     borderDash: [],
    //                     borderDashOffset: 0.0,
    //                     borderJoinStyle: 'miter',
    //                     pointBorderColor: 'rgba(255, 75, 10, 1)',
    //                     pointBackgroundColor: '#fff',
    //                     pointBorderWidth: 1,
    //                     pointHoverRadius: 5,
    //                     pointHoverBackgroundColor: 'rgba(255, 75, 10, 1)',
    //                     pointHoverBorderColor: 'rgba(255, 75, 10, 1)',
    //                     pointHoverBorderWidth: 2,
    //                     pointRadius: 1,
    //                     pointHitRadius: 10,
    //                     data: AppConstants.CHARTS_CRITICAL_LEVEL_PASHTORY_LINE
    //                 },  
    //             ]   
    //         }    
    //     },
    //     console.log('данные по Оби за 2017 год', this.state)
    // );




    // Callback hell
    // api.getRiverData(2017,'river_01')
    // .then(({ data }) => {
    //     this.setState(
    //         {
    //             dataRiver: {
    //                 label: 'р. Обь',
    //                 fill: false,
    //                 lineTension: 0.1,
    //                 backgroundColor: 'rgba(75,192,192,0.4)',
    //                 borderColor: 'rgba(75,192,192,1)',
    //                 borderCapStyle: 'butt',
    //                 borderDash: [],
    //                 borderDashOffset: 0.0,
    //                 borderJoinStyle: 'miter',
    //                 pointBorderColor: 'rgba(75,192,192,1)',
    //                 pointBackgroundColor: '#fff',
    //                 pointBorderWidth: 1,
    //                 pointHoverRadius: 5,
    //                 pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //                 pointHoverBorderColor: 'rgba(220,220,220,1)',
    //                 pointHoverBorderWidth: 2,
    //                 pointRadius: 1,
    //                 pointHitRadius: 10,
    //                 data: this.handlePreparationForChart(data)
    //             }    
    //         }
    //     );
    // })
    // .then(()=>{
    //     this.setState(
    //         {
    //             data: {
    //                 labels: AppConstants.CHARTS_LABELS,
    //                 datasets: [
    //                     this.state.dataRiver,
    //                     {
    //                         label: 'кр. уровень Тугияны',
    //                         fill: false,
    //                         lineTension: 0.1,
    //                         backgroundColor: 'rgba(255, 10, 10, 1)',
    //                         borderColor: 'rgba(255, 10, 10, 1)',
    //                         borderCapStyle: 'butt',
    //                         borderDash: [],
    //                         borderDashOffset: 0.0,
    //                         borderJoinStyle: 'miter',
    //                         pointBorderColor: 'rgba(255, 10, 10, 1)',
    //                         pointBackgroundColor: '#fff',
    //                         pointBorderWidth: 1,
    //                         pointHoverRadius: 5,
    //                         pointHoverBackgroundColor: 'rgba(255, 10, 10, 1)',
    //                         pointHoverBorderColor: 'rgba(255, 10, 10, 1)',
    //                         pointHoverBorderWidth: 2,
    //                         pointRadius: 1,
    //                         pointHitRadius: 10,
    //                         data: AppConstants.CHARTS_CRITICAL_LEVEL_TUGIYANY_LINE
    //                     },  
    //                     {
    //                         label: 'кр. уровень Пашторы',
    //                         fill: false,
    //                         lineTension: 0.1,
    //                         backgroundColor: 'rgba(255, 75, 10, 1)',
    //                         borderColor: 'rgba(255, 75, 10, 1)',
    //                         borderCapStyle: 'butt',
    //                         borderDash: [],
    //                         borderDashOffset: 0.0,
    //                         borderJoinStyle: 'miter',
    //                         pointBorderColor: 'rgba(255, 75, 10, 1)',
    //                         pointBackgroundColor: '#fff',
    //                         pointBorderWidth: 1,
    //                         pointHoverRadius: 5,
    //                         pointHoverBackgroundColor: 'rgba(255, 75, 10, 1)',
    //                         pointHoverBorderColor: 'rgba(255, 75, 10, 1)',
    //                         pointHoverBorderWidth: 2,
    //                         pointRadius: 1,
    //                         pointHitRadius: 10,
    //                         data: AppConstants.CHARTS_CRITICAL_LEVEL_PASHTORY_LINE
    //                     },  
    //                 ]   
    //             }    
    //         }
    //     );
    // })
    // .catch(err => console.error('Error when recieve ChartRiverData', err));    
