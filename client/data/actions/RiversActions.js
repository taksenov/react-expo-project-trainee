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
    },

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
