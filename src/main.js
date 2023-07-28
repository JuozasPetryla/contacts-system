import Vue from 'vue';
import App from './App.vue';
import './input.css'
import { MdCard, MdDialog, MdButton, MdTable, MdContent } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import router from './router/router';
import store from './store/store';

import BaseIconButton from './components/UI/BaseIconButton.vue'
import BaseInputField from './components/UI/BaseInputField.vue'
import BaseFilter from './components/UI/BaseFilter.vue'
import BaseInfoDialog from './components/UI/BaseInfoDialog.vue'

Vue.use(MdCard)
Vue.use(MdDialog)
Vue.use(MdButton)
Vue.use(MdTable)
Vue.use(MdContent)

Vue.component('BaseIconButton', BaseIconButton)
Vue.component('BaseInputField', BaseInputField)
Vue.component('BaseFilter', BaseFilter)
Vue.component('BaseInfoDialog', BaseInfoDialog)

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
