import { test, expect } from '@playwright/test'

test.beforeEach(async ({page}) => {

  await page.goto('/')

  await page.fill('input[type="email"]', 'email1@example.com')
  await page.fill('input[type="password"]', 'password1')

  await page.check('text=Remember me')

  await page.click('button[type="submit"]')
}); 

test.afterEach(async ({page}) => {

  await page.close()
});

test('Shedule', async ({page}) => {
  
  await page.getByTestId('schedule').click()
  await page.waitForTimeout(3000)

  await expect(page.url()).toContain('/a')
})

test('Grades', async ({page}) => {

  await page.getByTestId('grades').click()
  await page.waitForTimeout(3000)

  await expect(page.url()).toContain('/b')
})

test('Announcements', async ({page}) => {

  await page.getByTestId('announcement').click()
  await page.waitForTimeout(3000)

  await expect(page.url()).toContain('/c')
})
test('Finance', async ({page}) => {

  await page.getByTestId('finance').click()
  await page.waitForTimeout(3000)

  await expect(page.url()).toContain('/d')
})
test('Files', async ({page}) => {

  await page.getByTestId('files').click()
  await page.waitForTimeout(3000)

  await expect(page.url()).toContain('/e')
})
test('Account', async ({page}) => {

  await page.getByTestId('account').click()
  await page.waitForTimeout(3000)

  await expect(page.url()).toContain('/d')
})
