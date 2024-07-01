export interface ErrorResponseAPI<Data> {
  message: string
  data?: Data
}
export interface SuccessResponseAPI<Data> {
  message: string
  data: Data
}

// cú pháp loại bỏ optional (?...)
export type NoUnderfinedField<T> = {
  [P in keyof T]-?: NoUnderfinedField<NonNullable<T[P]>>
}
