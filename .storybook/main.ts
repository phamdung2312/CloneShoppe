import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
const path = require('path')

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    'storybook-addon-remix-react-router'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          src: path.resolve(__dirname, '../src')
        }
      }
    })
  }
}
export default config
