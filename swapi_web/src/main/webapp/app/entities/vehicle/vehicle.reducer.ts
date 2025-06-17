import axios from 'axios'
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit'
import { ASC } from 'app/shared/util/pagination.constants'
import { EntityState, IQueryParams, createEntitySlice, serializeAxiosError } from 'app/shared/reducers/reducer.utils'
import { IVehicle, defaultValue } from 'app/shared/model/vehicle.model'

const initialState: EntityState<IVehicle> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
}

const apiUrl = 'api/vehicles'

// Actions

export const getEntities = createAsyncThunk(
  'vehicle/fetch_entity_list',
  async ({ sort }: IQueryParams) => {
    const requestUrl = `${apiUrl}?${sort ? `sort=${sort}&` : ''}cacheBuster=${new Date().getTime()}`
    return axios.get<IVehicle[]>(requestUrl)
  },
  { serializeError: serializeAxiosError },
)

export const getEntity = createAsyncThunk(
  'vehicle/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`
    return axios.get<IVehicle>(requestUrl)
  },
  { serializeError: serializeAxiosError },
)

export const getEntitiesByName = createAsyncThunk(
  'person/fetch_entity_list_by_name',
  async (name: string ) => {
    const requestUrl = `${apiUrl}/?name=${name}`
    return axios.get<IVehicle[]>(requestUrl)
  },
  { serializeError: serializeAxiosError },
)

// slice

export const VehicleSlice = createEntitySlice({
  name: 'vehicle',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false
        state.entity = action.payload.data
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data } = action.payload

        return {
          ...state,
          loading: false,
          entities: data.sort((a, b) => {
            if (!action.meta?.arg?.sort) {
              return 1
            }
            const order = action.meta.arg.sort.split(',')[1]
            const predicate = action.meta.arg.sort.split(',')[0]
            return order === ASC ? (a[predicate] < b[predicate] ? -1 : 1) : b[predicate] < a[predicate] ? -1 : 1
          }),
        }
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null
        state.updateSuccess = false
        state.loading = true
      })
      .addMatcher(isFulfilled(getEntitiesByName), (state, action) => {
        const { data } = action.payload

        return {
          ...state,
          loading: false,
          entities: data
        }
      })         
  },
})

export const { reset } = VehicleSlice.actions

// Reducer
export default VehicleSlice.reducer
