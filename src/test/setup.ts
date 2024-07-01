import '@testing-library/jest-dom'
import { server } from './Mock/server'

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
