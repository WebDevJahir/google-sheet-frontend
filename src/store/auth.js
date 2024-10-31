export default {
    state: {
        user: null,
        token: null,
        isLoggedIn: false,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        CLEAR_USER(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    actions: {
        login({ commit }, user) {
            commit('SET_USER', user);
            commit('SET_TOKEN', user.token);
        },

        async logout({ commit }) {
            // Clear token and user data
            localStorage.removeItem('token');
            commit('SET_SHEETS', []);
            commit('SET_ALL_DATA', []);
            window.location.href = '/login'; // Redirect to login
        },
    },
    getters: {
        isLoggedIn(state) {
            return state.token !== null;
        },
        user(state) {
            return state.user;
        },
    },
};
