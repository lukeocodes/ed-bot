/**
 * Required Env Variables
 */
require('dotenv').config()
const {
  SLACK_TOKEN: slackToken
} = process.env

/**
 * App Message Modules
 */
const onboarding = require('../modules/onboarding')

/**
 * Posting a message with Web API
 *
 * @see https://github.com/slackapi/node-slack-sdk#posting-a-message-with-web-api
 */
const { WebClient } = require('@slack/web-api')
const web = new WebClient(slackToken)

/**
 * Channels that have custom onboarding messages to append
 */
const channelMap = {
  CSXLVGPJL: onboarding.deved
}

/**
 * Channels that can NEVER have onboarding messages,
 * even if invited to those channels for other reasons
 */
const excludeMap = [
  'CSVFB25N3',
  'CSVFB2BAB'
]

module.exports = (event) => {
  if (event.channel) {
    if (!excludeMap.includes(event.channel)) {
      const onboarder = channelMap[event.channel] || onboarding.default
      if (onboarder && typeof onboarder === 'function') {
        onboarder(event)
          .then((message) => {
            if (message) {
            // this is the "handler" and we should create a handlers module
              web.chat[message.type](message.options)
                .catch(console.error)
            }
          })
      }
    }
  }
}
