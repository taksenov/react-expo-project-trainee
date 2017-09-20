import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    /**
     * Notes API
     */
    listNotes() {
        return axios.get(`${apiPrefix}/notes`);
    },

    createNote(data) {
        return axios.post(`${apiPrefix}/notes`, data);
    },

    deleteNote(noteId) {
        return axios.delete(`${apiPrefix}/notes/${noteId}`);
    },
    // Notes API

    /**
     * Rivers API
     */
    listRivers() {
        return axios.get(`${apiPrefix}/rivers`);
    },

    filterRiversWithYearRiver(filterYear,filterRiver) {

        if (arguments.length===0) return;

        return axios.get(`${apiPrefix}/filter-rivers-by-year-river`, 
            {
                params: {
                    year: filterYear,
                    river: filterRiver
                }
            }
        );
    },

    filterRiversWithYear(filterYear) {

        if (arguments.length===0) return;

        return axios.get(`${apiPrefix}/filter-rivers-by-year`, 
            {
                params: {
                    year: filterYear
                }
            }
        );
    },

    createRiver(data) {
        return axios.post(`${apiPrefix}/rivers`, data);
    },

    deleteRiver(riverId) {
        return axios.delete(`${apiPrefix}/rivers/${riverId}`);
    }
    // Rivers API
};
