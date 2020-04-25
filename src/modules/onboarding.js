const blocks = require('../block-content/deved')

module.exports = {
  deved: async (event) => {
    return {
      type: 'postEphemeral',
      options: {
        channel: event.channel,
        user: event.user,
        blocks: blocks
      }
    }
  }
}
