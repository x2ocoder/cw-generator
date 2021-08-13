import { createApp, h } from 'vue'
import Home from './components/HomePage'
import Privacy from './components/PrivacyPage'
import Terms from './components/TermsPage'

const NotFoundComponent = { template: '<p>Not found</p>'}
const routes = {
  '/': Home,
  '/terms': Terms,
  '/privacy': Privacy,
}
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
