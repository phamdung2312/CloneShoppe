import { expect, describe, it } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEntity, test } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from '~/constant/httpStatusCode.enum'

// describe dùng để mô tả tập hợp các ngữ cảnh
// hoặc đơn vị cần test: Ví dụ functionm, component
describe('isAxiosError', () => {
  // it dùng để ghi chú các trường hợp cần test
  it('isAxiosError trả về boolean ', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})
describe('isAxiosUnprocessableEntity', () => {
  // it dùng để ghi chú các trường hợp cần test
  it('isAxiosUnprocessableEntity trả về boolean ', () => {
    expect(isAxiosUnprocessableEntity(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})
describe('test', () => {
  // it dùng để ghi chú các trường hợp cần test
  it('test Unit test', () => {
    expect(test(4)).toBe(2)
  })
})
