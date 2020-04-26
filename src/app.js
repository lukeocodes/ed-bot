/**
 * Required Env Variables
 */
require('dotenv').config()
const {
  SLACK_SIGNING_SECRET: slackSigningSecret
} = process.env

/**
 * Express
 *
 * @see https://expressjs.com/en/starter/hello-world.html
 */
const app = require('express')()

/**
 * Listening for an event with the Events API
 *
 * @see https://github.com/slackapi/node-slack-sdk#listening-for-an-event-with-the-events-api
 */
const { createEventAdapter } = require('@slack/events-api')
const slackEvents = createEventAdapter(slackSigningSecret)

/**
 * Responding to interactive messages
 *
 * @see https://github.com/slackapi/node-slack-sdk#responding-to-interactive-messages
 */
const { createMessageAdapter } = require('@slack/interactive-messages')
const slackInteractions = createMessageAdapter(slackSigningSecret)

/**
 * App routes
 */
const buttonRouting = require('./routes/buttons')
const commandRouting = require('./routes/commands')
const messageRouting = require('./routes/messages')
const onboardingRouting = require('./routes/onboarding')

/**
 * App methods
 */
const errorHandler = (err) => {
  console.error(err)
}

/**
 * Slack App Events functionality
 */
slackEvents.on('member_joined_channel', onboardingRouting)
slackEvents.on('message', messageRouting)
slackEvents.on('app_home_opened', require('./modules/home'))
slackEvents.on('error', errorHandler)

/**
 * Slack App Interactions functionality
 */
slackInteractions.action({ type: 'button' }, buttonRouting)

/**
 * Slack Slash Comands functionality (literally routing express endpoints)
 */
app.use('/slack/commands', commandRouting)

/**
 * Slack App Middleware
 */
app.use('/slack/actions', slackInteractions.expressMiddleware())
app.use('/slack/events', slackEvents.expressMiddleware())

/**
 * Start Express Server
 */
app.listen(process.env.PORT || 3000)
