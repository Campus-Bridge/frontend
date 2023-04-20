import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LoginView from '../../views/LoginView.vue'

describe('LoginPage', () => {
  it('renders properly', () => {
    const wrapper = mount(LoginView)
    wrapper.find('[aria-label="Email"]').setValue('email1@example.com')
    expect(true)
  })
})
