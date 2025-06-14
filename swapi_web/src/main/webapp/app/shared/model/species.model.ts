import dayjs from 'dayjs'
import { IPlanet } from 'app/shared/model/planet.model'

export interface ISpecies {
  id?: number
  created?: dayjs.Dayjs | null
  edited?: dayjs.Dayjs | null
  name?: string | null
  classification?: string | null
  designation?: string | null
  averageHeight?: number | null
  skinColors?: string | null
  hairColors?: string | null
  eyeColors?: string | null
  averageLifespan?: number | null
  languages?: string | null
  homeworld?: IPlanet | null
}

export const defaultValue: Readonly<ISpecies> = {}
