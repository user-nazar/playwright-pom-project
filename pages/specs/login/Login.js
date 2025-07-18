const { expect } = require('@playwright/test');
import config from '../../../global/config/config';
const { CommonFunc } = require('../../../global/common/common');
const successlog = require('../../../global/util/logger').successlog;
const errorlog = require('../../../global/util/logger').errorlog;

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;

    // Локатори для елементів сторінки логіну
    this.userId = this.page.locator("xpath=//input[@name='email']");
    this.password = this.page.locator("xpath=//input[@name='passwd']");
    // Уточнений локатор кнопки — по id, щоб уникнути дублювань
    this.loginButton = this.page.locator("#SubmitLogin");
    this.scroll = this.page.locator("xpath=//a[.='VBScript']");
    this.func = new CommonFunc(this.page, this.testInfo);
  }

  async gotoLegacyApp() {
    const url = config.applicationUrl;
    successlog.info(url);
    await this.page.goto(url, { waitUntil: 'networkidle' }, { timeout: 30000 });
  }

  async gotoNewApp() {
    const url = config.newApplicationUrl;
    successlog.info(url);
    // Відсутня реалізація — можна додати
  }

  async loginToApplication(username, passwd) {
    await this.func.fillOnObject(this.userId, "Enter the username", username);
    await this.func.fillOnObject(this.password, "Enter the password", passwd);
    await this.func.clickOnObject(this.loginButton, "Click on the login button");

    await this.page.waitForTimeout(2000);
  }
};
