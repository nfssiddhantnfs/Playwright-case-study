import 'dotenv/config';
import { test, expect } from "@playwright/test";
import { PageObjects } from "../../pages/pageObjects";

test("UI Automation", async ({ page }) => {
  const pageObjects = new PageObjects(page);

  const username = process.env.USER;
  const password = process.env.PASSWORD;
  const bookName = "Learning JavaScript Design Patterns";

  // Navigate to book store
  await pageObjects.landingPage.navigateToBookStore();

  // Login
  await pageObjects.loginPage.login(username, password);
  await pageObjects.loginPage.validateLogin(username);

  // Go to book store
  await page.getByRole('button', { name: 'Go To Book Store' }).click();
  await page.waitForURL('**/books');

  // Search book
  await pageObjects.bookStorePage.searchBook(bookName);
  await expect(page.getByText(bookName)).toBeVisible();

  // Export details
  await pageObjects.bookStorePage.exportBookDetailsToCSV(bookName);

  // Logout
  await pageObjects.loginPage.logout();
});