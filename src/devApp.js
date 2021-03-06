require('dotenv').config()

const nodemon = require('nodemon')
const ngrok = require('ngrok')
const port = process.env.PORT || 3000

nodemon({
  script: 'src/app.js',
  ext: 'js json'
})

let url = null

nodemon.on('start', async () => {
  if (!url) {
    url = await ngrok.connect({ port: port, subdomain: process.env.NGROK_SUBDOMAIN || null })
    console.log(`Server listening on http://localhost:${port} and available at ${url}`)
  }
}).on('quit', async () => {
  await ngrok.kill()
}).on('restart', async () => {
  console.warn('\n~~~~~~~~~~~~~~~~~ Reloaded ~~~~~~~~~~~~~~~~~\n')
})
