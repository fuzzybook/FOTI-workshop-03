import config from './config/config'

window.addEventListener('load', () => {

  console.log('version: %o - testHeader %o', config.version, config.testHeader)

})
