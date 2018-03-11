import pathToRegexp from 'path-to-regexp'

export default (path = '/', router, exact = false) => {
  let keys = []
  const re = pathToRegexp(path, keys, { end: exact })

  const result = re.exec(router)
  if (!result) return false

  const [url, ...values] = result

  const params = keys.reduce((temp, key, index) => {
    temp[key.name] = values[index]
    return temp
  }, {})

  return { params, url, path, isExact: exact }
}
