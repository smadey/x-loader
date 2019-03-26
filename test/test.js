describe('XLoader Standard Tests', () => {
  const assets = [
    'https://cdn.jsdelivr.net/npm/element-ui/lib/theme-chalk/index.css',
    'https://cdn.jsdelivr.net/npm/element-ui/lib/index.js',
  ]

  const $ = document.querySelectorAll.bind(document)
  const assertCSSLoaded = href => assert.ok($(`link[href="${href}"]`).length === 1)
  const assertJSLoaded = src => assert.ok($(`script[src="${src}"]`).length === 1)
  const assertAssetLoaded = asset => assert.ok(($(`link[href="${asset}"]`).length || $(`script[src="${asset}"]`).length) === 1)
  const appendRandomQuery = asset => `${asset}?_=${Math.random().toString(16).slice(2)}`
  const repeat = arr => arr.concat(arr)

  it('Load css', () => {
    const files = assets.filter(d => d.endsWith('.css')).map(appendRandomQuery)
    return xLoader.css(files, () => {
      files.forEach(assertCSSLoaded)
    }).then(() => {
      files.forEach(assertCSSLoaded)
    }, (e) => {
      console.log(e)
      assert.fail(e)
    })
  })

  it('Load repeat css', () => {
    const files = repeat(assets.filter(d => d.endsWith('.css')).map(appendRandomQuery))
    return xLoader.css(files, () => {
      files.forEach(assertCSSLoaded)
    }).then(() => {
      files.forEach(assertCSSLoaded)
    }, (e) => {
      assert.fail(e)
    })
  })

  it('Load js', () => {
    const files = assets.filter(d => d.endsWith('.js')).map(appendRandomQuery)
    return xLoader.js(files, () => {
      files.forEach(assertJSLoaded)
    }).then(() => {
      files.forEach(assertJSLoaded)
    }, (e) => {
      assert.fail(e)
    })
  })

  it('Load repeat js', () => {
    const files = repeat(assets.filter(d => d.endsWith('.js')).map(appendRandomQuery))
    return xLoader.js(files, () => {
      files.forEach(assertJSLoaded)
    }).then(() => {
      files.forEach(assertJSLoaded)
    }, (e) => {
      assert.fail(e)
    })
  })

  it('Load assets', () => {
    const files = assets.map(appendRandomQuery)
    return xLoader.assets(files, () => {
      files.forEach(assertAssetLoaded)
    }).then(() => {
      files.forEach(assertAssetLoaded)
    }, (e) => {
      assert.fail(e)
    })
  })

  it('Load repeat assets', () => {
    const files = repeat(assets.map(appendRandomQuery))
    return xLoader.assets(files, () => {
      files.forEach(assertAssetLoaded)
    }).then(() => {
      files.forEach(assertAssetLoaded)
    }, (e) => {
      assert.fail(e)
    })
  })

  it('Load library', () => {
    const name = 'Vuetify'
    const assets = [
      'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',
      'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.js',
    ]
    const files = repeat(assets)
    return xLoader.lib(name, files, () => {
      files.forEach(assertAssetLoaded)
      assert.ok(window[name])
    }).then(() => {
      files.forEach(assertAssetLoaded)
      assert.ok(window[name])
    }, (e) => {
      assert.fail(e)
    })
  })
})
