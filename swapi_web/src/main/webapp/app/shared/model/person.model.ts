import dayjs from 'dayjs'
import { IPlanet } from 'app/shared/model/planet.model'
import { ISpecies } from 'app/shared/model/species.model'
import { IVehicle } from 'app/shared/model/vehicle.model'
import { IStarship } from 'app/shared/model/starship.model'

export interface IPerson {
  id?: number
  created?: dayjs.Dayjs | null
  edited?: dayjs.Dayjs | null
  name?: string | null
  height?: number | null
  mass?: number | null
  hair_color?: string | null
  skin_color?: string | null
  eye_color?: string | null
  birth_year?: string | null
  gender?: string | null
  homeworld?: IPlanet | null
  species?: ISpecies[] | null
  vehicles?: IVehicle[] | null
  starships?: IStarship[] | null
}

export const defaultValue: Readonly<IPerson> = {}
