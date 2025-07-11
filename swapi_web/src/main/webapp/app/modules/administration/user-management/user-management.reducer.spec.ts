import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import sinon from 'sinon'

import { defaultValue } from 'app/shared/model/user.model'
import { AUTHORITIES } from 'app/config/constants'
import userManagement, {
  createUser,
  deleteUser,
  getRoles,
  getUser,
  getUsers,
  getUsersAsAdmin,
  reset,
  updateUser,
} from './user-management.reducer'

describe('User management reducer tests', () => {
  const username = process.env.E2E_USERNAME ?? 'admin'

  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0
    }
    return Object.keys(element).length === 0
  }

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      updating: false,
      updateSuccess: false,
      totalItems: 0,
    })
    expect(isEmpty(state.users))
    expect(isEmpty(state.authorities))
    expect(isEmpty(state.user))
  }

  function testMultipleTypes(types, payload, testFunction, error?) {
    types.forEach(e => {
      testFunction(userManagement(undefined, { type: e, payload, error }))
    })
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(userManagement(undefined, { type: 'unknown' }))
    })
  })

  describe('Requests', () => {
    it('should not modify the current state', () => {
      testInitialState(userManagement(undefined, { type: getRoles.pending.type }))
    })

    it('should set state to loading', () => {
      testMultipleTypes([getUsers.pending.type, getUsersAsAdmin.pending.type, getUser.pending.type], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          loading: true,
        })
      })
    })

    it('should set state to updating', () => {
      testMultipleTypes([createUser.pending.type, updateUser.pending.type, deleteUser.pending.type], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          updating: true,
        })
      })
    })
  })

  describe('Failures', () => {
    it('should set state to failed and put an error message in errorMessage', () => {
      testMultipleTypes(
        [
          getUsersAsAdmin.rejected.type,
          getUsers.rejected.type,
          getUser.rejected.type,
          getRoles.rejected.type,
          createUser.rejected.type,
          updateUser.rejected.type,
          deleteUser.rejected.type,
        ],
        { message: 'something happened' },
        state => {
          expect(state).toMatchObject({
            loading: false,
            updating: false,
            updateSuccess: false,
            errorMessage: 'error happened',
          })
        },
        { message: 'error happened' },
      )
    })
  })

  describe('Success', () => {
    it('should update state according to a successful fetch users request', () => {
      const headers = { 'x-total-count': 42 }
      const payload = { data: 'some handsome users', headers }
      const toTest = userManagement(undefined, { type: getUsers.fulfilled.type, payload })

      expect(toTest).toMatchObject({
        loading: false,
        users: payload.data,
        totalItems: headers['x-total-count'],
      })
    })

    it('should update state according to a successful fetch user request', () => {
      const payload = { data: 'some handsome user' }
      const toTest = userManagement(undefined, { type: getUser.fulfilled.type, payload })

      expect(toTest).toMatchObject({
        loading: false,
        user: payload.data,
      })
    })

    it('should update state according to a successful fetch role request', () => {
      const payload = { data: [AUTHORITIES.ADMIN] }
      const toTest = userManagement(undefined, { type: getRoles.fulfilled.type, payload })

      expect(toTest).toMatchObject({
        loading: false,
        authorities: payload.data,
      })
    })

    it('should set state to successful update', () => {
      testMultipleTypes([createUser.fulfilled.type, updateUser.fulfilled.type], { data: 'some handsome user' }, types => {
        expect(types).toMatchObject({
          updating: false,
          updateSuccess: true,
          user: 'some handsome user',
        })
      })
    })

    it('should set state to successful update with an empty user', () => {
      const toTest = userManagement(undefined, { type: deleteUser.fulfilled.type })

      expect(toTest).toMatchObject({
        updating: false,
        updateSuccess: true,
      })
      expect(isEmpty(toTest.user))
    })
  })

  describe('Reset', () => {
    it('should reset the state', () => {
      const initialState = {
        loading: false,
        errorMessage: null,
        users: [],
        authorities: [] as any[],
        user: defaultValue,
        updating: false,
        updateSuccess: false,
        totalItems: 0,
      }
      const initialStateNew = {
        ...initialState,
        loading: true,
      }
      expect(userManagement(initialStateNew, reset)).toEqual(initialState)
    })
  })

  describe('Actions', () => {
    let store

    const resolvedObject = { value: 'whatever' }
    const getState = jest.fn()
    const dispatch = jest.fn()
    const extra = {}
    beforeEach(() => {
      store = configureStore({
        reducer: (state = [], action) => [...state, action],
      })
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject))
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject))
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject))
      axios.delete = sinon.stub().returns(Promise.resolve(resolvedObject))
    })

    it('dispatches FETCH_USERS_AS_ADMIN_PENDING and FETCH_USERS_AS_ADMIN_FULFILLED actions', async () => {
      const arg = {}

      const result = await getUsersAsAdmin(arg)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(getUsersAsAdmin.fulfilled.match(result)).toBe(true)
    })

    it('dispatches FETCH_USERS_AS_ADMIN_PENDING and FETCH_USERS_AS_ADMIN_FULFILLED actions with pagination options', async () => {
      const arg = { page: 1, size: 20, sort: 'id,desc' }

      const result = await getUsersAsAdmin(arg)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(getUsersAsAdmin.fulfilled.match(result)).toBe(true)
    })

    it('dispatches FETCH_USERS_PENDING and FETCH_USERS_FULFILLED actions', async () => {
      const arg = {}

      const result = await getUsers(arg)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(getUsers.fulfilled.match(result)).toBe(true)
    })

    it('dispatches FETCH_USERS_PENDING and FETCH_USERS_FULFILLED actions with pagination options', async () => {
      const arg = { page: 1, size: 20, sort: 'id,desc' }

      const result = await getUsers(arg)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(getUsers.fulfilled.match(result)).toBe(true)
    })

    it('dispatches FETCH_ROLES_PENDING and FETCH_ROLES_FULFILLED actions', async () => {
      const result = await getRoles()(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(getRoles.fulfilled.match(result)).toBe(true)
    })

    it('dispatches FETCH_USER_PENDING and FETCH_USER_FULFILLED actions', async () => {
      const result = await getUser(username)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(getUser.fulfilled.match(result)).toBe(true)
    })

    it('dispatches CREATE_USER_PENDING and CREATE_USER_FULFILLED actions', async () => {
      const arg = {}

      const result = await createUser(arg)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(createUser.fulfilled.match(result)).toBe(true)
    })

    it('dispatches UPDATE_USER_PENDING and UPDATE_USER_FULFILLED actions', async () => {
      const arg = { login: username }

      const result = await updateUser(arg)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(updateUser.fulfilled.match(result)).toBe(true)
    })

    it('dispatches DELETE_USER_PENDING and DELETE_USER_FULFILLED actions', async () => {
      const result = await deleteUser(username)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(deleteUser.fulfilled.match(result)).toBe(true)
    })

    it('dispatches RESET actions', async () => {
      await store.dispatch(reset())
      expect(store.getState()).toEqual([expect.any(Object), expect.objectContaining(reset())])
    })
  })
})
