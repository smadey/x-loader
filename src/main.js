import loadJS from 'scriptjs'

import loadCSS from './loadCSS'

function loadAssets(assets, cb) {
  const js = []
  const css = []
  assets.forEach((asset) => {
    if (/\.js(\?.*)?$/.test(asset)) {
      js.push(asset)
    } else if (/\.css(\?.*)?$/.test(asset)) {
      css.push(asset)
    }
  })

  let len = 2
  loadJS(js, () => {
    --len || cb()
  })
  loadCSS(css, () => {
    --len || cb()
  })
}

function loadLibrary(name, assets, cb) {
  const win = window
  if (win[name]) {
    cb(null, win[name])
  } else {
    loadAssets(assets, () => {
      if (win[name]) {
        cb(null, win[name])
      } else {
        cb(new Error(`Library's assets loaded, but no window.${name}`))
      }
    })
  }
}

function wrapper(fn, cbIndex) {
  return function () {
    const args = [].slice.call(arguments)
    const cb = args[cbIndex]
    if (typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        args[cbIndex] = (err, lib) => {
          if (err) {
            reject(err)
          } else {
            cb && cb(lib)
            resolve(lib)
          }
        }
        fn.apply(this, args)
      })
    }
    args[cbIndex] = (err, lib) => {
      !err && cb && cb(lib)
    }
    fn.apply(this, args)
  }
}

export default {
  js: wrapper(loadJS, 1),
  css: wrapper(loadCSS, 1),
  assets: wrapper(loadAssets, 1),
  lib: wrapper(loadLibrary, 2),
}
