import { describe, it, expect } from 'vitest'
import { Quasar } from 'quasar'

import { mount } from '@vue/test-utils'
import LoginView from '../../views/LoginView.vue'

const wrapperFactory = () =>
  mount(LoginView, {
    global: {
      plugins: [Quasar]
    }
  })

describe('MyForm', () => {
  it('should fill in email input', async () => {
    expect(LoginView).toBeTruthy()
    const wrapper = wrapperFactory()

    expect(wrapper.find('h2').exists()).toBeTruthy()
  })
})
