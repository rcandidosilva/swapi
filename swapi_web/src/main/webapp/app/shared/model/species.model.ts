import dayjs from 'dayjs'
import { IPlanet } from 'app/shared/model/planet.model'

export interface ISpecies {
  id?: number
  created?: dayjs.Dayjs | null
  edited?: dayjs.Dayjs | null
  name?: string | null
  classification?: string | null
  designation?: string | null
  average_height?: number | null
  skin_colors?: string | null
  hair_colors?: string | null
  eye_colors?: string | null
  average_lifespan?: number | null
  languages?: string | null
  homeworld?: IPlanet | null
}

export const defaultValue: Readonly<ISpecies> = {}
