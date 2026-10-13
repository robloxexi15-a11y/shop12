export interface Product {
  id: string
  name: { ru: string; en: string }
  description: { ru: string; en: string }
  photos: string[]
  priceStars: number
  priceTon: number
  stock: number
  category: string
}

export interface UserInfo {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
}

export type Lang = 'ru' | 'en'
export type Tab = 'catalog' | 'ai' | 'admin'
