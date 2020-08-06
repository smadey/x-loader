# load-lib

JS/CSS/Assets/Library Loader use:

* [scriptjs](https://github.com/ded/script.js) —  is an asynchronous JavaScript loader.
* [loadCSS](https://github.com/filamentgroup/loadCSS) — A function for loading CSS asynchronously

## Install
```sh
npm install --save @smadey/x-loader
```

## Usage

```js
import xLoader from '@smadey/x-loader';

xLoader.css([
  'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/theme-chalk/index.css'
], () => {
  console.log('css loaded');
});

xLoader.js([
  'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/index.js'
], () => {
  console.log('js loaded');
});

xLoader.assets([
  'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/theme-chalk/index.css',
  'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/index.js'
], () => {
  console.log('assets loaded');
});

xLoader.lib('ELEMENT', [
  'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/theme-chalk/index.css',
  'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/index.js'
], (ELEMENT) => {
  console.log(ELEMENT);
});
```
*Note: support Promise format*


## Options

```js
xLoader.js(srcs, callback);
```

`srcs` - javascript src array

`callback` - loaded callback

```js
xLoader.css(hrefs, callback);
```

`hrefs` - css href array

`callback` - loaded callback

```js
xLoader.assets(assets, callback);
```

`assets` - javascript src & css href array

`callback` - loaded callback

```js
xLoader.lib(name, assets, callback);
```

`name` - library name

`assets` - library assets

`callback` - callback with library


## License

[MIT](LICENSE).
