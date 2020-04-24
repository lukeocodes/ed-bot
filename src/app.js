require('dotenv').config()

/*
 * Required Env Variables
 */
const {
  SLACK_SIGNING_SECRET: slackSigningSecret,
  SLACK_TOKEN: slackToken
} = process.env

/*
 * Express
 *
 * @see https://expressjs.com/en/starter/hello-world.html
 */
const app = require('express')()
const port = process.env.PORT || 3000
const url = `http://localhost:${port}`

/*
 * Posting a message with Web API
 *
 * @see https://github.com/slackapi/node-slack-sdk#posting-a-message-with-web-api
 */
const { WebClient } = require('@slack/web-api')
const web = new WebClient(slackToken)

/*
 * Listening for an event with the Events API
 *
 * @see https://github.com/slackapi/node-slack-sdk#listening-for-an-event-with-the-events-api
 */
const { createEventAdapter } = require('@slack/events-api')
const slackEvents = createEventAdapter(slackSigningSecret)

/*
 * Responding to interactive messages
 *
 * @see https://github.com/slackapi/node-slack-sdk#responding-to-interactive-messages
 */
const { createMessageAdapter } = require('@slack/interactive-messages')
const slackInteractions = createMessageAdapter(slackSigningSecret)

/*
 * App modules
 */
const slackCommands = require('./modules/commands')
const messageEvents = require('./modules/messageEvents.js')

/*
 * App methods
 */
const errorHandler = (err) => {
  console.error(err)
}

/*
 * Slack App functionality
 */
slackEvents.on('message', (event) => {
  // `message` for `type: message` Slack events contain `text`, we check just incase
  if (Object.prototype.hasOwnProperty.call(event, 'text')) {
    messageEvents(web, event)
  }
})

slackEvents.on('error', errorHandler)

/*
 * Routing
 */
app.use('/slack/commands', slackCommands)
// add slack interactions as middleware
app.use('/slack/actions', slackInteractions.expressMiddleware())
// add slack events as middleware
app.use('/slack/events', slackEvents.expressMiddleware())

/*
 * Start Express Server
 */
app.listen(port, () => console.log(`Server listening at ${url}`))
