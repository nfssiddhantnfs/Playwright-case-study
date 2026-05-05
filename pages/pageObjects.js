import { LandingPage } from './LandingPage.js';
import { LoginPage } from './LoginPage.js';
import { BookStorePage } from './BookStorePage.js';

export class PageObjects {
  constructor(page) {
    this.page = page;
    this.landingPage = new LandingPage(page);
    this.loginPage = new LoginPage(page);
    this.bookStorePage = new BookStorePage(page);
  }
}
