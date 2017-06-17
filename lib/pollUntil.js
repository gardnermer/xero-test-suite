'use strict'

var pollUntil = require('leadfoot/helpers/pollUntil')

module.exports = {
/**
 * Polls until an element exists
 * @param {string} selector - CSS selector for the element
 * @param {module: leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilElement: function (selector, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (selector) {
          let element = document.querySelector(selector)
          return element ? true : null
        }, [selector], timeout))
    }
  },
/**
 * Polls until an element's text equals the provided value
 * @param {string} text - Expected text to check against
 * @param {string} selector - CSS selector for the element's text that is being checked
 * @param {module: leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilText: function (text, selector, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (value, selector) {
          let element = document.querySelector(selector)

          if (!element) {
            return null
          }

          let text = element.textContent === value

          if(!text) {
            return null
          }

          return text ? element.textContent : null
        }, [text, selector], timeout))
    }
  },
/**
 * Polls until the page url equals what is expected
 * @param {string} url - url value that is waited for
 * @param {module: leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilUrl: function (url, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (url) {
          let page = document
          return page.URL === url ? true : null
        }, [url], timeout))
    }
  }
}

