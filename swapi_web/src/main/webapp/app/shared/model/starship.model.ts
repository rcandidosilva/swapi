import dayjs from 'dayjs'

export interface IStarship {
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
  hyperdriveRating?: number | null
  mglt?: number | null
  startshipClass?: string | null
}

export const defaultValue: Readonly<IStarship> = {}
