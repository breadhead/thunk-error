import { Dispatch, Action, MiddlewareAPI } from 'redux'

type SupportsError<Error> = (error: Error) => boolean
type HandleError = () => Action | Function

export const createErrorMiddleware = <Error = any>(
  supportsError: SupportsError<Error>,
  dispatchOnError: HandleError,
) =>
  (middleware: MiddlewareAPI<any>) =>
    (next: Dispatch<any>) =>
      (action: any) => next(
        action instanceof Function
          ? addErrorHandling(middleware, supportsError, dispatchOnError)(action)
          : action,
      )

const addErrorHandling = <Error>(
  middleware: MiddlewareAPI<any>,
  supportsError: SupportsError<Error>,
  dispatchOnError: HandleError,
) =>
  (fnAction: Function) =>
    (...args: any[]) => {
      const handleError = (err: Error) => {
        if (supportsError(err)) {
          middleware.dispatch(dispatchOnError())
        }
      }

      let result

      try {
        result = fnAction(...args)
      } catch (err) {
        handleError(err) // sync error in reducer within a thunk
      }

      return result instanceof Promise
        ? result.catch(handleError) // async error in thunk
        : result
    }
