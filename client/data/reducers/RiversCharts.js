import { handleActions } from 'redux-actions';
import {
    fetchChartsRequest,
    fetchChartsSuccess,
    fetchChartsFailure
} from '../actions/RiversCharts';

export default handleActions(
    {
        [fetchChartsRequest]: (state, { payload }) => ({
            ...state,
            isChartsFetching: true,
            isFetched: false,
            // login: payload,
            data: null,
            error: null
        }),
        [fetchChartsSuccess]: (state, { payload }) => ({
            ...state,
            isChartsFetching: false,
            isFetched: true,
            data: payload,
            error: null
        }),
        [fetchChartsFailure]: (state, { payload }) => ({
            ...state,
            isChartsFetching: false,
            isFetched: true,
            data: null,
            error: payload
        })
    },
    {
        isChartsFetching: false,
        isFetched: false,
        // login: null,
        data: null,
        error: null
    }
);
// export const getUserLogin = state => state.charts.login;
export const getChartsData = state => state.charts.data;
export const getIsChartsFetching = state => state.charts.isChartsFetching;
