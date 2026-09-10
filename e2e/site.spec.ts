import { test, expect } from '@playwright/test';

/** Collect uncaught page errors for the current test. */
function errorSink(page: import('@playwright/test').Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  return errors;
}

test('home (pt default) renders with a heading and nav', async ({ page }) => {
  const errors = errorSink(page);
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.getByRole('navigation').first()).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  expect(errors, errors.join('\n')).toEqual([]);
});

test('English home at /en', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1').first()).toBeVisible();
});

for (const path of ['/dogs', '/litters', '/about', '/faq', '/apply']) {
  test(`${path} renders`, async ({ page }) => {
    const errors = errorSink(page);
    const res = await page.goto(path);
    expect(res?.status(), `HTTP status for ${path}`).toBeLessThan(400);
    await expect(page.locator('h1, h2').first()).toBeVisible();
    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('the apply page has an inquiry form', async ({ page }) => {
  await page.goto('/apply');
  await expect(page.locator('form')).toBeVisible();
  await expect(page.locator('form input[type="email"], form input[name*="mail" i]')).toBeVisible();
});

test('an unknown route serves the 404 page', async ({ page }) => {
  const res = await page.goto('/definitely-not-a-page');
  expect(res?.status()).toBe(404);
});
