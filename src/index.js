import GapiClientProvider from './VueGapi/GapiClientProvider'
import GoogleAuthService from './VueGapi/GoogleAuthService'
import { getObjectCopy } from './VueGapi/utils'

export default {
  install: (Vue, clientConfig) => {
    const gapiClientProvider = new GapiClientProvider(
      getObjectCopy(clientConfig)
    )

    Vue.prototype.$gapi = new GoogleAuthService(gapiClientProvider)
  },
}

const version = '__VERSION__'

export { version }
