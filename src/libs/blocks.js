module.exports = {
  plainText: (text) => {
    return {
      type: 'section',
      text: {
        type: 'plain_text',
        text: text,
        emoji: true
      }
    }
  },
  divider: {
    type: 'divider'
  },
  actions: (actions) => {
    return {
      type: 'actions',
      elements: actions
    }
  },
  button: (action, text, value) => {
    return {
      type: 'button',
      action_id: action,
      text: {
        type: 'plain_text',
        text: text
      },
      value: value
    }
  },
  markdown: (text) => {
    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: text
      }
    }
  },
  image: (url, alt, title) => {
    return {
      type: 'image',
      title: {
        type: 'plain_text',
        text: title,
        emoji: true
      },
      image_url: url,
      alt_text: alt
    }
  }
}
