import axios, { all } from 'axios';
import store from './index';

export default {
    state: {
        sheets: [],
        allData: [],
    },
    mutations: {
        SET_SHEETS(state, sheets) {
            state.sheets = sheets;
        },

        SET_ALL_DATA(state, allData) {
            state.allData = allData;
        },

        ADD_DATA_SUCCESS(state, { spreadsheetId, sheetName, data }) {
            if (!state.allData[spreadsheetId]) {
                state.allData[spreadsheetId] = {};
            }
            if (!state.allData[spreadsheetId][sheetName]) {
                state.allData[spreadsheetId][sheetName] = [];
            }
            state.allData[spreadsheetId][sheetName].push(data);
        },

        SET_ROW_DATA(state, { spreadsheetId, sheetName, rowId, data }) {
            if (!state.allData[spreadsheetId]) {
                state.allData[spreadsheetId] = {};
            }
            if (!state.allData[spreadsheetId][sheetName]) {
                state.allData[spreadsheetId][sheetName] = [];
            }
            state.allData[spreadsheetId][sheetName][rowId - 1] = data;
        },

        REMOVE_ROW_DATA(state, { sheetName, rowId }) {
            const sheetData = state.allData[sheetName];
            if (sheetData && sheetData.length >= rowId) {
                sheetData.splice(rowId - 1, 1); // Remove the specific row
            }
        },
    },
    actions: {
        async fetchGoogleSheets({ commit }) {
            console.log('fetchGoogleSheets');
            try {
                const response = await axios.get('http://localhost:8000/list-google-sheets', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                commit('SET_SHEETS', response.data);
            } catch (error) {
                if (error.response.status === 401) {
                    // Dispatch logout or redirect to login
                    store.dispatch('logout');
                } else {
                    console.error("An error occurred:", error);
                }
            }
        },

        async readSpreadsheetData({ commit }, id) {
            try {
                const response = await axios.get(`http://localhost:8000/read-sheet/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                commit('SET_ALL_DATA', response.data);
            } catch (error) {
                if (error.response.status === 401) {
                    // Dispatch logout or redirect to login
                    store.dispatch('logout');
                } else {
                    console.error("An error occurred:", error);
                }
            }
        },

        async addSheetData({ commit }, { spreadsheetId, sheetName, values }) {
            try {
                const response = await axios.post(`http://localhost:8000/sheets-store/${spreadsheetId}/${sheetName}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                console.log('response:', response.data);

                commit('ADD_DATA_SUCCESS', response.data);

            } catch (error) {
                console.log("Full error:", error.toJSON ? error.toJSON() : error);  // Log the complete error object

                // Check if error.response exists
                if (error.response) {
                    if (error.response.status === 401) {
                        store.dispatch('logout');
                    } else {
                        this.errors.push("An error occurred: " + error.response.data.message || "Unknown error");
                    }
                } else {
                    this.errors.push("Failed to reach the server. Please check your network connection.");
                }

                this.addButtonLoading = false;
            }

        },

        async fetchSheetDataEdit({ commit }, { spreadsheetId, sheetName, rowId }) {
            try {
                const response = await axios.get(`http://localhost:8000/sheets-edit/${spreadsheetId}/${sheetName}/${rowId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                // Commit to store for use in the component
                const data = response.data;
                commit('SET_ROW_DATA', { spreadsheetId, sheetName, rowId, data });

                return data;
            } catch (error) {
                if (error.response.status === 401) {
                    store.dispatch('logout');
                } else {
                    console.error("An error occurred:", error);
                }
            }
        },


        async updateSheetData({ commit }, { spreadsheetId, sheetName, rowId, values }) {
            let row_id = parseInt(rowId) + 1;
            try {
                const response = await axios.put(`http://localhost:8000/sheets-update/${spreadsheetId}/${sheetName}/${row_id}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } catch (error) {
                if (error.response.status === 401) {
                    store.dispatch('logout');
                } else {
                    console.error("An error occurred:", error);
                }
            }
        },

        async deleteSheetData({ commit }, { spreadsheetId, sheetName, rowId }) {
            try {
                await axios.delete(`http://localhost:8000/sheets-destroy/${spreadsheetId}/${sheetName}/${rowId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                commit('REMOVE_ROW_DATA', { sheetName, rowId });

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    store.dispatch('logout');
                } else {
                    console.error("An error occurred:", error);
                    this._vm.$toast.error('Failed to delete data.');
                }
            }
        },

    },
    getters: {
        sheets(state) {
            return state.sheets;
        },
        allData(state) {
            return state.allData;
        }
    },
};
