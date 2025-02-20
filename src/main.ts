import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import Pinia
import './styles.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia() // Create Pinia instance

app.use(pinia) // Use Pinia in the app
app.mount('#app')