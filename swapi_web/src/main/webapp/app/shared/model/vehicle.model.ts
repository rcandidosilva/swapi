import dayjs from 'dayjs'

export interface IVehicle {
  id?: number
  created?: dayjs.Dayjs | null
  edited?: dayjs.Dayjs | null
  name?: string | null
  model?: string | null
  manufacturer?: string | null
  costInCredits?: number | null
  length?: number | null
  maxAtmospheringSpeed?: number | null
  crew?: number | null
  passengers?: number | null
  cargoCapacity?: number | null
  consumables?: string | null
  vehicleClass?: string | null
}

export const defaultValue: Readonly<IVehicle> = {}
