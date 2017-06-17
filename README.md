# xero-test-suite

[xero-test-suite] - https://github.com/gardnermer/xero-test-suite.git
Project runs on mocha and chai, using leadfoot. Written in JavaScript
Leadfoot is a client library containing JS bindings for Selenium based on Promises

### Set Up

```shell
# clone the project
git clone https://github.com/gardnermer/xero-test-suite.git

# Ensure you have node and npm installed
# Check version of node with 
node -v

# If not installed, go here: https://nodejs.org/en/download/ to find the applicable version
# and install on your computer
# npm comes with node, but you can update the version by running
npm install npm@latest -g

# Change Directories into the project folder 
cd xero-test-suite

# run npm install
# npm will also install the selenium-standalaone package and drivers
# globally which allows you to pull in the selenium dependencies
npm install

# If Selenium does not install upon download, you can force the install by running
selenium-standalone install

# make sure Java 8 is installed
java -version

```


### Running tests 

```shell
# Start selenium server.
selenium-standalone start

# From xero-test-suite directory, run test using
npm test

```
### Unit Tests

Leadfoot contains unit tests that are set to run before the test suite runs. 
This gathers information about the browser being used and corrects for known bugs within the driver

### Desired Capabilities

Tests are set up to run in Chrome. However, browser preference can be changed by updating 
desiredCapabilities.json this can be modified to other browsers

### Configs

Config.json is set up with test values that will work with the account.
Should be able to update and changes these values and tests should function on a different account

