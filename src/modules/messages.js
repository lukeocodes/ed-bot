// const jira = require('../libs/jira')
const blocks = require('../libs/blocks')

module.exports = {
  deved: async (rule, event) => {
    // jira.issue.getIssue({ issueKey: ticketId },
    const match = event.text.match(rule).shift()

    if (match) {
      return {
        type: 'postEphemeral',
        options: {
          channel: event.channel,
          user: event.user,
          blocks: [
            blocks.plainText(`Are you looking to do something with ${match.toUpperCase()}?`),
            blocks.divider,
            blocks.actions([
              blocks.button('topic_review', 'Request a Topic Review', match),
              blocks.button('content_review', 'Request a Content Review', match)
            ])
          ]
        }
      }
    }
  }
}
