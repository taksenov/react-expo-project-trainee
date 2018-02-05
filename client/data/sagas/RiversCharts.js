import { takeLatest, select, call, put } from 'redux-saga/effects';
import {
    fetchChartsRequest,
    fetchChartsSuccess,
    fetchChartsFailure
} from '../actions/RiversCharts';
// import { getUserLogin } from '../reducers/followers';
import { getRiverData } from '../../api';

function* onFetchCartsRequest() {
    const userToken = yield select(getUserLogin);
    console.log(userToken);
    try {
        const user = yield call(getUserFollowers, userToken);
        yield put(fetchChartsSuccess(user));
    } catch (error) {
        console.log(error);
        yield put(fetchChartsFailure(error));
    }
} //onFetchCartsRequest

export function* fetchChartsWatch() {
    yield takeLatest(fetchChartsRequest, onFetchCartsRequest);
}
