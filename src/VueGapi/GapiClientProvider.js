import loadGapiScript from './loadGapiScript'

export default class GapiClientProvider {
  constructor(clientConfig) {
    this.clientConfig = clientConfig
    this.promise = null
    this.gapi = null
  }

  getClientConfig() {
    return this.clientConfig
  }

  getClient() {
    if (null !== this.gapi) {
      return Promise.resolve(this.gapi)
    }

    if (null !== this.promise) {
      return this.promise
    }

    return loadGapiScript().then((gapi) => {
      return new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
          this.promise = gapi.client
            .init(this.clientConfig)
            .then(() => resolve((this.gapi = gapi)), reject)
        })
      })
    })
  }

  getAuthInstance() {
    return this.getClient().then((gapi) => gapi.auth2.getAuthInstance())
  }
}
