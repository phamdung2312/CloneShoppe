import { resources, defaultNS } from '~/I18next/I18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['vi']
  }
}
