const blocks = require('../libs/blocks')

module.exports = {
  deved: async (rule, event) => {
    const match = event.text.match(rule).shift()
    event.match = match

    // only reply if we have the matching string and
    // it's not already in a thread
    if (match && !event.parent_user_id) {
      const value = JSON.stringify(event)

      return {
        type: 'postEphemeral',
        options: {
          channel: event.channel,
          user: event.user,
          blocks: [
            blocks.plainText(`Are you looking to do something with ${match.toUpperCase()}?`),
            blocks.divider,
            blocks.actions([
              blocks.button('topicReview', 'Request a Topic Review', value),
              blocks.button('contentReview', 'Request a Content Review', value)
            ])
          ]
        }
      }
    }
  }
}
