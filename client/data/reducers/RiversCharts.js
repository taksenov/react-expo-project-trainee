//TODO: переписатиь как нужно, это пока заглушка

import { handleActions } from 'redux-actions';
import {
    fetchFollowersRequest,
    fetchFollowersSuccess,
    fetchFollowersFailure
} from '../actions/RiversCharts';

export default handleActions(
    {
        [fetchFollowersRequest]: (state, { payload }) => ({
            ...state,
            isFollowersFetching: true,
            isFetched: false,
            login: payload,
            data: null,
            error: null
        }),
        [fetchFollowersSuccess]: (state, { payload }) => ({
            ...state,
            isFollowersFetching: false,
            isFetched: true,
            data: payload,
            error: null
        }),
        [fetchFollowersFailure]: (state, { payload }) => ({
            ...state,
            isFollowersFetching: false,
            isFetched: true,
            data: null,
            error: payload
        })
    },
    {
        isFollowersFetching: false,
        isFetched: false,
        login: null,
        data: null,
        error: null
    }
);
export const getUserLogin = state => state.followers.login;
export const getFollowersData = state => state.followers.data;
export const getIsFollowersFetching = state =>
    state.followers.isFollowersFetching;
