import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

/** Vue Stuff */
const app = createApp(App)
app.use(store)
app.use(router)

/** Font Awesome Stuff */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faVectorSquare)
library.add(faXmark)

app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app')