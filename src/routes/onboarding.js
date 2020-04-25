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

const channelMap = {
  CSXLVGPJL: onboarding.deved
}

module.exports = (event) => {
  if (event.channel) {
    const onboarding = channelMap[event.channel]
    if (onboarding && typeof onboarding === 'function') {
      onboarding(event)
        .then((message) => {
          if (message) {
          // this is the "handler" and we should create a handlers module
            (async () => {
              await web.chat[message.type](message.options)
            })()
          }
        })
    }
  }
}
