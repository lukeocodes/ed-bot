const jira = require('../libs/jira')
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

// const ticketInfo = async (issueKey, respond) => {
//   if (action.value.event_ts) {
//     // this is the "handler" and we should create a handlers module
//     (async () => {
//       await web.chat.postMessage({
//         channel: action.value.channel,
//         thread_ts: action.value.event_ts,
//         blocks: [
//           blocks.plainText('Just me, replying to a thing, automatically')
//         ]
//       })
//     })()
//   }

//   jira.issue.getIssue({ issueKey: issueKey }, (err, issue) => {
//     if (err) {
//       throw err
//     }

//     return issue
//   })
// }

module.exports = {
  topicReview: (action, respond) => {
    action.value = JSON.parse(action.value)
    respond({ text: 'Thanks! I\'ve let the team know and attached some more info to your request!' })

    // ticketInfo(action.value.match)
    //   .then(info => {
    //     console.log(info)
    //     respond({ text: 'Thanks! I\'ve let the team know and attached some more info to your request!' })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     respond({ text: 'Sorry, an error occured trying to complete the task. I\'ve let the Developer Education team know what you were trying to do, just incase.' })
    //   })
  },
  contentReview: (action, respond) => {
    action.value = JSON.parse(action.value)
    respond({ text: 'Thanks! I\'ve let the team know and attached some more info to your request!' })
  }
}
