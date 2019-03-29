import loadCSS from './loadCSS'
import loadJS from './loadJS'

function loadAssets(assets, cb) {
  const css = []
  const js = []
  assets.forEach((asset) => {
    if (/\.css(\?.*)?$/.test(asset)) {
      css.push(asset)
    } else if (/\.js(\?.*)?$/.test(asset)) {
      js.push(asset)
    }
  })

  let len = 2
  loadCSS(css, () => {
    --len || cb()
  })
  loadJS(js, () => {
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
  css: wrapper(loadCSS, 1),
  js: wrapper(loadJS, 1),
  assets: wrapper(loadAssets, 1),
  lib: wrapper(loadLibrary, 2),
}
