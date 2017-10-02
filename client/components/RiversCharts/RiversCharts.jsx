import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';

import AppConstants from '../../data/constants/AppConstants';

import api from '../../api';

const initialState = {
    labels: AppConstants.CHARTS_LABELS,
    datasets: [
        {
            ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,            
            label: 'кр. уровень Тугияны',
            backgroundColor: 'rgba(255, 10, 10, 1)',
            borderColor: 'rgba(255, 10, 10, 1)',
            pointBorderColor: 'rgba(255, 10, 10, 1)',
            pointHoverBackgroundColor: 'rgba(255, 10, 10, 1)',
            pointHoverBorderColor: 'rgba(255, 10, 10, 1)',
            data: AppConstants.CHARTS_CRITICAL_LEVEL_TUGIYANY_LINE
        },
        {
            ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,            
            label: 'кр. уровень Пашторы',
            backgroundColor: 'rgba(255, 75, 10, 1)',
            borderColor: 'rgba(255, 75, 10, 1)',
            pointBorderColor: 'rgba(255, 75, 10, 1)',
            pointHoverBackgroundColor: 'rgba(255, 75, 10, 1)',
            pointHoverBorderColor: 'rgba(255, 75, 10, 1)',
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
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `р. Обь - ${year} год`,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        data: riverDataNow
                    },
                );
                let riverDataLast = await dataFromRiver.getRiverData(lastYear,'river_01');
                changeState.datasets.push(
                    {
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `р. Обь - ${lastYear} год`,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        data: riverDataLast
                    },
                );
                let riverDataLastTwo = await dataFromRiver.getRiverData(lastTwoYear,'river_01');
                changeState.datasets.push(
                    {
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `р. Обь - ${lastTwoYear} год`,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        data: riverDataLastTwo
                    },
                );
                let riverData2007 = await dataFromRiver.getRiverData(2007,'river_01');
                changeState.datasets.push(
                    {
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `р. Обь - ${2007} год`,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
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
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `р. Обь - ${year} год`,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        data: riverDataNow
                    },
                );
                let riverDataLast = await dataFromRiver.getRiverData(year,'river_02');      //Казым
                changeState.datasets.push(
                    {
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `р. Казым - ${year} год`,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        data: riverDataLast
                    },
                );
                let riverDataLastTwo = await dataFromRiver.getRiverData(year,'river_03');    //Амня
                changeState.datasets.push(
                    {
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `р. Амня - ${year} год`,
                        backgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        borderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointHoverBackgroundColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                        pointHoverBorderColor: AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
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
