import { test, expect } from '@playwright/test'

test('Log in', async ({page}) => {

  await page.goto('/')

  await page.fill('input[type="email"]', 'email1@example.com')
  await page.fill('input[type="password"]', 'password1')

  await page.check('text=Remember me')
  
  await page.click('button[type="submit"]')
  await page.waitForTimeout(3000)

  expect(page.url()).toContain('dashboard')
})