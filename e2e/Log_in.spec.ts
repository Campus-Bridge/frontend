import { test, expect } from '@playwright/test'

test.afterEach(async ({page}) => {

  await page.close()
});
test('Log in using correct credentials', async ({page}) => {

  await page.goto('/')

  await page.fill('input[type="email"]', 'email1@example.com')
  await page.fill('input[type="password"]', 'password1')
  
  await page.click('button[type="submit"]')
  await page.waitForTimeout(3000)

  expect(page.url()).toContain('/dashboard')
})

test('Log in using incorrect credentials', async ({page}) => {

  await page.goto('/')

  await page.fill('input[type="email"]', 'email1321@example.com')
  await page.fill('input[type="password"]', 'passwordD421')
  
  await page.click('button[type="submit"]')
  await page.waitForTimeout(3000)

  expect(page.url()).toBe('http://localhost:5173/')
})