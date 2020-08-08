export const asyncDebounce = (inner, ms = 0) => {
  let timer = null
  let resolves = []

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const result = inner(...args)
      resolves.forEach(r => r(result))
      resolves = []
    }, ms)

    return new Promise((resolve) => resolves.push(resolve))
  }
}
