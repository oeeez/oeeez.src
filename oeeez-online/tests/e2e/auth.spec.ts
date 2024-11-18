import { test, expect } from '@playwright/test';

test.describe('Authentication E2E Tests', () => {
  test('should register a new user', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page.locator('text=Welcome, testuser')).toBeVisible();
  });

  test('should login an existing user', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page.locator('text=Welcome back, testuser')).toBeVisible();
  });

  // Add more E2E tests for authentication flows
});
