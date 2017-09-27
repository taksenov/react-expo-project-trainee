import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';

import AppConstants from '../../data/constants/AppConstants';

import api from '../../api';

const initialState = {
    labels: AppConstants.CHARTS_LABELS,
    datasets: [
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
};

class DataFromRiver {

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
    
    async getRiverData(year, river) {
        if ( arguments.length === 0 ) return;

        try {
            let riverDataFromAPI = await api.getRiverData(year,river);
            let riverDataForChart = await this.handlePreparationForChart(riverDataFromAPI.data);
            
            return riverDataForChart;
        } catch (error) {
            throw new Error(`Не удалось получить данные по реке ${river} за ${year} год'`);
        }
    } //getRiverData

} //DataFromRiver

class RiversCharts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            dataLastThreeYearsObRiver: {},
            dataNowYearAllRivers: {}
        };
    } //constructor

    componentWillMount() {

        let _this = this;
        let date = new Date();
        let year = date.getFullYear();

        // IDEA: Получить данные для графика Ретроспектива по реке Обь за последние три года
        (async () => {
            let dataFromRiver = new DataFromRiver();

            let lastYear = year-1;
            let lastTwoYear = year-2;
            let changeState = {};
            changeState = JSON.parse(JSON.stringify(initialState));

            try {
                let riverDataNow = await dataFromRiver.getRiverData(year,'river_01');
                changeState.datasets.push(
                    {
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
                        data: riverDataNow
                    },
                );
                let riverDataLast = await dataFromRiver.getRiverData(lastYear,'river_01');
                changeState.datasets.push(
                    {
                        label: `р. Обь - ${lastYear} год`,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: riverDataLast
                    },
                );
                let riverDataLastTwo = await dataFromRiver.getRiverData(lastTwoYear,'river_01');
                changeState.datasets.push(
                    {
                        label: `р. Обь - ${lastTwoYear} год`,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: riverDataLastTwo
                    },
                );
                let riverData2007 = await dataFromRiver.getRiverData(2007,'river_01');
                changeState.datasets.push(
                    {
                        label: `р. Обь - ${2007} год`,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: riverData2007
                    },
                );
                _this.setState(
                    {
                        dataLastThreeYearsObRiver: {...changeState}
                    }
                );

            } catch (error) {
                console.error(error);
            }
            
        })();
        // IDEA: Получить данные для графика Ретроспектива по реке Обь за последние три года

        // IDEA: Получить данные для графика Реки белоярского района за текущий год
        (async () => {
            let dataFromRiver = new DataFromRiver();
            let changeState = {};
            changeState = JSON.parse(JSON.stringify(initialState));

            try {
                let riverDataNow = await dataFromRiver.getRiverData(year,'river_01');       //Обь
                changeState.datasets.push(
                    {
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
                        data: riverDataNow
                    },
                );
                let riverDataLast = await dataFromRiver.getRiverData(year,'river_02');      //Казым
                changeState.datasets.push(
                    {
                        label: `р. Казым - ${year} год`,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: riverDataLast
                    },
                );
                let riverDataLastTwo = await dataFromRiver.getRiverData(year,'river_03');    //Амня
                changeState.datasets.push(
                    {
                        label: `р. Амня - ${year} год`,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: riverDataLastTwo
                    },
                );
                _this.setState(
                    {
                        nowYear: year,
                        dataNowYearAllRivers: {...changeState}
                    }
                );

            } catch (error) {
                console.error(error);
            }
            
        })();
        // IDEA: Получить данные для графика Реки ,елоярского района за текущий год

    } // componentWillMount
    

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
                        <Line data={this.state.dataLastThreeYearsObRiver} />
                    </div>
                </div>

                <div>
                    <span>
                        <h3>График: реки Белоярского района {this.state.nowYear} год</h3>
                    </span>
                </div>

                <div className='row'>
                    <div className='col-lg-12'>
                        <Line data={this.state.dataNowYearAllRivers} />
                    </div>
                </div>

            </div>
        );
    }

} //RiversCharts

export default RiversCharts;
