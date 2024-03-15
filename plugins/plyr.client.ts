import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

export default defineNuxtPlugin((nuxt) => {
	nuxt.vueApp.use(VuePlyr);
});
