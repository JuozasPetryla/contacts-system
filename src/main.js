import Vue from 'vue';
import App from './App.vue';
import './input.css'
import { MdCard, MdDialog, MdButton, MdTable, MdContent, MdMenu, MdList, MdField, MdCheckbox } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import vueDebounce from 'vue-debounce'


import router from './router/router';
import store from './store/store';

import BaseIconButton from './components/UI/BaseIconButton.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseInputField from './components/UI/BaseInputField.vue'
import BaseFilter from './components/UI/BaseFilter.vue'
import BaseInfoDialog from './components/UI/BaseInfoDialog.vue'
import BaseModal from './components/UI/BaseModal.vue'
import BaseDrop from './components/UI/BaseDrop.vue'

Vue.use(MdCard)
Vue.use(MdDialog)
Vue.use(MdButton)
Vue.use(MdTable)
Vue.use(MdContent)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdField)
Vue.use(MdCheckbox)

Vue.component('BaseIconButton', BaseIconButton)
Vue.component('BaseButton', BaseButton)
Vue.component('BaseInputField', BaseInputField)
Vue.component('BaseFilter', BaseFilter)
Vue.component('BaseInfoDialog', BaseInfoDialog)
Vue.component('BaseModal', BaseModal)
Vue.component('BaseDrop', BaseDrop)


Vue.use(vueDebounce, {
    listenTo: 'input'
})
new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
