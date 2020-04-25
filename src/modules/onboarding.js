const blocks = require('../libs/blocks')

module.exports = {
  deved: (event) => {
    return {
      type: 'postEphemeral',
      options: {
        channel: event.channel,
        user: event.user,
        blocks: []
      }
    }
  }
}
