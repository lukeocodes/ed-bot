const blocks = require('../libs/blocks')

/**
 * Required Env Variables
 */
require('dotenv').config()
const {
  SLACK_TOKEN: slackToken
} = process.env

/**
 * Posting a message with Web API
 *
 * @see https://github.com/slackapi/node-slack-sdk#posting-a-message-with-web-api
 */
const { WebClient } = require('@slack/web-api')
const web = new WebClient(slackToken)

module.exports = async (event) => {
  try {
    web.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: [
          {
            type: 'image',
            title: {
              type: 'plain_text',
              text: 'Ed the Slack Bot 🎓',
              emoji: true
            },
            image_url: 'https://i.imgur.com/UWFX0w1.png',
            alt_text: 'Ed the Slack Bot'
          },
          blocks.markdown('*Welcome to Ed\'s home tab.*'),
          blocks.divider,
          blocks.markdown('Ed the bot has been built to help EDucate Slack users on ettiquette, channel information, and provide streamlined workflows.'),
          blocks.divider,
          blocks.markdown('Ed is <https://github.com/lukeocodes/ed-bot|open source>, built and maintained by <https://github.com/lukeocodes/|Luke> from the Developer Education team as part of the #slack-champions initiative. Contributions aren\'t just welcome, they\'re encouraged.'),
          blocks.divider,
          blocks.markdown('To get Ed into your channel, invite them in like any other user.\n\nOnce Ed has joined your channel, *any new joiners* will receive a welcome message including your *channel topic*, *purpose* and *any pinned items*.\n\nAdditionally, you can request customised blocks for your channel by contacting the maintainers.')
        ]
      }
    })
      .catch(console.error)
  } catch (error) {
    console.error(error)
  }
}
