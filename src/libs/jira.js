var JiraClient = require('jira-connector')
require('dotenv').config()

// Initialize
module.exports = new JiraClient({
  host: 'nexmoinc.atlassian.net',
  basic_auth: {
    base64: process.env.ATLASSIAN_CREDS_BASE64
  }
})
