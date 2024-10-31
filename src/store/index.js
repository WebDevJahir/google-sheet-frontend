import { createStore } from 'vuex';
import auth from './auth';
import google_sheet from './google_sheet';


export default createStore({
    modules: {
        auth,
        google_sheet,
    },
});
