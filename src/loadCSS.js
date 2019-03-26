import { loadCSS as loadCSSCore } from 'fg-loadcss'

const cached = {}

function loadSingleCSS(css, cb) {
  let res = cached[css]
  if (!res) {
    res = cached[css] = {
      stat: 0,
      cbs: [],
    }
  }
  if (res.stat === 2) {
    cb()
  } else {
    res.cbs.push(cb)
    if (res.stat === 1) {
      return
    }
    res.stat = 1
    loadCSSCore(css).addEventListener('load', () => {
      res.stat = 2
      res.cbs.forEach((cb) => {
        cb()
      })
      res.cbs = null
    })
  }
}

export default (csses, cb) => {
  csses = Array.isArray(csses) ? csses : [csses]

  let len = csses.length
  if (len) {
    csses.forEach((css) => {
      loadSingleCSS(css, () => {
        --len || cb()
      })
    })
  } else {
    cb()
  }
}
