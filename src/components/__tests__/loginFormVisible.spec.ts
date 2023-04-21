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

describe('LoginFormVisible', () => {
  it('login form visible', async () => {
    expect(LoginView).toBeTruthy()
    const wrapper = wrapperFactory()

    expect(wrapper.find('[v-model="email"]').exists())
    expect(wrapper.find('[v-model="password"]').exists())
    expect(wrapper.find('[v-model="rememberMe"]').exists())
    expect(wrapper.find('[aria-label="Forgot Password?"]').exists())
    expect(wrapper.findComponent({ name: 'q-btn', attrs: { type: 'login' } }).exists())
    expect(wrapper.findComponent({ name: 'q-btn', attrs: { type: 'reset' } }).exists())
  })
})
