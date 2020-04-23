require('dotenv').config()

/*
 * Required Env Variables
 */
const { SLACK_SIGNING_SECRET, SLACK_TOKEN } = process.env

/*
 * Express
 */
const app = require('express')()
const port = process.env.PORT || 3000

/*
 * Posting a message with Web API
 *
 * @see https://github.com/slackapi/node-slack-sdk#posting-a-message-with-web-api
 */
const { WebClient } = require('@slack/web-api')
const web = new WebClient(SLACK_TOKEN)

/*
 * Listening for an event with the Events API
 *
 * @see https://github.com/slackapi/node-slack-sdk#listening-for-an-event-with-the-events-api
 */
const { createEventAdapter } = require('@slack/events-api')
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET)

/*
 * Responding to interactive messages
 *
 * @see https://github.com/slackapi/node-slack-sdk#responding-to-interactive-messages
 */
const { createMessageAdapter } = require('@slack/interactive-messages')
const slackInteractions = createMessageAdapter(SLACK_SIGNING_SECRET)

/*
 * App modules
 */
const slackCommands = require('./commands')
const messageEvents = require('./messageEvents.js')

/*
 * App methods
 */
const errorHandler = (err) => {
  console.error(err)
}

slackEvents.on('message', (event) => {
  // `message` for `type: message` Slack events contain `text`, we check just incase
  if (Object.prototype.hasOwnProperty.call(event, 'text')) {
    messageEvents(web, event)
  }
})

slackEvents.on('error', errorHandler)

app.use('/slack/commands', slackCommands)
app.use('/slack/actions', slackInteractions.expressMiddleware())
app.use('/slack/events', slackEvents.expressMiddleware())

app.listen(port, () => console.log(`server listening at http://localhost:${port}`))
