import {Toast,ToastSuccess,ToastDanger} from 'react-toastr-basic';

import AppDispatcher from '../dispatcher/AppDispatcher';
import RiversActionTypes from '../actiontypes/RiversActionTypes';

import api from '../../api';

const RiverActions = {
    loadRivers() {
        AppDispatcher.dispatch({
            type: RiversActionTypes.LOAD_RIVERS_REQUEST
        });

        api.listRivers()
            .then(({ data }) => {
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_SUCCESS,
                    rivers: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_FAIL,
                    error: err
                })
            );
    },      //loadRivers
    
    // TODO: похоже на анти-паттерн, отрефакторить и использовать разворот аргументов ...args
    setFilterRiversWithYearRiver(year,river) {
        AppDispatcher.dispatch({
            type: RiversActionTypes.LOAD_RIVERS_REQUEST
        });

        api.filterRiversWithYearRiver(year,river)
            .then(({ data }) => {
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_SUCCESS,
                    rivers: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_FAIL,
                    error: err
                })
            );
    },      //setFilterRivers

    // TODO: похоже на анти-паттерн, отрефакторить и использовать разворот аргументов ...args
    setFilterRiversWithYear(year) {
        AppDispatcher.dispatch({
            type: RiversActionTypes.LOAD_RIVERS_REQUEST
        });

        api.filterRiversWithYear(year)
            .then(({ data }) => {
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_SUCCESS,
                    rivers: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_FAIL,
                    error: err
                })
            );
    },      //setFilterRiversWithYear

    getRiverData(year,riverType) {
        AppDispatcher.dispatch({
            type: RiversActionTypes.LOAD_RIVERS_REQUEST
        });

        api.getRiverData(year,riverType)
            .then(({ data }) => {
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_SUCCESS,
                    rivers: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: RiversActionTypes.LOAD_RIVERS_FAIL,
                    error: err
                })
            );
    },      //getRiverData

    createRiver(river) {
        api.createRiver(river)
            .then(
                () => {
                    this.loadRivers();
                    ToastSuccess('Ура!', 'Данные по уровню воды добавлены');
                }
            )
            .catch(
                err => {
                    console.error(err);
                    ToastDanger('Ошибка', err);
                }
            );
    },

    deleteRiver(riverId) {
        api.deleteRiver(riverId)
            .then(
                () => {
                    this.loadRivers();
                    Toast('Внимание', 'Данные по уровню воды удалены');
                }
            )
            .catch(
                err => {
                    console.error(err);
                    ToastDanger('Ошибка', err);
                }
            );
    }
};

export default RiverActions;
