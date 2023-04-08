import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LoginPage from '../../views/LoginView.vue'

describe('LoginPage', () => {
  it('renders properly', () => {
    const wrapper = mount(LoginPage, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
