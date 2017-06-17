'use strict'

var config = require('../config.json');
const random = Date.now();

// page object containing selectors and expected strings for test suite

const selectors = {
  // Login Page selectors
  userNameField: '#email',
  passwordField: '#password',
  submitButton: '#submitButton',
  // Dashboard Page selectors
  orgName: '.org-name',
  accounts: '#Accounts',
  settings: '#Settings',
  firstLinkInMenu: 'li.open ul li a',
  // Bank Accounts Page selectors
  bankAccountsTitle: 'span#title',
  bankAccountNames: 'div.bank a.bank-name',
  addBankAccountButton: 'div.button a[href="/Banking/Account/#find"] span',
  // Add Bank Account Flow selectors
  addBankAccountTitle: '#view h1',
  enterAccountTitle: 'h1.ba-page-title',
  searchForBankField: 'div.ba-banksearch input',
  searchResult: 'div[data-automationid="searchBanksList"] ul li.ba-banklist--item',
  // Account Details selectors
  accountNameField: 'div[data-automationid="accountName"] input',
  accountTypeField: 'div[data-automationid="accountType"] input',
  accountTypeDropDown: 'li.ba-combo-list-item:nth-child(1)',
  continueButton: 'a[data-automationid="continueButton"]',
  accountNameAlert: 'div[data-automationid="accountName"] ul li',
  accountTypeAlert: 'div[data-automationid="accountType"] ul li',
  accountNumber: 'div[data-automationid="accountNumber"] input',
  accountNumberParentElem: 'div[data-automationid="accountNumber"]',
  accountNumberAlert: 'div[data-automationid="accountNumber"] li',
  // Confirmation alert
  accountAddAlert: 'div.message p',
  // Settings Page selectors
  settingsTitle: '#view h1',
  chartOfAccountsLink: 'a.name[href="https://go.xero.com//GeneralLedger/ChartOfAccounts.aspx"]',
  // Chart of Accounts Page Selectors
  chartTitle: 'span#title',
  addBankAccountButtonFromCA: 'div.secondaryButtons a[href="/Banking/Account/?fromCA=true#find"]',
  chartBody: '#chartOfAccounts tbody',
  firstCheckBox: 'tr #WillDelete',
  firstNameLink: 'tr td:nth-child(3) a',
  deleteButton: 'div.btn .red-text',
  popupTextTitle: 'span.x-window-header-text',
  popupOkay: '#popupOK'

};

const expected = {
  // Login Page strings
  loginUrl: config.loginUrl,
  baseUrl: config.baseUrl,
  loginPageTitle: 'Login | Xero Accounting Software',
  userName: config.userName,
  password: config.password,
  // Dashboard Page strings
  dashboardPageTitle: 'Xero | Dashboard | ' + config.orgName,
  dashboardUrl: config.baseUrl + 'Dashboard/',
  orgName: config.orgName,
  accountsText: 'Accounts',
  bankAccountsText: 'Bank Accounts',
  settingsText: 'Settings',
  generalSettingsText: 'General Settings',
  // Bank Accounts page strings
  bankAccountsPageTitle: 'Xero | Bank Accounts | ' + config.orgName,
  bankAccountsUrl: config.baseUrl + 'Bank/BankAccounts.aspx',
  addBankAccountButtonText: 'Add Bank Account',
  // Add Account Flow page strings
  addAccountUrl: config.baseUrl + 'Banking/Account/#find',
  addAccountPageTitle: 'Xero | Find your bank | ' + config.orgName,
  addAccountText: 'Add Bank Accounts',
  searchForBank: 'Search for your bank...',
  bankName: config.bankName,
  // Account details strings
  enterAccountText: 'Enter your ' + config.bankName + ' account details',
  enterAccountUrl: config.baseUrl + 'Banking/Account/#add/direct/21aa230b-ad51-4756-949d-19028adbb0bd',
  enterAccountPageTitle: 'Xero | Enter your ' + config.bankName + ' account details | ' + config.orgName,
  accountNameAlertText: 'Account Name required',
  accountTypeAlertText: 'Account Type required',
  accountTypeText: 'Everyday (day-to-day)',
  accountNumberAlertText: 'Account Number required',
  accountName: config.accountName + ' ' + random,
  accountNumber: config.accountNumber,
  // Confirmation strings
  accountAddAlertText: config.accountName + ' ' + random + ' has been added.',
  // Settings Page strings
  settingsUrl: config.baseUrl + 'Settings/',
  settingsPageTitle: 'Xero | General Settings | ' + config.orgName,
  chartOfAccountsText: 'Chart of Accounts',
  // Chart of Accounts Page strings
  chartUrl: config.baseUrl + '/GeneralLedger/ChartOfAccounts.aspx',
  chartPageTitle: 'Xero | Chart Of Accounts | ' + config.orgName,
  addAccountFromCAUrl: config.baseUrl + 'Banking/Account/?fromCA=true#find',
  deleteText: 'Delete',
  popupText: 'Delete Accounts',
  confirmDeleteText: '1 account has been deleted'

};
module.exports = {
  expected,
  selectors
};
