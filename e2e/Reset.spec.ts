import { test, expect } from '@playwright/test'
test('Reset btn', async ({page}) => {

  await page.goto('/')

  await page.fill('input[type="email"]', 'email1@example.com')
  await page.fill('input[type="password"]', 'password1')

  await page.click('button[type="reset"]')

  const emailFieldValue = await page.$eval('input[type="email"]', (el: { value: string; }) => el.value)
  const passwordFieldValue = await page.$eval('input[type="password"]', (el: { value: string; }) => el.value)
  await expect(emailFieldValue).toEqual('')
  await expect(passwordFieldValue).toEqual('')

})
