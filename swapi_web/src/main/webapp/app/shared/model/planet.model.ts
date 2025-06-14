import dayjs from 'dayjs'

export interface IPlanet {
  id?: number
  created?: dayjs.Dayjs | null
  edited?: dayjs.Dayjs | null
  name?: string | null
  rotation_period?: number | null
  orbital_period?: number | null
  diameter?: number | null
  climate?: string | null
  gravity?: string | null
  terrain?: string | null
  surface_water?: number | null
  population?: number | null
}

export const defaultValue: Readonly<IPlanet> = {}
