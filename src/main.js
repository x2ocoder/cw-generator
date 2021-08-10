import { createApp, h } from 'vue'
import Home from './components/Home'

const NotFoundComponent = { template: '<p>Not found</p>'}
const routes = { '/': Home }
const SimpleRouter = {
    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        CurrentComponent() {
            return routes[this.currentRoute] || NotFoundComponent
        }
    },

    render() {
        return h(this.CurrentComponent)
    }
}

createApp(SimpleRouter).mount('#app')
