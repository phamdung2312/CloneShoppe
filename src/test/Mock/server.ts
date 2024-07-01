import { setupServer } from 'msw/node'
import handlerMockAPI from './handler'
// import handlerMockAPI from './handler'

export const server = setupServer(...handlerMockAPI)
