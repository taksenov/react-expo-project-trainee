import { fork } from 'redux-saga/effects';
import { riverChart } from './RiversCharts';

export default function*() {
    yield fork(riverChart);
}
