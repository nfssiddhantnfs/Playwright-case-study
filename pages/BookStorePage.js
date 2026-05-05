import fs from "fs";
import { expect } from "@playwright/test";

export class BookStorePage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator("#searchBox");
  }

  // Search for a book
  async searchBook(bookName) {
    await this.searchBox.click();
    await this.searchBox.fill(bookName);
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByText(bookName)).toBeVisible();
  }

  // Export book details to CSV
  async exportBookDetailsToCSV(bookName, filePath = "BookDetails.csv") {
    const bookSection = this.page.locator('.col-12.mt-4.col-md-6.col-xl-7');
    const sectionText = await bookSection.textContent();

    const bookPart = sectionText.replace(/User Name : .*?Log out/, '').trim();

    const publisherIndex = bookPart.indexOf('Publisher');
    if (publisherIndex === -1) {
      throw new Error('Publisher label not found');
    }

    const valuesPart = bookPart.substring(publisherIndex + 'Publisher'.length).trim();
    const values = valuesPart.split(/Previous|Page|Next/).filter(v => v.trim())[0];

    const title = bookName;
    const remaining = values.replace(title, '').trim();

    const authorMatch = remaining.match(/(.*?)(O'Reilly Media|$)/);
    const author = authorMatch ? authorMatch[1].trim() : 'Unknown';
    const publisher = remaining.includes("O'Reilly Media") ? "O'Reilly Media" : 'Unknown';

    let bookDetailsData = `"Title","Author","Publisher"\n`;
    bookDetailsData += `"${title}","${author}","${publisher}"\n`;

    fs.writeFileSync(filePath, bookDetailsData);
  }
}