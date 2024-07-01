import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '~/locales/en/home.json'
import PRODUCT_EN from '~/locales/en/product.json'
import HOME_VI from '~/locales/vi/home.json'
import PRODUCT_VI from '~/locales/vi/product.json'
export const defaultNS = 'home'
export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
}
i18n.use(initReactI18next).init({
  resources,
  ns: ['home', 'product'],
  defaultNS,
  lng: 'vi', // ngôn ngữ mặc định
  fallbackLng: 'vi', // ngôn ngữ dự phòng

  interpolation: {
    escapeValue: false // React đã tự động bảo vệ khỏi XSS
  }
})
export default i18n
