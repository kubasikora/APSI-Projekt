import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#5b5f97",
                secondary: "#b8b8d1",
                accent: "#ffc145",
                error: "#ff6b6c",
                info: "#b8b8d1",
                success: "#ffc145",
                warning: "#ff6b6c",
              }
        }
    }
});
