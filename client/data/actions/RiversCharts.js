import { createActions } from 'redux-actions';

export const {
    fetchChartsRequest,
    fetchChartsSuccess,
    fetchChartsFailure
} = createActions({
    FETCH_CHARTS_REQUEST: undefined,
    FETCH_CHARTS_SUCCESS: undefined,
    FETCH_CHARTS_FAILURE: undefined
});
