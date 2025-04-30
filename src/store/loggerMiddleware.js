const loggerMiddleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === "development") {
    console.log("[Dispatching Action]:", action)
  }

  const result = next(action)

  if (process.env.NODE_ENV === "development") {
    console.log("[New State]:", store.getState())
  }

  return result
}

export default loggerMiddleware
