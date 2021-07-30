import { createApp, h } from 'vue/dist/vue.cjs.prod.js'

import ContractForm from './components/ContractForm'
const NotFoundComponent = { template: '<p>Not found</p>'}

const routes = { '/': ContractForm }
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
