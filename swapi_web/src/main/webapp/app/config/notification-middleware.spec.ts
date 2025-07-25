import { applyMiddleware, createStore } from 'redux'
import * as toastify from 'react-toastify' // synthetic default import doesn't work here due to mocking.
import sinon from 'sinon'
import { TranslatorContext } from 'react-jhipster'

import notificationMiddleware from './notification-middleware'

describe('Notification Middleware', () => {
  let store

  const SUCCESS_TYPE = 'SUCCESS/fulfilled'
  const ERROR_TYPE = 'ERROR/rejected'

  // Default action for use in local tests
  const DEFAULT = {
    type: SUCCESS_TYPE,
    payload: 'foo',
  }
  const HEADER_SUCCESS = {
    type: SUCCESS_TYPE,
    payload: {
      status: 201,
      statusText: 'Created',
      headers: { 'app-alert': 'foo.created', 'app-params': 'foo' },
    },
  }

  const DEFAULT_ERROR = {
    type: ERROR_TYPE,
    error: new Error('foo'),
  }
  const VALIDATION_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: {
          type: 'https://www.jhipster.tech/problem/problem-with-message',
          title: 'Method argument not valid',
          status: 400,
          path: '/api/foos',
          message: 'error.validation',
          fieldErrors: [{ objectName: 'foos', field: 'minField', message: 'Min' }],
        },
        status: 400,
        statusText: 'Bad Request',
        headers: { expires: '0' },
      },
    },
  }
  const HEADER_ERRORS = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'app-error': 'foo.creation', 'app-params': 'foo' },
      },
    },
  }
  const NOT_FOUND_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: {
          status: 404,
          message: 'Not found',
        },
        status: 404,
      },
    },
  }
  const NO_SERVER_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        status: 0,
      },
    },
  }
  const GENERIC_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: {
          message: 'Error',
        },
      },
    },
  }
  const LOGIN_REJECTED_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: '',
        config: {
          url: 'api/authenticate',
        },
        status: 401,
      },
    },
  }

  const TITLE_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: {
          title: 'Incorrect password',
          status: 400,
          type: 'https://www.jhipster.tech/problem/invalid-password',
        },
        status: 400,
      },
    },
  }

  const STRING_DATA_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: 'Incorrect password string',
        status: 400,
      },
    },
  }

  const UNKNOWN_400_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        status: 400,
      },
    },
  }

  const UNKNOWN_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
    },
  }

  const makeStore = () => applyMiddleware(notificationMiddleware)(createStore)(() => null)

  beforeAll(() => {
    TranslatorContext.registerTranslations('en', {})
  })

  beforeEach(() => {
    store = makeStore()
    sinon.spy(toastify.toast, 'error')
    sinon.spy(toastify.toast, 'success')
  })

  afterEach(() => {
    ;(toastify.toast as any).error.restore()
    ;(toastify.toast as any).success.restore()
  })

  it('should not trigger a toast message but should return action', () => {
    expect(store.dispatch(DEFAULT).payload).toEqual('foo')
    expect((toastify.toast as any).error.called).toEqual(false)
    expect((toastify.toast as any).success.called).toEqual(false)
  })

  it('should trigger a success toast message for header alerts', () => {
    expect(store.dispatch(HEADER_SUCCESS).payload.status).toEqual(201)
    const toastMsg = (toastify.toast as any).success.getCall(0).args[0]
    expect(toastMsg).toContain('foo.created')
  })

  it('should trigger an error toast message and return error', () => {
    expect(store.dispatch(DEFAULT_ERROR).error.message).toEqual('foo')
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toEqual('foo')
  })

  it('should trigger an error toast message and return error for generic message', () => {
    expect(store.dispatch(GENERIC_ERROR).error.response.data.message).toEqual('Error')
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('Error')
  })

  it('should trigger an error toast message and return error for 400 response code', () => {
    expect(store.dispatch(VALIDATION_ERROR).error.response.data.message).toEqual('error.validation')
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('error.Size')
  })

  it('should trigger an error toast message and return error for 404 response code', () => {
    expect(store.dispatch(NOT_FOUND_ERROR).error.response.data.message).toEqual('Not found')
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('error.url.not.found')
  })

  it('should trigger an error toast message and return error for 0 response code', () => {
    expect(store.dispatch(NO_SERVER_ERROR).error.response.status).toEqual(0)
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('error.server.not.reachable')
  })

  it('should trigger an error toast message and return error for headers containing errors', () => {
    expect(store.dispatch(HEADER_ERRORS).error.response.status).toEqual(400)
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('foo.creation')
  })

  it('should not trigger an error toast message and return error for 401 response code', () => {
    expect(store.dispatch(LOGIN_REJECTED_ERROR).error.response.status).toEqual(401)
    expect((toastify.toast as any).error.called).toEqual(false)
    expect((toastify.toast as any).success.called).toEqual(false)
  })

  it('should trigger an error toast message and return error for 400 response code', () => {
    expect(store.dispatch(TITLE_ERROR).error.response.status).toEqual(400)
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('Incorrect password')
  })

  it('should trigger an error toast message and return error for string in data', () => {
    expect(store.dispatch(STRING_DATA_ERROR).error.response.status).toEqual(400)
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('Incorrect password string')
  })

  it('should trigger an error toast message and return error for unknown 400 error', () => {
    expect(store.dispatch(UNKNOWN_400_ERROR).error.response.status).toEqual(400)
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('Unknown error!')
  })

  it('should trigger an error toast message and return error for unknown error', () => {
    expect(store.dispatch(UNKNOWN_ERROR).error.isAxiosError).toEqual(true)
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0]
    expect(toastMsg).toContain('Unknown error!')
  })
})
