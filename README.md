# thunk-error

## Instalation

`yarn add @breadhead/thunk-error`

## Usage

```js
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';

import { createErrorMiddleware } from '@breadhead/thunk-error'

export const unauthorizedMiddleware = createErrorMiddleware(
  (err) => !!err && (err.status === 401 || err.status === 403), // middleware supports this error?
  () => actions.authViolateStatus(), // dispatch result of this function  on error
)

const reducer = combineReducers({
  first: firstReducer,
})

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    unauthorizedMiddleware,
    thunk,
  ),
)

```
