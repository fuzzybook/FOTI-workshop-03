'use strict'
class Config {
  constructor() {
    this._version = '0.0.1'
    this._testHeader = this.getNode(document, 'testHeader')
    this._experimentalDiv = this.getNode(document, 'experimentalDiv')

    let cssConfig = window.getComputedStyle(document.querySelector('[config-ref="config"]'), ':before').content
    this._css = JSON.parse(this.removeQuotes(cssConfig))

  }
  get version() {
    return this._version
  }
  get testHeader() {
    return this._testHeader
  }
  get experimentalDiv() {
    return this._experimentalDiv
  }
  get css() {
    return this._css
  }
  removeQuotes(string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '')
    }
    return string
  }

  getNode(root, ref) {
    let node = root.querySelector(`[foti-ref="${ref}"]`)
    if (!node) {
      throw 'node ' + ref + ' not found'
    }
    return node
  }
}

const ____config = new Config()

export default ____config