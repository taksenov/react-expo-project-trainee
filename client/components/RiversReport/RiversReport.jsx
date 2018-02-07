import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import numbers from 'numbers';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import moment from 'moment';

import MathAnalytics from '../non-react/MathAnalytics';
import AppConstants from '../../data/constants/AppConstants';
import DataFromRiver from '../non-react/DataFromRiver';
import {
    fetchChartsRequest,
    fetchChartsSuccess,
    fetchChartsFailure
} from '../../data/actions/RiversCharts';
import {
    getChartsData,
    getIsChartsFetching
} from '../../data/reducers/RiversCharts';

import MessageForForm from '../MessageForForm';

import './RiversReport.style.less';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

import api from '../../api';

// const initialState = {
//     labels: AppConstants.CHARTS_LABELS,
//     datasets: [
//         {
//             ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
//             label: 'кр. уровень Тугияны',
//             backgroundColor: 'rgba(255, 10, 10, 1)',
//             borderColor: 'rgba(255, 10, 10, 1)',
//             pointBorderColor: 'rgba(255, 10, 10, 1)',
//             pointHoverBackgroundColor: 'rgba(255, 10, 10, 1)',
//             pointHoverBorderColor: 'rgba(255, 10, 10, 1)',
//             data: AppConstants.CHARTS_CRITICAL_LEVEL_TUGIYANY_LINE
//         },
//         {
//             ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
//             label: 'кр. уровень Пашторы',
//             backgroundColor: 'rgba(255, 75, 10, 1)',
//             borderColor: 'rgba(255, 75, 10, 1)',
//             pointBorderColor: 'rgba(255, 75, 10, 1)',
//             pointHoverBackgroundColor: 'rgba(255, 75, 10, 1)',
//             pointHoverBorderColor: 'rgba(255, 75, 10, 1)',
//             data: AppConstants.CHARTS_CRITICAL_LEVEL_PASHTORY_LINE
//         }
//     ]
// };

class RiversReport extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     data: '',
        //     dataLastThreeYearsObRiver: {},
        //     dataNowYearAllRivers: {},
        //     dateVisible: moment(),
        //     dateString: '01-01-1900',
        //     isError: false,
        //     messageText: '',
        //     messageClassName: ''
        // };

        // this.handleDateChange = this.handleDateChange.bind(this);
        // TODO: добавить эти обработчики нажатий на кнопки, через props
        // this.handleFormClear = this.handleFormClear.bind(this);
        // this.handleRiverAdd = this.handleRiverAdd.bind(this);
    } //constructor

    componentDidMount() {
        const { fetchChartsRequest } = this.props;
        let date = new Date();
        let year = date.getFullYear();

        fetchChartsRequest(year, 'river_01');
    } //componentDidMount

    // componentWillMount() {
    //     let _this = this;
    //     let date = new Date();
    //     let year = date.getFullYear();

    //     // IDEA: Получить данные для графика Реки белоярского района за текущий год
    //     (async () => {
    //         let dataFromRiver = new DataFromRiver();
    //         let changeState = {};
    //         changeState = JSON.parse(JSON.stringify(initialState));

    //         try {
    //             let riverDataNow = await dataFromRiver.getRiverData(
    //                 year,
    //                 'river_01'
    //             ); //Обь
    //             changeState.datasets.push({
    //                 ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
    //                 label: `р. Обь - ${year} год`,
    //                 backgroundColor: AppConstants.CHARTS_STANDARD_COLORS.ob,
    //                 borderColor: AppConstants.CHARTS_STANDARD_COLORS.ob,
    //                 pointBorderColor: AppConstants.CHARTS_STANDARD_COLORS.ob,
    //                 pointHoverBackgroundColor:
    //                     AppConstants.CHARTS_STANDARD_COLORS.ob,
    //                 pointHoverBorderColor:
    //                     AppConstants.CHARTS_STANDARD_COLORS.ob,
    //                 data: riverDataNow
    //             });
    //             let riverDataLast = await dataFromRiver.getRiverData(
    //                 year,
    //                 'river_02'
    //             ); //Казым
    //             changeState.datasets.push({
    //                 ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
    //                 label: `р. Казым - ${year} год`,
    //                 backgroundColor: AppConstants.CHARTS_STANDARD_COLORS.kazym,
    //                 borderColor: AppConstants.CHARTS_STANDARD_COLORS.kazym,
    //                 pointBorderColor: AppConstants.CHARTS_STANDARD_COLORS.kazym,
    //                 pointHoverBackgroundColor:
    //                     AppConstants.CHARTS_STANDARD_COLORS.kazym,
    //                 pointHoverBorderColor:
    //                     AppConstants.CHARTS_STANDARD_COLORS.kazym,
    //                 data: riverDataLast
    //             });
    //             let riverDataLastTwo = await dataFromRiver.getRiverData(
    //                 year,
    //                 'river_03'
    //             ); //Амня
    //             changeState.datasets.push({
    //                 ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
    //                 label: `р. Амня - ${year} год`,
    //                 backgroundColor: AppConstants.CHARTS_STANDARD_COLORS.amnya,
    //                 borderColor: AppConstants.CHARTS_STANDARD_COLORS.amnya,
    //                 pointBorderColor: AppConstants.CHARTS_STANDARD_COLORS.amnya,
    //                 pointHoverBackgroundColor:
    //                     AppConstants.CHARTS_STANDARD_COLORS.amnya,
    //                 pointHoverBorderColor:
    //                     AppConstants.CHARTS_STANDARD_COLORS.amnya,
    //                 data: riverDataLastTwo
    //             });
    //             _this.setState({
    //                 nowYear: year,
    //                 dataNowYearAllRivers: { ...changeState }
    //             });
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     })();
    //     // IDEA: Получить данные для графика Реки ,елоярского района за текущий год

    //     // IDEA: Тест линейной регрессии
    //     let arrX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    //     let arrY = [
    //         714,
    //         699,
    //         686,
    //         671,
    //         657,
    //         640,
    //         631,
    //         619,
    //         606,
    //         595,
    //         584,
    //         572,
    //         567,
    //         556,
    //         546
    //     ];
    //     let linRes = numbers.statistic.linearRegression(arrX, arrY)(arrX);

    //     console.log('mean =', numbers.statistic.mean(linRes));
    //     console.log('median =', numbers.statistic.median(linRes));
    //     console.log('rSquared =', numbers.statistic.rSquared(arrY, linRes));
    //     let mathAnalytics = new MathAnalytics();
    //     console.log(
    //         'inclineCoeff =',
    //         mathAnalytics.linearRegressionInclineCoefficient(arrX, arrY)
    //     );

    //     this.setState({
    //         rSquared: {
    //             riverType01:
    //                 Math.round(numbers.statistic.rSquared(arrY, linRes) * 100) /
    //                 100 *
    //                 100
    //         },
    //         inclineCoeff: {
    //             riverType01:
    //                 Math.round(
    //                     mathAnalytics.linearRegressionInclineCoefficient(
    //                         arrX,
    //                         arrY
    //                     ) * 100
    //                 ) / 100
    //         },
    //         // inclineCoeffRiverType01: (Math.round(numbers.statistic.rSquared(arrY, linRes) * 100) / 100)*100,
    //         dateVisible: moment(),
    //         dateString: moment().format('YYYY[-]MM[-]DD'),
    //         dataLinearRegression: {
    //             labels: arrX,
    //             datasets: [
    //                 {
    //                     ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
    //                     label: `Измеренные значения`,
    //                     backgroundColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
    //                     borderColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
    //                     pointBorderColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
    //                     pointHoverBackgroundColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
    //                     pointHoverBorderColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.firstGrade,
    //                     data: arrY
    //                 },
    //                 {
    //                     ...AppConstants.CHARTS_DEFAULT_DATASET_FOR_LINE,
    //                     label: `Линия тренда`,
    //                     backgroundColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
    //                     borderColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
    //                     pointBorderColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
    //                     pointHoverBackgroundColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
    //                     pointHoverBorderColor:
    //                         AppConstants.CHARTS_OB_SUMMARY_COLORS.secondGrade,
    //                     data: linRes
    //                 }
    //             ]
    //         }
    //     });
    //     // IDEA: Тест линейной регрессии
    // } // componentWillMount

    // handleDateChange(value) {
    //     this.setState(
    //         {
    //             dateVisible: value,
    //             dateString: value.format('YYYY[-]MM[-]DD')
    //         },
    //         () => console.log('дата изменена', this.state.dateString)
    //     );
    // } //handleDateChange

    render() {
        return <div className="EddsData__RiversReport">Отчет. Тест стейта</div>;
    }
} //RiversReport

const mapStateToProps = state => ({
    // isChartsFetching: getIsChartsFetching(state),
    chartData: getChartsData(state)
});

const mapDispatchToProps = {
    fetchChartsRequest,
    fetchChartsSuccess,
    fetchChartsFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(RiversReport);
