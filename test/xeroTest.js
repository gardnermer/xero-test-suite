var assert = require('chai').assert;
var asserts = require('../lib/asserts.js').asserts;
var wait = require('../lib/pollUntil.js');
var Command = require('leadfoot/Command');
var Server = require('leadfoot/Server');
var capabilities = require('../capabilities.json');
var config = require('../config.json');
var page = require('../lib/page.js');
var selectors = page.selectors;
var expected = page.expected;
var command, session, id, server;

describe('Xero Tests - Add ANZ account', function (){
  this.timeout(30000);

  before(function () {
    server = new Server('http://localhost:4444/wd/hub');
    return server.createSession(capabilities.desiredCapabilities)
      .then(function (session) {
        id = session.sessionId;
        command = new Command(session)
      }).then(function () {
        console.log('Connected!')
        return command.maximizeWindow()
      })
  })
  it('Should load Login page', function () {
    return command.get(expected.loginUrl)
      .then(asserts.checkPage(expected.loginUrl, expected.loginPageTitle, command))
  })
  it('Should be able to login', function () {
    return command.findByCssSelector(selectors.userNameField)
        .clearValue()
        .type(expected.userName)
        .end()
      .findByCssSelector(selectors.passwordField)
        .clearValue()
        .type(expected.password)
        .end()
      .findByCssSelector(selectors.submitButton)
        .click()
        .end()
      .then(asserts.checkPage(expected.dashboardUrl, expected.dashboardPageTitle, command))
  })
  it('Should be logged into expected account', function () {
    return command
      .then(asserts.checkTextEquals(selectors.orgName, expected.orgName, command))
  })
  it('Should be able to navigate to Bank Account Page', function (){
    return command
      .then(asserts.checkTextEquals(selectors.accounts, expected.accountsText, command))
      .findByCssSelector(selectors.accounts)
        .click()
        .end()
      .then(asserts.checkTextEquals(selectors.firstLinkInMenu, expected.bankAccountsText, command))
      .findByCssSelector(selectors.firstLinkInMenu)
        .click()
        .end()
      .then(asserts.checkPage(expected.bankAccountsUrl, expected.bankAccountsPageTitle, command))
  })
  it('Should be able to start process to add bank account', function () {
    return command
      .then(asserts.checkTextEquals(selectors.addBankAccountButton, expected.addBankAccountButtonText, command))
      .findByCssSelector(selectors.addBankAccountButton)
        .click()
        .end()
      .then(asserts.checkTextEquals(selectors.addBankAccountTitle, expected.addAccountText, command))
      .then(asserts.checkPage(expected.addAccountUrl, expected.addAccountPageTitle, command))
  })
  it('Should be able to search for bank', function () {
    return command.findByCssSelector(selectors.searchForBankField)
        .getAttribute('placeholder')
        .then((text) => assert.equal(text, expected.searchForBank))
        .clearValue()
        .type(expected.bankName)
        .end()
      .then(wait.pollUntilElement(selectors.searchResult, command, 5000))
      .then(asserts.checkTextEquals(selectors.searchResult, expected.bankName, command))
  })
  it('Should be able to load page to enter account info', function() {
    return command.findByCssSelector(selectors.searchResult)
        .click()
        .end()
      .then(wait.pollUntilElement(selectors.enterAccountTitle, command, 5000))
      .then(asserts.checkTextEquals(selectors.enterAccountTitle, expected.enterAccountText, command))
      .then(asserts.checkPage(expected.enterAccountUrl, expected.enterAccountPageTitle, command))
  })
  it('Should get error when not providing account name', function() {
    return command.findByCssSelector(selectors.continueButton)
        .click()
        .end()
      .then(asserts.checkDisplayedTextEquals(selectors.accountNameAlert, expected.accountNameAlertText, command))
  })
  it('Should get error when not providing account type', function () {
    return command.findByCssSelector(selectors.accountNameField)
        .clearValue()
        .type(expected.accountName)
        .end()
      .findByCssSelector(selectors.continueButton)
        .click()
        .end()
      .then(asserts.checkDisplayedTextEquals(selectors.accountTypeAlert, expected.accountTypeAlertText, command))
  })
  it('Should get error when not providing account number', function () {
    return command.findByCssSelector(selectors.accountTypeField)
        .click()
        .end()
      .findByCssSelector(selectors.accountTypeDropDown)
        .click()
        .end()
      .findByCssSelector(selectors.continueButton)
        .click()
        .end()
      .then(asserts.checkDisplayedTextEquals(selectors.accountNumberAlert, expected.accountNumberAlertText, command))
  })
  it('Should be able to enter account number and save account', function () {
    return command.findByCssSelector(selectors.accountNumber)
        .clearValue()
        .type(expected.accountNumber)
        .end()
      //clicking on the account number box in order to clear the alert 
      .findByCssSelector(selectors.accountNumber)
        .click()
        .end()
      .findByCssSelector(selectors.continueButton)
        .click()
        .end()
      .then(wait.pollUntilText(expected.bankAccountsText, selectors.bankAccountsTitle, command, 5000))
      .then(asserts.checkTextEquals(selectors.bankAccountsTitle, expected.bankAccountsText, command))
      .then(asserts.checkPageTitleEquals(expected.bankAccountsPageTitle, command))
      .getCurrentUrl()
      .then((url) => assert.include(url, expected.bankAccountsUrl))
  })
  it('Should get alert message confirming bank account addition', function () {
    return command
      .then(asserts.checkTextEquals(selectors.accountAddAlert, expected.accountAddAlertText, command))
  })
  it('Should have at least one bank account with saved account name', function () {
    return command.findAllByCssSelector(selectors.bankAccountNames)
        .getVisibleText()
        .then((text) => assert.include(text, expected.accountName + '\n' + expected.accountNumber))
        .end()
  })
  it('Should be able to navigate to Settings', function () {
    return command
      .then(asserts.checkTextEquals(selectors.settings, expected.settingsText, command))
      .findByCssSelector(selectors.settings)
        .click()
        .end()
      .then(asserts.checkTextEquals(selectors.firstLinkInMenu, expected.generalSettingsText, command))
      .findByCssSelector(selectors.firstLinkInMenu)
        .click()
        .end()
      .then(asserts.checkPage(expected.settingsUrl, expected.settingsPageTitle, command)) 
  })
  it('Should be able to navigate to Chart of Accounts', function () {
    return command
      .then(asserts.checkTextEquals(selectors.chartOfAccountsLink, expected.chartOfAccountsText, command))
      .findByCssSelector(selectors.chartOfAccountsLink)
        .click()
        .end()
      .then(asserts.checkPage(expected.chartUrl, expected.chartPageTitle, command))
  })
  it('Should be able to navigate to add bank account flow', function () {
    return command
      .then(asserts.checkTextEquals(selectors.addBankAccountButtonFromCA, expected.addBankAccountButtonText, command))
      .findByCssSelector(selectors.addBankAccountButtonFromCA)
        .click()
        .end()
      .then(asserts.checkPage(expected.addAccountFromCAUrl, expected.addAccountPageTitle, command))
  })
  it('Should be able to clean up after tests', function () {
    return command
      .then(asserts.checkTextEquals(selectors.settings, expected.settingsText, command))
      .findByCssSelector(selectors.settings)
        .click()
        .end()
      .then(asserts.checkTextEquals(selectors.firstLinkInMenu, expected.generalSettingsText, command))
      .findByCssSelector(selectors.firstLinkInMenu)
        .click()
        .end()
      .then(asserts.checkPage(expected.settingsUrl, expected.settingsPageTitle, command))
      .then(asserts.checkTextEquals(selectors.chartOfAccountsLink, expected.chartOfAccountsText, command))
      .findByCssSelector(selectors.chartOfAccountsLink)
        .click()
        .end()
      .then(asserts.checkPage(expected.chartUrl, expected.chartPageTitle, command))
      .then(asserts.checkTextEquals(selectors.chartBody + ' ' + selectors.firstNameLink, expected.accountName, command))
      .findByCssSelector(selectors.chartBody)
        .findByCssSelector(selectors.firstCheckBox)
          .click()
          .end()
        .end()
      .then(asserts.checkTextEquals(selectors.deleteButton, expected.deleteText, command))
      .findByCssSelector(selectors.deleteButton)
        .click()
        .end()
      .sleep(2000)
      .then(asserts.checkTextEquals(selectors.popupTextTitle, expected.popupText, command))
      .findByCssSelector(selectors.popupOkay)
        .click()
        .end()
      .then(asserts.checkTextEquals(selectors.accountAddAlert, expected.confirmDeleteText, command))

  })
  after(function () {
    return server.deleteSession(id)
  })
})
