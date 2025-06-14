import dayjs from 'dayjs'
import { IPlanet } from 'app/shared/model/planet.model'
import { IPerson } from 'app/shared/model/person.model'
import { IStarship } from 'app/shared/model/starship.model'
import { IVehicle } from 'app/shared/model/vehicle.model'
import { ISpecies } from 'app/shared/model/species.model'

export interface IFilm {
  id?: number
  created?: dayjs.Dayjs | null
  edited?: dayjs.Dayjs | null
  title?: string | null
  episode_id?: number | null
  opening_crawl?: string | null
  director?: string | null
  producer?: string | null
  release_date?: dayjs.Dayjs | null
  planets?: IPlanet[] | null
  characters?: IPerson[] | null
  startships?: IStarship[] | null
  vehicles?: IVehicle[] | null
  species?: ISpecies[] | null
}

export const defaultValue: Readonly<IFilm> = {}
