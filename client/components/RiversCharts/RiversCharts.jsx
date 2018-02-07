import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import numbers from 'numbers';

import MathAnalytics from '../non-react/MathAnalytics';
import AppConstants from '../../data/constants/AppConstants';
import DataFromRiver from '../non-react/DataFromRiver';

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
        }
    ]
};

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
        let lastYear = year - 1;
        let lastTwoYear = year - 2;

        // IDEA: Получить данные для графика Ретроспектива по реке Обь за последние три года
        (async () => {
            let dataFromRiver = new DataFromRiver();

            let changeState = {};
            changeState = JSON.parse(JSON.stringify(initialState));

            try {
                let riverDataNow = await dataFromRiver.getRiverData(
                    lastYear,
                    'river_01'
                );
                changeState.datasets.push({
                    ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                    label: `р. Обь - ${year} год`,
                    backgroundColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                    borderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                    pointBorderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                    pointHoverBackgroundColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                    pointHoverBorderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                    data: riverDataNow
                });
                let riverDataLast = await dataFromRiver.getRiverData(
                    lastYear,
                    'river_01'
                );
                changeState.datasets.push({
                    ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                    label: `р. Обь - ${lastYear} год`,
                    backgroundColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                    borderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                    pointBorderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                    pointHoverBackgroundColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                    pointHoverBorderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                    data: riverDataLast
                });
                let riverDataLastTwo = await dataFromRiver.getRiverData(
                    lastTwoYear,
                    'river_01'
                );
                changeState.datasets.push({
                    ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                    label: `р. Обь - ${lastTwoYear} год`,
                    backgroundColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                    borderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                    pointBorderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                    pointHoverBackgroundColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                    pointHoverBorderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.thirdGrade,
                    data: riverDataLastTwo
                });
                let riverData2007 = await dataFromRiver.getRiverData(
                    2007,
                    'river_01'
                );
                changeState.datasets.push({
                    ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                    label: `р. Обь - ${2007} год`,
                    backgroundColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                    borderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                    pointBorderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                    pointHoverBackgroundColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                    pointHoverBorderColor:
                        AppConstants.CHARTS_OB_SUMMARY_COLORS.sampleGrade,
                    data: riverData2007
                });
                _this.setState({
                    dataLastThreeYearsObRiver: { ...changeState }
                });
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
                let riverDataNow = await dataFromRiver.getRiverData(
                    lastYear,
                    'river_01'
                ); //Обь
                changeState.datasets.push({
                    ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                    label: `р. Обь - ${year} год`,
                    backgroundColor: AppConstants.CHARTS_STANDARD_COLORS.ob,
                    borderColor: AppConstants.CHARTS_STANDARD_COLORS.ob,
                    pointBorderColor: AppConstants.CHARTS_STANDARD_COLORS.ob,
                    pointHoverBackgroundColor:
                        AppConstants.CHARTS_STANDARD_COLORS.ob,
                    pointHoverBorderColor:
                        AppConstants.CHARTS_STANDARD_COLORS.ob,
                    data: riverDataNow
                });
                let riverDataLast = await dataFromRiver.getRiverData(
                    lastYear,
                    'river_02'
                ); //Казым
                changeState.datasets.push({
                    ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                    label: `р. Казым - ${year} год`,
                    backgroundColor: AppConstants.CHARTS_STANDARD_COLORS.kazym,
                    borderColor: AppConstants.CHARTS_STANDARD_COLORS.kazym,
                    pointBorderColor: AppConstants.CHARTS_STANDARD_COLORS.kazym,
                    pointHoverBackgroundColor:
                        AppConstants.CHARTS_STANDARD_COLORS.kazym,
                    pointHoverBorderColor:
                        AppConstants.CHARTS_STANDARD_COLORS.kazym,
                    data: riverDataLast
                });
                let riverDataLastTwo = await dataFromRiver.getRiverData(
                    lastYear,
                    'river_03'
                ); //Амня
                changeState.datasets.push({
                    ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                    label: `р. Амня - ${year} год`,
                    backgroundColor: AppConstants.CHARTS_STANDARD_COLORS.amnya,
                    borderColor: AppConstants.CHARTS_STANDARD_COLORS.amnya,
                    pointBorderColor: AppConstants.CHARTS_STANDARD_COLORS.amnya,
                    pointHoverBackgroundColor:
                        AppConstants.CHARTS_STANDARD_COLORS.amnya,
                    pointHoverBorderColor:
                        AppConstants.CHARTS_STANDARD_COLORS.amnya,
                    data: riverDataLastTwo
                });
                _this.setState({
                    nowYear: year,
                    dataNowYearAllRivers: { ...changeState }
                });
            } catch (error) {
                console.error(error);
            }
        })();
        // IDEA: Получить данные для графика Реки ,елоярского района за текущий год

        // IDEA: Тест линейной регрессии
        let arrX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        let arrY = [
            714,
            699,
            686,
            671,
            657,
            640,
            631,
            619,
            606,
            595,
            584,
            572,
            567,
            556,
            546
        ];
        let linRes = numbers.statistic.linearRegression(arrX, arrY)(arrX);

        console.log('mean =', numbers.statistic.mean(linRes));
        console.log('median =', numbers.statistic.median(linRes));
        console.log('rSquared =', numbers.statistic.rSquared(arrY, linRes));
        let mathAnalytics = new MathAnalytics();
        console.log(
            'inclineCoeff =',
            mathAnalytics.linearRegressionInclineCoefficient(arrX, arrY)
        );

        this.setState({
            dataLinearRegression: {
                labels: arrX,
                datasets: [
                    {
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `Измеренные значения`,
                        backgroundColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        borderColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointBorderColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointHoverBackgroundColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        pointHoverBorderColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
                        data: arrY
                    },
                    {
                        ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
                        label: `Линия тренда`,
                        backgroundColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        borderColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointBorderColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBackgroundColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        pointHoverBorderColor:
                            AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
                        data: linRes
                    }
                ]
            }
        });
        // IDEA: Тест линейной регрессии
    } // componentWillMount

    render() {
        return (
            <div className="EddsData__RiversMain">
                <div>
                    <span>
                        <h3>
                            График: р.Обь ретроспектива за последние 3 года плюс
                            2007 год
                        </h3>
                    </span>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <Line data={this.state.dataLastThreeYearsObRiver} />
                    </div>
                </div>

                <div>
                    <span>
                        <h3>
                            График: реки Белоярского района {this.state.nowYear}{' '}
                            год
                        </h3>
                    </span>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <Line data={this.state.dataNowYearAllRivers} />
                    </div>
                </div>

                <div>
                    <span>
                        <h3>График: линия тренда</h3>
                    </span>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <Line data={this.state.dataLinearRegression} />
                    </div>
                </div>
            </div>
        );
    }
} //RiversCharts

export default RiversCharts;
