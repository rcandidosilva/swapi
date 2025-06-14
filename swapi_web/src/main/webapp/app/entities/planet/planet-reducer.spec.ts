import axios from 'axios'

import { configureStore } from '@reduxjs/toolkit'
import sinon from 'sinon'

import { EntityState } from 'app/shared/reducers/reducer.utils'
import { IPlanet, defaultValue } from 'app/shared/model/planet.model'
import reducer, { getEntities, getEntity, reset } from './planet.reducer'

describe('Entities reducer tests', () => {
  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0
    }
    return Object.keys(element).length === 0
  }

  const initialState: EntityState<IPlanet> = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: defaultValue,
    updating: false,
    updateSuccess: false,
  }

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      updating: false,
      updateSuccess: false,
    })
    expect(isEmpty(state.entities))
    expect(isEmpty(state.entity))
  }

  function testMultipleTypes(types, payload, testFunction, error?) {
    types.forEach(e => {
      testFunction(reducer(undefined, { type: e, payload, error }))
    })
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(reducer(undefined, { type: '' }))
    })
  })

  describe('Requests', () => {
    it('should set state to loading', () => {
      testMultipleTypes([getEntities.pending.type, getEntity.pending.type], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          loading: true,
        })
      })
    })

    it('should reset the state', () => {
      expect(reducer({ ...initialState, loading: true }, reset())).toEqual({
        ...initialState,
      })
    })
  })

  describe('Failures', () => {
    it('should set a message in errorMessage', () => {
      testMultipleTypes(
        [getEntities.rejected.type, getEntity.rejected.type],
        'some message',
        state => {
          expect(state).toMatchObject({
            errorMessage: null,
            updateSuccess: false,
            updating: false,
          })
        },
        {
          message: 'error message',
        },
      )
    })
  })

  describe('Successes', () => {
    it('should fetch all entities', () => {
      const payload = { data: [{ 1: 'fake1' }, { 2: 'fake2' }] }
      expect(
        reducer(undefined, {
          type: getEntities.fulfilled.type,
          payload,
        }),
      ).toEqual({
        ...initialState,
        loading: false,
        entities: payload.data,
      })
    })

    it('should fetch a single entity', () => {
      const payload = { data: { 1: 'fake1' } }
      expect(
        reducer(undefined, {
          type: getEntity.fulfilled.type,
          payload,
        }),
      ).toEqual({
        ...initialState,
        loading: false,
        entity: payload.data,
      })
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
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject))
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject))
      axios.patch = sinon.stub().returns(Promise.resolve(resolvedObject))
      axios.delete = sinon.stub().returns(Promise.resolve(resolvedObject))
    })

    it('dispatches FETCH_PLANET_LIST actions', async () => {
      const arg = {}

      const result = await getEntities(arg)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(getEntities.fulfilled.match(result)).toBe(true)
    })

    it('dispatches FETCH_PLANET actions', async () => {
      const arg = 42666

      const result = await getEntity(arg)(dispatch, getState, extra)

      const pendingAction = dispatch.mock.calls[0][0]
      expect(pendingAction.meta.requestStatus).toBe('pending')
      expect(getEntity.fulfilled.match(result)).toBe(true)
    })

    it('dispatches RESET actions', async () => {
      await store.dispatch(reset())
      expect(store.getState()).toEqual([expect.any(Object), expect.objectContaining(reset())])
    })
  })
})
