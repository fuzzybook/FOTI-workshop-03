import config from './config/config'
import { render } from './dom/dom'
import store from './utils/store'
window.addEventListener('load', () => {

  store.test = 'ciao store'
  console.log('version: %o - testHeader %o', config.version, config.testHeader)
  let { myButton, contenutoBox, changeStore, spanBox } = render(config.experimentalDiv, `
  <div foti-ref="provaBox">
  <span>version: ${config.version}</span>
  <div foti-ref="contenutoBox" tabIndex="2"></div>
  <input foti-ref="myButton" type="button" value="clikkami" />
  <input foti-ref="changeStore" type="button" value="cambia store" />
  <br>
  <span foti-ref="spanBox">${store.test}</span>
  </div>
  `)

  contenutoBox.style.backgroundColor = config.css.baseColor

  contenutoBox.innerHTML = 'pippo'
  contenutoBox.visible = true

  contenutoBox.selected = false
  let count = 0
  myButton.addEventListener('click', () => {
    if (count++ > 5) contenutoBox.visible = false
    contenutoBox.selected = !contenutoBox.selected
  })

  changeStore.addEventListener('click', () => {
    store.test = 'ciao pippo'
  })

  store.on('test-changed', text => {
    spanBox.innerText = text
  })



  //config.experimentalDiv.innerHTML = `<pre>${JSON.stringify(config.css, null, 4)}</pre>`
})
