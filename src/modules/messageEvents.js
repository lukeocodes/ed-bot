const matchMap = [
  {
    regex: /(deved-[0-9]{1,6})/gi,
    response: async (event) => {
      return {
        type: 'postEphemeral',
        options: {
          channel: event.channel,
          user: event.user,
          text: `matches ${event.text}.`
        }
      }
    }
  }
]

module.exports = (event) => {
  const match = matchMap.find((properties) => {
    return event.text.match(properties.regex)
  })

  if (match) {
    return match.response
  }
}
