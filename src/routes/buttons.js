const buttons = require('../modules/buttons')

const buttonMap = {
  contentReview: buttons.contentReview,
  topicReview: buttons.topicReview
}

module.exports = (payload, respond) => {
  const action = payload.actions.shift()
  const { action_id: actionId } = action

  if (action.action_id in buttonMap) {
    buttonMap[actionId](action, respond)
  }

  return { text: 'Processing...' }
}
