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

    createRiver(data) {
        return axios.post(`${apiPrefix}/rivers`, data);
    },

    deleteRiver(riverId) {
        return axios.delete(`${apiPrefix}/rivers/${riverId}`);
    }
    // Rivers API
};
