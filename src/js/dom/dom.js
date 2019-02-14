'use strict'

export const render = (node, html) => {
  node.innerHTML = html
  let refs = node.querySelectorAll(`[foti-ref]`)
  let elements = {}
  refs.forEach(currentValue => {
    let name = currentValue.getAttribute('foti-ref')
    currentValue.classList.add(camel2Dash(name))
    Object.defineProperties(currentValue, {
      'selected': {
        get() {
          return this.classList.contains('selected')
        },
        set(selected) {
          if (selected) {
            this.classList.add('selected')
          } else {
            this.classList.remove('selected')
          }

        },
        configurable: false
      },
      'visible': {
        get() {
          return this.classList.contains('show')
        },
        set(visible) {
          if (visible) {
            this.classList.add('show')
          } else {
            this.classList.remove('show')
          }
        },
        configurable: false
      }
    })
    elements[name] = currentValue
  })
  return elements
}

export const append = (node, html) => {
  let root = document.createElement('div')
  root.innerHTML = html
  let refs = root.querySelectorAll(`[foti-ref]`)
  let elements = {
    root: root
  }
  refs.forEach(currentValue => {
    let name = currentValue.getAttribute('foti-ref')
    currentValue.classList.add(camel2Dash(name))
    Object.defineProperties(currentValue, {
      'selected': {
        get() {
          return this.classList.contains('selected')
        },
        set(selected) {
          if (selected) {
            this.classList.add('selected')
          } else {
            this.classList.remove('selected')
          }

        },
        configurable: false
      },
      'visible': {
        get() {
          return this.classList.contains('show')
        },
        set(visible) {
          if (visible) {
            this.classList.add('show')
          } else {
            this.classList.remove('show')
          }
        },
        configurable: false
      }
    })
    elements[name] = currentValue
  }
  )
  node.appendChild(root)
  return elements
}

const camel2Dash = (v) => {
  let ret = '', prevLowercase = false
  for (let s of v) {
    const isUppercase = s.toUpperCase() === s
    if (isUppercase && prevLowercase) {
      ret += '-'
    }
    ret += s
    prevLowercase = !isUppercase
  }
  return ret.replace(/-+/g, '-').toLowerCase()
}