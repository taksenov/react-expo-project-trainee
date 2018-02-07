import { fork } from 'redux-saga/effects';
import { fetchChartsWatch } from './RiversCharts';

export default function*() {
    yield fork(fetchChartsWatch);
}
