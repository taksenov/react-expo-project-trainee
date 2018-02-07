import { takeLatest, select, call, put } from 'redux-saga/effects';
import {
    fetchChartsRequest,
    fetchChartsSuccess,
    fetchChartsFailure
} from '../actions/RiversCharts';
// import { getUserLogin } from '../reducers/followers';
import api from '../../api';

function handlePreparationForChart(chartData) {
    if (arguments.length === 0) return;

    let firstDate = chartData[0].scalingDate;
    let lastDate = chartData[chartData.length - 1].scalingDate;
    let dataYear = firstDate.substr(0, 4);
    let scalingRangeStart = dataYear + AppConstants.CHARTS_SCALING_RANGE_START;
    let scalingRangeEnd = dataYear + AppConstants.CHARTS_SCALING_RANGE_END;
    let scalingDaysBefore =
        (Date.parse(firstDate) - Date.parse(scalingRangeStart)) /
        AppConstants.ONE_DAY_MS;
    let scalingDaysAfter =
        (Date.parse(scalingRangeEnd) - Date.parse(lastDate)) /
        AppConstants.ONE_DAY_MS;
    let levelBefore = [];
    let levelRealScalling = [];
    let levelAfter = [];
    let workingLevelArrayForCharts = [];

    levelBefore.length = scalingDaysBefore;
    levelAfter.length = scalingDaysAfter;
    for (let i of chartData) {
        levelRealScalling.push(i.levelToday);
    }
    workingLevelArrayForCharts = workingLevelArrayForCharts.concat(
        levelBefore,
        levelRealScalling,
        levelAfter
    );

    return workingLevelArrayForCharts;
} //handlePreparationForChart

function* onFetchCartsRequest() {
    // const userToken = yield select(getUserLogin);
    // console.log(userToken);
    try {
        const riverDataFromAPI = yield call(api.getRiverData, year, river);
        console.log(riverDataFromAPI);
        const riverDataForChart = yield call(
            handlePreparationForChart,
            riverDataFromAPI.data
        );
        yield put(fetchChartsSuccess(riverDataForChart));
    } catch (error) {
        console.log(error);
        yield put(fetchChartsFailure(error));
    }
} //onFetchCartsRequest

export function* fetchChartsWatch() {
    yield takeLatest(fetchChartsRequest, onFetchCartsRequest);
}
