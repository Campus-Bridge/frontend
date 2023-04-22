import { test, expect } from '@playwright/test'

const { firefox } = require('playwright');

test('Log in', async () => {

  const browser = await firefox.launch()
  const page = await browser.newPage()
  await page.goto('/')

  await page.fill('input[type="email"]', 'email1@example.com')
  await page.fill('input[type="password"]', 'password1')

  await page.check('text=Remember me')

  await page.click('button[type="submit"]')
  await page.waitForNavigation();

  await expect(page.url()).toContain('/dashboard')

})
