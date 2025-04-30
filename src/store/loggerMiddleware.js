// loggerMiddleware.ts
const loggerMiddleware = store => next => action => {
    console.log('[Dispatching Action]:', action);
    const result = next(action);
    console.log('[New State]:', store.getState());
    return result;
  };
  
  export default loggerMiddleware;