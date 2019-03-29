import scriptjs from 'scriptjs'

export default (jses, cb) => {
  jses = Array.isArray(jses) ? jses : [jses]

  if (jses.length) {
    scriptjs(jses, cb)
  } else {
    cb()
  }
}