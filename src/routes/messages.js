const messages = require('../modules/messages')

require('dotenv').config()

/*
 * Required Env Variables
 */
const {
  SLACK_TOKEN: slackToken
} = process.env

/*
 * Posting a message with Web API
 *
 * @see https://github.com/slackapi/node-slack-sdk#posting-a-message-with-web-api
 */
const { WebClient } = require('@slack/web-api')
const web = new WebClient(slackToken)

const matchMap = [
  {
    regex: /(deved-[0-9]{1,6})/gi,
    response: messages.deved
  }
]

const messageMapper = (event) => {
  const match = matchMap.find((properties) => {
    return event.text.match(properties.regex)
  })

  if (match) {
    return match
  }
}

module.exports = (event) => {
  if (event.text) {
    const messageEvent = messageMapper(event)
    if (messageEvent && typeof messageEvent.response === 'function') {
      messageEvent.response(messageEvent.regex, event)
        .then((message) => {
          // this is the "handler" and we should
          (async () => {
            await web.chat[message.type](message.options)
          })()
        })
    }
  }
}
