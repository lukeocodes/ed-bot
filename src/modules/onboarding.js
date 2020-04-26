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

const blocks = require('../libs/blocks')

const onboardingBlocks = async (channelId, extraBlocks) => {
  try {
    const { channel } = await web.channels.info({ channel: channelId })
    const { items: pins } = await web.pins.list({ channel: channelId })

    const channelBlocks = [
      blocks.markdown(`Welcome to the #${channel.name} channel 👋`)
    ]

    if (channel.topic.value) {
      channelBlocks.push(blocks.markdown(channel.topic.value))
    }

    if (channel.purpose.value) {
      channelBlocks.push(blocks.markdown(channel.purpose.value))
    }

    if (pins && pins.length > 0) {
      channelBlocks.push(blocks.divider)
      channelBlocks.push(blocks.markdown(`#${channel.name} pinned messages:`))
      pins.forEach((pin, index) => {
        channelBlocks.push(blocks.markdown(
          `📌 ${index + 1}.\n` +
          `>>> ${pin.message.text}`
        ))
      })
    }

    if (extraBlocks && extraBlocks.length > 0) {
      channelBlocks.push(blocks.divider, ...extraBlocks)
    }

    return channelBlocks
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  default: async (event) => {
    return {
      type: 'postEphemeral',
      options: {
        channel: event.channel,
        user: event.user,
        blocks: await onboardingBlocks(event.channel)
      }
    }
  },
  deved: async (event) => {
    return {
      type: 'postEphemeral',
      options: {
        channel: event.channel,
        user: event.user,
        blocks: await onboardingBlocks(event.channel, require('../block-content/deved'))
      }
    }
  }
}
