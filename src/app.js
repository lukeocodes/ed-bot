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

/*
 * App routes
 */
const messageRouting = require('./routes/messages')

/*
 * App methods
 */
const errorHandler = (err) => {
  console.error(err)
}

/*
 * Slack App Events functionality
 */
slackEvents.on('message', messageRouting)

slackEvents.on('error', errorHandler)

/*
 * Slack App Interactions functionality
 */
slackInteractions.action({ type: 'button' }, (payload, respond) => {
  console.log('payload', payload)

  respond({ text: 'Thanks! I\'ve attached some more info to your request!' })

  // return { text: 'Processing...' }
})

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
app.listen(port)
