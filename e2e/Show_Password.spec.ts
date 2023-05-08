import { test, expect } from '@playwright/test'

const { firefox } = require('playwright');

test('Show Password', async () => {

  const browser = await firefox.launch()
  const page = await browser.newPage()
  await page.goto('/')

  const password = await page.$('input[type="password"]')
  await password.fill('password1')
  
  expect(await password.getAttribute('type')).toEqual('password')
  
  await page.click('i.cursor-pointer')
  
  expect(await password.getAttribute('type')).toEqual('text');
})
