export interface IItem {
  uid?: string | null
  name?: string | null
  url?: string | null
}

export const defaultValue: Readonly<IItem> = {}
