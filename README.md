# xero-test-suite

[xero-test-suite] - https://github.com/gardnermer/xero-test-suite.git
Project runs on mocha and chai, using leadfoot. Written in JavaScript

### Set Up

```shell
# clone the project
git clone https://github.com/gardnermer/xero-test-suite.git

# run npm install
# npm will also install the selenium-standalaone package and drivers
# globally which allows you to pull in the selenium dependencies
npm install

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