import dayjs from 'dayjs'

export interface IVehicle {
  id?: number
  created?: dayjs.Dayjs | null
  edited?: dayjs.Dayjs | null
  name?: string | null
  model?: string | null
  manufacturer?: string | null
  cost_in_credits?: number | null
  length?: number | null
  max_atmosphering_speed?: number | null
  crew?: number | null
  passengers?: number | null
  cargo_capacity?: number | null
  consumables?: string | null
  vehicle_class?: string | null
}

export const defaultValue: Readonly<IVehicle> = {}
