export type ProductType = 'televisor' | 'tarjeta'

export interface Marca {
  id_marca: number
  descripcion_marca: string
}

export interface Estado {
  id_estado: number
  descripcion_estado: string
}

export interface InventarioLookup {
  id_inventario: number
  descripcion_inventario: string
}

export interface TelevisorFormData {
  marca: string
  modelo: string
  estado: string
  smart: string
  precio: string
  observaciones: string
}

export interface TarjetaFormData {
  inventario: string
  caja: string
  cantidad: string
  marca: string
  modelo: string
  precio: string
  compatibilidad: string
  observaciones: string
}

export const TELEVISOR_INIT: TelevisorFormData = {
  marca: '',
  modelo: '',
  estado: '',
  smart: '',
  precio: '',
  observaciones: '',
}

export const TARJETA_INIT: TarjetaFormData = {
  inventario: '',
  caja: '',
  cantidad: '',
  marca: '',
  modelo: '',
  precio: '',
  compatibilidad: '',
  observaciones: '',
}
