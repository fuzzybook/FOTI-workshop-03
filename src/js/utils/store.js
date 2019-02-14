import EventEmitter from './eventEmitter'

class Store extends EventEmitter {
  constructor() {
    super()
    this._test = ''
  }
  get test() {
    return this._test
  }
  set test(value) {
    this._test = value
    this.emit('test-changed', value)
  }
}

const ___store = new Store()

export default ___store